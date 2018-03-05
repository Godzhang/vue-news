<template>
    <div class="themeDetail">
        <div class="model" :class="model">
            <v-header @showSide="show" :title="themeTitle"></v-header>
            <sidebar ref="sidebar"></sidebar>
            <scroll class="theme-list" :pullup="true" @scrollToEnd="fetchMoreData" ref="themeScroll">
                <div>
                    <router-link :to="{name: 'editorsList', params: {id: currentThemeId}}" tag="div" class="editors border-1px">
                        <span class="editor">主编</span>
                        <div class="avatar" v-for="editor in this.$store.state.currentTheme.editors">
                            <img :src="attachImageUrl(editor.avatar)" alt="" width="25" height="25">
                        </div>
                        <span class="arrow_right">
                            <img src="../../assets/image/arrow_right.png" alt="" width="15" height="15">
                        </span>
                    </router-link>
                    <div class="themeNewList" :class="model">
                        <ul>
                            <li v-for="story in this.$store.state.currentTheme.stories" :key="story.id" class="new border-1px" @click="goNew(story.id)">
                                <span class="title">{{ story.title }}</span>
                                <span class="avatar" v-for="(item, index) in story.images" v-if="index<1">
                                    <img v-lazy="attachImageUrl(item)" alt="">
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </scroll>
        </div>
    </div>
</template>
<script>
import VHeader from '@/components/v-header/v-header'
import Sidebar from '@/components/sidebar/sidebar'
import Scroll from '@/base/scroll/scroll'
import { getThemeInfo, getMoreThemeInfo } from '@/api/service'
import { mapGetters, mapActions } from 'vuex'

export default {
    data(){
        return {
            time: new Date(),
            themeTimestamp: ''
        }
    },
    watch: {
        '$route'(to, from){
            this.fetchData();
        }
    },
    created(){
        this.fetchData();
    },
    mounted(){
        this.initTimeStamp();
    },
    methods: {
        //初始化时间戳
        initTimeStamp(){
            let date = this.time.getTime().toString();
            date = date.substring(0, 10);
            this.themeTimestamp = date;
        },
        //处理时间戳，每次往前退一天
        decreaseDateStr(){
            this.time.setDate(this.time.getDate() - 1);
            let date = this.time.getTime().toString();
            date = date.substring(0, 10);
            this.themeTimestamp = date;
            console.log(this.themeTimestamp);
        },
        //获取当前主题页面数据
        fetchData() {
            if (this.currentThemeId != -1) {
                getThemeInfo(this.currentThemeId).then((res) => {
                    let theme = res.data;
                    let stories = theme.stories;
                    let ids = stories.map(story => story.id);
                    this.$store.dispatch('addTheme', theme);
                    this.$store.dispatch('addAllNews', stories);
                    this.$store.dispatch('addThemeIds', ids);
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        //显示侧边栏，在其显示时访问他的获取数据方法，从而使better-scroll能够计算出中间主题列表高度
        show() {
            this.$refs.sidebar.open()
        },
        //前往主题新闻详情页
        goNew(id) {
            this.$store.commit('setId', id);
            this.$router.push({name: 'newDetail', params: {id: id}});
            this.$store.dispatch('judgeCollectState');
            this.$store.dispatch('changeGoType', {
                id: id,
                type: 3
            });
            this.$store.dispatch('addThemeNextId', id);
        },
        //转换图片url
        attachImageUrl(srcUrl) {
            if (srcUrl !== undefined) {
                return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
            }
        },
        fetchMoreData(){
            if (this.currentThemeId != -1) {
                this.decreaseDateStr();
                getMoreThemeInfo(this.currentThemeId, this.themeTimestamp).then((res) => {
                    console.log(res);
                    // let theme = res.data;
                    // let stories = theme.stories;
                    // this.$store.dispatch('addAllNews', stories);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    },
    computed: {
        ...mapGetters([
            'model',
            'currentThemeId',
            'themeTitle'
        ])
    },
    components: {
        VHeader,
        Sidebar,
        Scroll
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.themeDetail{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
}
.model-open{
    position: fixed;
    width: 100%;
}
.model{
    &.morning{
        color: rgb(51, 51, 51);
        background-color: rgb(255, 255, 255);
    }
    &.night{
        color: rgb(184, 184, 184);
        background-color: rgb(52, 52, 52);
    }
    .theme-list{
        position: absolute;
        top: 40px;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
    }
    .editors{
        position: relative;
        width: 92%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        padding: 0 10px;
        margin: 0 auto;
        .editor{
            font-size: 17px;
            color: rgb(102, 102, 102);
        }
        .avatar{
            display: inline-block;
            vertical-align: middle;
            img{
                margin: 7.5px 0 0 10px;
                border-radius: 50%;
            }
        }
        .arrow_right{
            position: absolute;
            right: 10px;
            padding: 0 10px;
        }
    }
    .themeNewList{
        position: relative;
        width: 100%;
        // height: 100%;
        &.morning{
            color: rgb(51, 51, 51);
            background-color: rgb(255, 255, 255);
        }
        &.night{
            color: rgb(184, 184, 184);
            background-color: rgb(52, 52, 52);
        }
        .new{
            display: flex;
            position: relative;
            padding: 20px 10px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .title{
                flex: 1;
                margin-right: 10px;
                line-height: 20px;
            }
            .avatar{
                flex: 0 0 70px;
                width: 70px;
                height: 55px;
                img{
                    width: 70px;
                    height: 55px;
                    img[lazy=loading]{
                        height: 55px;
                        width: 70px;
                        margin: auto;
                    }
                }
            }
        }
    }
}

</style>
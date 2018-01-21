<template>
    <div class="editorList">
        <son-header :title="title" @back="back"></son-header>
        <div class="list">
            <ul>
                <li class="editor border-1px" v-for="editor in this.$store.state.currentTheme.editors" @click="goEditor(editor.id,editor.name)">
                    <div class="avatar">
                        <img :src="attachImageUrl(editor.avatar)" alt="" height="35" width="35">
                    </div>
                    <div class="description">
                        <div class="name">{{editor.name}}</div>
                        <div class="bio">{{editor.bio}}</div>
                    </div>
                    <div class="arrow_right">
                        <img src="../../assets/image/arrow_right.png" width="15" height="15" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import SonHeader from '@/components/son-header/son-header';

export default {
    data(){
        return {
            title: '主编'
        }        
    },
    methods: { 
        //返回上一级路由
        back() {
            this.$router.push({name: 'themeDetail', params: {id: this.$store.state.currentThemeId}})
        },
        //对图片url进行转化
        attachImageUrl(srcUrl) {
            if (srcUrl !== undefined) {
                return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
            }
        },
        //跳转主编个人主页路由
        goEditor(id, name) {
            this.$router.push({name: 'editor', params: {id: id}});
            this.$store.dispatch('addEditorId', {
                id: id,
                name: name
            });
        }
    },
    components: {
        SonHeader
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.list{
    position: relative;
    top: 40px;
    ul{
        padding-left: 0;
        .editor{
            display: flex;
            height: 60px;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .avatar{
                flex: 0 0 25px;
                height: 60px;
                line-height: 60px;
                padding-left: 10px;
                margin-right: 15px;
                img{
                    margin-top: 12.5px;
                    border-radius: 50%;
                }
            }
            .description{
                flex: 1;
                height: 60px;
                .name{
                    font-size: 14px;
                    margin-top: 10px;
                }
                .bio{
                    font-size: 11px;
                    margin-top: 8px;
                    color: rgb(153, 153, 153);
                }
            }
            .arrow_right{
                flex: 0 0 25px;
                line-height: 60px;
                padding-right: 10px;
            }
        }
    }
}
</style>
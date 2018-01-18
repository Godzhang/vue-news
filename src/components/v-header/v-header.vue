<template>
    <div class="header" ref="header">
        <div class="model" :class="model">
            <span class="navigation" @click="showSidebar"></span>
            <h2>{{title}}</h2>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        title: {
            type: String,
            default: '今日热闻'
        }
    },
    methods: {
        showSidebar(){
            this.$emit('showSide');
        }
    },
    computed: {
        model(){
            return this.isNight ? 'night' : 'morning';
        },
        ...mapGetters([
            'isNight'
        ])
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.header{
    position: fixed;
    top: 0;left: 0;
    width: 100%;
    height: 40px;
    z-index: 5;
    text-align: center;
    font-size: 0;
    .model{
        &.morning{
            color: rgb(51, 51, 51);
            background: rgb(2, 143, 214);
        }
        &.night{
            color: rgb(184, 184, 184);
            background: rgb(85, 85, 85);
        }
        & > h2{
            line-height: 40px;
            font-size: 22px;
            color: #fff;
        }
        .navigation{
            position: absolute;
            top: 0;left: 0;
            width: 40px;height: 40px;
            background: url(../../assets/image/navigation.png) center center no-repeat;
            background-size: 24px 24px;
            cursor: pointer;
        }
    }
}
</style>
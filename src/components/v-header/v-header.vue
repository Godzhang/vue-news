<template>
    <div class="header" ref="header">
        <div class="model" :class="model">
            <span class="navigation" @click="showSidebar"></span>
            <h2>{{title}}</h2>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';

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
<style lang="sass">

</style>
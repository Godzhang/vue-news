<template>
    <div class="editor">
        <son-header :title="this.$store.state.editor.name" @back="back"></son-header>
        <div class="content" v-html="this.editor"></div>
    </div>
</template>
<script>
import SonHeader from '@/components/son-header/son-header';
import axios from 'axios';

export default {
    data(){
        return {
            editor: {}
        }        
    },
    created(){
        this.fetchEditor();
    },
    watch: {
        'route'(to, from){
            this.fetchEditor();
        }
    },
    methods: { 
        //获取主编信息
        fetchEditor() {
            let id = this.$store.state.editor.id;
            axios.get('api/editor/' + id + '/profile-page/ios').then((response) => {
                response.data = this.attachImageUrl(response.data);
                this.editor = response.data;
            })
        },
        //对图片url进行转化
        attachImageUrl: function (body) {
            return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
        },
        //返回上一级路由
        back() {
            this.$router.go(-1);
        }
    },
    components: {
        SonHeader
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.content{
    position: relative;
    top: 30px;
    margin: 0;
}
</style>
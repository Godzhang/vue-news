<template>
	<div class="newDetail">
		<scroll ref="detailScroll" class="detail-container">
			<div class="content-wrapper">
				<div class="bg-image" v-if="data.image">
					<img :src="attachImageUrl(data.image)" v-lazy="attachImageUrl(data.image)" alt="" />
					<span class="title">{{data.title}}</span>
				</div>
				<div class="body" v-html="data.body" :class="model"></div>				
			</div>
		</scroll>
		<bottom-menu></bottom-menu>
	</div>
</template>
<script>
import { getDetails } from '@/api/service'
import { mapGetters } from 'vuex'
import Scroll from '@/base/scroll/scroll'
import '../../assets/css/detail.css'
import BottomMenu from '@/components/bottom-menu/bottom-menu'

export default {
	data(){
		return {
			data: {}
		}
	},
	created(){
		this.fetchData();
	},
	watch: {
		'$route'(to, from){
			this.fetchData();
		}
	},
	methods: {
		fetchData(){
			getDetails(this.$route.params.id).then((res) => {
				res.data.body = this.attachBodyContent(res.data.body);
				this.data = res.data;
				this.$nextTick(() => {
					this.$refs.detailScroll.refresh();
				});
			}).catch((error) => {
				console.log(error);
			});
		},
		//对图片url进行转化
		attachImageUrl(srcUrl) {
			if (srcUrl != undefined) {
			    return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
			}
		},
		//替换详情内容图片url
		attachBodyContent(body){
			return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
		}
	},
	computed: {
		model(){
			return this.isNight ? 'night' : 'morning';
		},
		...mapGetters(['isNight'])
	},
	components: {
		Scroll,
		BottomMenu
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.newDetail{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	background: #fff;
	z-index: 10;
	.detail-container{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	.content-wrapper{
		position: relative;
		background: #fff;
	}
	.bg-image{
		position: relative;
	    width: 100%;
	    height:  250px;
	    z-index: -1;
	    background: #ccc;
	    .title{
			position: absolute;
			bottom: 0;
			font-size: 18px;
			padding: 0 10px 10px 15px;
			color: #fff;
	    }
	    img{
			position: absolute;
			width: 100%;
			height: 250px;
	    }
	}
	.body{
    	width: 100%;
		&.morning{
			color: rgb(51,51,51);
      		background-color: #fff;
		}
		&.night{
			color: rgb(184,184,184);
      		background-color: rgb(52,52,52);
		}
	} 
}
	
</style>
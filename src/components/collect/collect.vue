<template>
	<transition name="fold" mode="in-out">
		<div class="collect">
			<son-header @back="back" :title="title"></son-header>
			<div class="model" :class="model">
				<scroll ref="collectScroll" class="new-list" :pullup="true" @scrollToEnd="loadCollectList">
					<div class="collectNewList">
						<ul>
							<li v-for="story in stories" class="new border-1px" @click="goNew(story.id)">
								<span class="title">{{ story.title }}</span>
								<span class="avatar"><img :src="attachImageUrl(story.images[0])" alt="" /></span>
							</li>
						</ul>
					</div>
				</scroll>
			</div>
		</div>
	</transition>
</template>
<script>
import SonHeader from '@/components/son-header/son-header'
import { getCollectedNews } from '@/api/service'
import Scroll from '@/base/scroll/scroll'

export default {
	data(){
		return {
			title: '收藏',
			stories: []
		}
	},
	created(){
		//获取收藏信息
		this.loadData();
	},
	methods: {
		loadData(){
			getCollectedNews().then((res) => {
				this.stories.push(...res.data.stories);
				this.$nextTick(() => {
					this.$refs.collectScroll.refresh();
				});
			});
		},
		loadCollectList(){
			//接口没有新数据，暂不支持上拉加载数据功能
			// this.loadData();
		},
		back(){
			let id = this.$store.state.currentThemeId;
			if(this.$store.state.currentThemeId > 0){
				this.$router.push({name: 'themeDetail', params: {id: id}});
			}else{
				this.$router.push({name: 'homePage'});
			}
		},
		//对图片url进行转化
		attachImageUrl(srcUrl) {
			if (srcUrl != undefined) {
			    return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
			}
		},
		goNew(id){
			this.$store.commit('setId', id);
			this.$router.push({name: 'newDetail', params: {id: id}});
			this.$store.dispatch('judgeCollectState');
			this.$store.dispatch('changeGoType', 2);
		}
	},
	computed: {
		model(){
			return this.$store.getters.isNight ? 'night' : 'morning';
		}
	},
	components: {
		SonHeader,
		Scroll
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.collect{
	position: fixed;
	top: 0;
	left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: #fff;
    transform: translate3d(0, 0, 0);
	.model{
		position: absolute;
        top: 40px;
        bottom: 0;
        width: 100%;
        overflow: hidden;
		&.morning{
			color: rgb(51, 51, 51);
        	background-color: rgb(255, 255, 255);
		}
		&.night{
			color: rgb(184, 184, 184);
        	background-color: rgb(52, 52, 52);
		}
		.new-list{
			position: absolute;
			top: 0;
			bottom: 0;
			width: 100%;
			overflow: hidden;
		}
		.collectNewList{
			position: absolute;
	        top: 0;
	        width: 100%;
	        z-index: 30;
			.new{
				display: flex;
	            position: relative;
	            padding: 15px 10px;
	            cursor: pointer;
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
            		}
				}
			}
			.new + .new{
				border-top: 1px solid rgba(7, 17, 27, 0.1);
			}
		}
	}
}
.fold-enter-active, .fold-leave-active{
  transition: all 0.5s;
}
.fold-enter, .fold-leave-active{
  transform: translate3d(100%, 0, 0);
}

</style>
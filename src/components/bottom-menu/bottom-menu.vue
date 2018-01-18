<template>
	<div class="bottomMenu">
		<div class="model" :class="model">
			<div class="menu" @click="goBack"><i class="icon iconfont icon-back"></i></div>
			<div class="menu" @click="goNext"><i class="icon iconfont icon-moreunfold"></i></div>
			<div class="menu" @click="thumbUp" :class="{'isThumbUp': thumb}">
				<i class="icon iconfont icon-dianzan"></i>
				<span class="extra">{{ this.$store.state.popularity }}</span>
			</div>
			<div class="menu" @click="showShare"><i class="icon iconfont icon-fenxiang"></i></div>
			<transition name="fold">
				<div class="share" v-show="shareshow" :class="model">
					<div class="title">分享这篇内容</div>
          			<div class="shareMenus" :class="model">
          				<mt-swipe :auto="0" style="height: 200px">
          					<mt-swipe-item>
          						<div class="shareMenu">
				                    <i class="icon iconfont icon-weixinhaoyou"></i><br>
				                    <span class="name">微信好友</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-weixinpengyouquan"></i><br>
				                    <span class="name">微信朋友圈</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-QQ"></i><br>
				                    <span class="name">QQ</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-weibo"></i><br>
				                    <span class="name">新浪微博</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-fuzhi"></i><br>
				                    <span class="name">复制链接</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-youdaoyunbiji"></i><br>
				                    <span class="name">有道云笔记</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-yinxiangbiji"></i><br>
				                    <span class="name">印象笔记</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-tengxunweibo"></i><br>
				                    <span class="name">腾讯微博</span>
				                </div>	
          					</mt-swipe-item>
          					<mt-swipe-item>
          						<div class="shareMenu">
				                    <i class="icon iconfont icon-xinxi"></i><br>
				                    <span class="name">信息</span>
				                </div>
				                <div class="shareMenu">
				                    <i class="icon iconfont icon-instapaper"></i><br>
				                    <span class="name">Instapaper</span>
				                </div>
          					</mt-swipe-item>
          				</mt-swipe>
          			</div>
          			<div class="button" @click="changeCollect" :class="model">{{ getCollect }}</div>
          			<div class="button" @click="hideShare" :class="model">取消</div>
				</div>
			</transition>
			<transition name="fade">
				<div class="mask" v-show="shareshow" @click="hideShare"></div>
			</transition>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
	data(){
		return {
			thumb: false,
			shareshow: false
		}
	},
	methods: {
		goBack(){
			if(this.$store.state.goType === 1){
				this.$router.push({name: 'homePage'});
			}else if(this.$store.state.goType === 2){
				this.$router.push({name: 'collect'});
				this.$store.dispatch('changeGoType', 1);
			}else if(this.$store.state.goType === 3){
				this.$router.push({name: 'themeDetail', params: {id: this.$store.state.currentThemeId}});
			}
		},
		//加载下一篇新闻
		goNext(){

		},
		thumbUp(){
			this.thumb = !this.thumb;
			if(this.thumb){
				this.$store.commit('addPopular');
			}else{
				this.$store.commit('reducePopular');
			}
		},
		showShare(){
			this.shareshow = true;
		},
		hideShare(){
			this.shareshow = false;
		},
		...mapMutations({
			'changeCollect': 'JUDGE_COLLECT_STATE'
		})
		// changeCollect(){
		// 	this.$store.dispatch('changeCollectState');
		// }
	},
	computed: {
		model(){
			return this.isNight ? 'night' : 'morning';
		},
		...mapGetters(['isNight', 'getCollect'])
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';
@import '../../assets/css/iconfont.css';

.bottomMenu{
	position: fixed;
	bottom: -1px;
	height: 44px;
	width: 100%;
	background-color: #fff;
	.model{
		display: flex;
		&.morning{
			color: rgb(51, 51, 51);
			background-color: #fff;
			border-top: 1px solid #f5f5f5;
		}
		&.night{
			color: rgb(184, 184, 184);
			background-color: rgb(52, 52, 52);
		}
		.menu{
			flex: 1;
			line-height: 39px;
			font-size: 30px;
			text-align: center;
			margin-bottom: 5px;
			&.isThumbUp{
				color: deepskyblue;
			}
			.iconfont{
				font-size: 25px;
			}
			img{
				position: relative;
        		bottom: 3px;
			}
			.extra{
				position: relative;
		        bottom: 15px;
		        font-size: 15px;
			}
		}
		.share{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 380px;
			background: #f5f5f5;
			z-index: 50;
			transform: translate3d(0, 0, 0);
			&.morning{
				color: rgb(51, 51, 51);
		        background-color: rgb(233, 233, 233);
		        border-top: 1px solid #f5f5f5;
			}
			&.night{
				color: rgb(184, 184, 184);
        		background-color: rgb(52, 52, 52);
			}
			.title{
				width: 100%;
		        height: 25px;
		        text-align: center;
		        font-size: 17px;
		        padding-top: 10px;
			}
			.shareMenus{
				position: relative;
		        top: 5px;
		        width: 100%;
		        font-size: 0;
				.shareMenu{
					display: inline-block;
					padding-top: 15px;
					z-index: 50;
					width: 25%;
					margin-bottom: 30px;
					text-align: center;
					i{
						font-size: 25px;
			            padding: 10px;
			            border-radius: 50%;
			            color: #fff;
						&.icon-weixinhaoyou{
			              background: #64c654;
						}
			            &.icon-weixinpengyouquan{
			              background: #75cd37;
			            }
			            &.icon-QQ{
			              background: #286bc4;
			            }
			            &.icon-weibo{
			              background: #ec4226;
			            }
			            &.icon-fuzhi{
			              background: #dd472c;
			            }
			            &.icon-youdaoyunbiji{
			              background: #38a3ea;
			            }
			            &.icon-yinxiangbiji{
			              background: #5db346;
			            }
			            &.icon-tengxunweibo{
			              background: #3ea1d9;
			            }
			            &.icon-xinxi{
			              background: #4fe54e;
			            }
			            &.icon-instapaper{
			              background: #6c6c6c;
			            }
					}
					.name{
						display: block;
						position: relative;
						top: 20px;
						font-size: 18px;
						text-align: center;
					}
				}
			}
			.button{
				position: relative;
				height: 40px;
				width: 80%;
				bottom: 5px;
				margin: 15px auto;
				background: rgb(255, 255, 255);
				text-align: center;
				line-height: 40px;
				&.morning{
					color: rgb(51, 51, 51);
					background-color: #fff;
				}
				&.night{
					color: rgb(184, 184, 184);
					background-color: rgb(85, 85, 85);
				}
			}
		}
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(7, 17, 27, 0.6);
			z-index: 40;
			opacity: 1;
		}
	}
}
.modal-open{
	position: fixed;
	width: 100%;
}
.fold-enter-active, .fold-leave-active{
	transition: all 0.5s;
}
.fold-enter, .fold-leave-active{
   	transform: translate3d(0, 100%, 0);
}
.fade-enter-active, .fade-leave-active{
	transition: all 0.5s;
}

.fade-enter, .fade-leave-active{
	opacity: 0;
}
       
</style>
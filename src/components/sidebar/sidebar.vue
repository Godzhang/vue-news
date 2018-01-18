<template>
	<div>
		<transition name="fold">
			<div class="sidebar" v-show="showFlag">
				<div class="user">
					<div class="avatar"></div>
					<div class="username">弗雷迪墨丘利</div>
					<div class="back" @click="hide"><img src="../../assets/image/back.png" alt="" width="22" height="22" /></div>
				</div>
				<div class="menu-list">
					<div class="menu" @click="goCollect">
						<div class="avatar"><img src="../../assets/image/collect.png" alt="" width="20" height="20"/></div>
						<div class="name">收藏</div>
					</div>
					<div class="menu">
			            <div class="avatar"><i class="icon iconfont icon-xiaoxi"></i></div>
			            <div class="name">消息</div>
			        </div>
			        <div class="menu">
			            <div class="avatar"><i class="icon iconfont icon-shezhi"></i></div>
			            <div class="name">设置</div>
			        </div>
				</div>
				<scroll :data="data" class="themes-list" ref="scroll">
					<ul style="padding-left: 0">
			            <li class="themes" v-for="item in data" @click="goTheme(item.id)" :class="{'current': currentThemeId === item.id}">
			            	<div class="icons" v-if="item.id === -1"><i class="icon iconfont icon-shouyeshouye"></i></div>
			                <div class="themetitle">{{ item.name }}</div>
			            </li>
			        </ul>
				</scroll>
				<div class="bottom-menu">
		          	<div class="menu">
		            	<div class="avatar"><i class="icon iconfont icon-lixianwenjian"></i></div>
		            	<div class="name">离线</div>
		          	</div>
		          	<div class="menu" @click="changeModel">
		            	<div class="avatar"><img :src="modelImg" width="18" height="18"></div>
		            	<div class="name">{{ modelText }}</div>
		          	</div>
		        </div>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask" @click.stop.prevent="hide" v-show="showFlag"></div>
		</transition>
	</div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import { getThemeTitle } from '@/api/sidebar'
import { mapGetters,mapMutations } from 'vuex'

export default {
	data(){
		return {
			data: [],
			showFlag: false
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
		open(){
			this.showFlag = true;
			this.$nextTick(() => {
				this.$refs.scroll.refresh();
			});
		},
		fetchData(){
			getThemeTitle().then((res) => {
				this.data = res.data.others;

				this.data.unshift({
					color: 0,
					thumbnail: '',
					description: '首页',
					id: -1,
					name: '首页'
				});
			});
		},
		hide(){
			this.showFlag = false;
		},
		goTheme(id){
			if(id === -1){
				this.hide();
				this.$router.push({name: 'homePage'});
				this.setGoType(1);
				this.setThemeId(id);
			}else if(id === this.currentThemeId){
				this.hide();
			}else{
				this.hide();
				this.setThemeId(id);
				this.$router.push({name: 'themeDetail', params: {id: id}});
			}
		},
		goCollect(){
			this.$router.push({name: 'collect'});
			this.hide();
		},
		...mapMutations({
			setThemeId: 'CHANGE_CURRENT_THEME_ID',
			setGoType: 'CHANGE_GO_TYPES',
			changeModel: 'CHANGE_MODEL'
		})
	},
	computed: {
		modelText(){
			return this.isNight ? '夜间' : '日间';
		},
		modelImg(){
			if(this.isNight){
				return require('../../assets/image/yejian.png');
			}else{
				return require('../../assets/image/rijian.png');
			}
		},
		...mapGetters(['currentThemeId', 'isNight'])
	},
	components: {
		Scroll
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';
@import '../../assets/css/iconfont.css';

.sidebar{
	position: fixed;
	top: 0;left: 0;
	width: 230px;height: 100%;
	z-index: 50;
	background: rgb(35, 42, 48);
	transform: translate3d(0,0,0);
	.user{
		padding: 10px 10px 0;
		font-size: 0;
		.avatar{
			display: inline-block;
			width: 40px;
			height: 40px;
			margin-right: 10px;
			background: url('../../assets/image/useravatar.png') center center no-repeat;
			background-size: 40px 40px;
			border-radius: 50%;
			vertical-align: top;
		}
		.username{
			display: inline-block;
			line-height: 40px;
			font-size: 15px;
			color: rgb(148, 153, 157);
		}
		.back{
			display: inline-flex;
			justify-content: center;
			align-items: center;
			position: relative;
			top: 5px;left: 40px;
			width: 30px;height: 30px;
			vertical-align: top;
		}
	}
	.menu-list{
		display: flex;
		padding: 10px 20px 10px 10px;
		.menu{
			flex: 1;
			text-align: center;
			.avatar{
				margin-bottom: 5px;
				.iconfont{
					color: rgb(148, 153, 157);
					font-size: 20px;
				}
			}
			.name{
				color: rgb(148, 153, 157);
			}
		}
	}
	.themes-list{
		position: absolute;
		top: 114px;
		bottom: 56px;
		width: 100%;
		overflow: hidden;
		.themes{
			display: table;
		    width: 95%;
		    padding-left: 5%;
		    color: rgb(148, 153, 157);
		    &.current{
		    	background-color: rgb(27, 35, 41);
		        color: rgb(255, 255, 255);
		    }		        
	        .icons{
				display: inline-block;
		        margin-right: 5px;
	        }	        
		    .themetitle{
				display: inline-block;
		        line-height: 50px;
		    }
		}
	}
	.bottom-menu{
		position: absolute;
	    display: flex;
	    bottom: 0;
	    left: 0;
	    width: 100%;
	    height: 56px;
	    .menu{
	    	flex: 1;
		    text-align: center;
		    padding-top: 5px;
		    .avatar{
		    	margin-bottom: 5px;
		        .iconfont{
		        	color: rgb(148, 153, 157);
					font-size: 20px;
		        }					
		        img{
		          margin-bottom: 2px;
		        }
		    }		        
			.name{
				color: rgb(148, 153, 157)
			}  
	    }
	      
    }
}
.mask{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 40;
	background: rgba(7, 17, 27, 0.6);
	opacity: 1;
}	

.fold-enter-active, .fold-leave-active{
	transition: all 0.5s;
}
.fold-enter, .fold-leave-active{
	transform: translate3d(-100%, 0, 0);
}
.fade-enter-active, .fade-leave-active{
	transition: all 0.5s;
}
.fade-enter, .fade-leave-active{
	opacity: 0;
}
</style>
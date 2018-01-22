<template>
	<div>
		<div class="home-page" ref="homepage">
			<scroll class="home-page-content" :pullup="true" @scrollToEnd="fetchMoreData" ref="homeScroll">
				<div>
					<div class="slider-wrapper" v-if="sliders.length">
						<div class="slider-content">
							<swiper :options="swiperOption" ref="mySwiper">
								<swiper-slide v-for="(item, index) in sliders" :key="index">
									<div @click="goNew(item.id)">
										<img :src="item.image" alt="" />
									</div>
								</swiper-slide>
							</swiper>
						</div>
					</div>
					<div class="newList">
						<div class="model" :class="model">
							<ul>
								<li v-for="story in stories" :key="story.id" class="new border-1px" @click="goNew(story.id)" :class="model">
									<span class="title">{{ story.title }}</span>
									<span class="avatar" v-for="(item, index) in story.images" v-if="index < 1">
										<img :src="attachImageUrl(item)" v-lazy="attachImageUrl(item)" alt="" />
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</scroll>
		</div>
	</div>
</template>
<script>
import Scroll from '@/base/scroll/scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { getSlider, getNews } from '@/api/homePage'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios'

export default {
	data(){
		return {
			sliders: [],
			swiperOption: {
				// loop: true
			},
			date: new Date(),
			dateStr: ''
		}
	},
	created(){
		if(this.isFirstLoad){
			this.fetchData();
			this.setFirstLoad();
			this.initDate();
		}
		this.$nextTick(() => {
			this._getSlider();
		});
	},
	methods: {
		//获取最新消息
		fetchData(){
			getNews().then((res) => {
				let stories = res.data.stories;
				let ids = stories.map(story => story.id);

				this.addNews({
					stories: stories,
					ids: ids
				});

				this.$nextTick(() => {
					this.$refs.homeScroll.refresh();
				});
			}).catch((error) => {
				console.log(error);
			});
		},
		//获取第一次加载当前日期
		initDate(){
			this.date = new Date();
	        this.addDate(new Date(this.date.getTime()));
	        this.changeDateStr();
		},
		changeDateStr(){
			let nowDate = new Date(this.homepageDate.getTime());
	        let year = nowDate.getFullYear() + '';
	        let month = nowDate.getMonth() + 1;
	        let date = nowDate.getDate();
	        month = month < 10 ? '0' + month : month + '';
	        date = date < 10 ? '0' + date : date + '';

	        this.dateStr = year + month + date;
	        this.addDateStr(this.dateStr)
		},
		_getSlider(){
			getSlider().then((res) => {
				this.sliders = this.initImage(res.data.top_stories);
			});
		},
		initImage(data){
			data.forEach((item) => {
				item.image = this.attachImageUrl(item.image);
			});
			return data;
		},
		//将日期推前一天
		decreaseDateStr() {
			let homeDate = this.homepageDate;
			homeDate.setDate(homeDate.getDate() - 1)
			this.addDate(new Date(homeDate.getTime()))
			this.changeDateStr();
		},
		fetchMoreData(){
			axios.get('api/news/before/' + this.homepageDateStr).then((res) => {
	            let stories = res.data.stories;
	            let ids = stories.map(story => story.id)

	            this.addNews({
	              	stories: stories,
	              	ids: ids
	            });
	        }).catch((error) => {
	          	console.log(error)
	        });
	        this.decreaseDateStr();
		},
		//去往详情页
		goNew(id) {
			this.changeGoType({
				id: id,
				type: 1
			})
			this.$router.push({name: 'newDetail', params: {id: id}});
		},
		...mapMutations({
			setFirstLoad: 'CHANGE_FIRST_LOAD'
		}),
		...mapActions([
			'addNews',
			'changeGoType',
			'addDate',
			'addDateStr',
			'attachImageUrl'
		])
	},
	computed: {
		swiper(){
			return this.$refs.mySwiper.swiper;
		},
		...mapGetters([
			'model',
			'stories',
			'isFirstLoad',
			'homepageDate',
			'homepageDateStr'
		])
	},
	components: {
		Scroll,
		swiper,
		swiperSlide
	}
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.home-page{
	position: fixed;
	top: 40px;
	bottom: 0;
	width: 100%;
	.home-page-content{
		height: 100%;
    	overflow: hidden;
		.slider-wrapper{
			position: relative;
			width: 100%;
			height: 200px;
			overflow: hidden;
			.slider-content{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 200px;
				overflow: hidden;
				img{
					width: 100%;
					height: 200px;
				}
			}
		}
		.newList{
			.model{
				&.morning{
					color: rgb(51,51,51);
            		background-color: rgb(255,255,255);
				}
				&.night{
					color: rgb(184,184,184);
            		background-color: rgb(52,52,52);
				}
				.new{
					display: flex;
		            position: relative;
		            padding: 20px 10px;
					&.morning{
						border-bottom: 1px solid rgba(7,17,27,0.1);
					}
					&.night{
						border-bottom: 1px solid rgb(43,43,43);
					}
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
							img[lazy="loading"]{
								height: 55px;
				                width: 70px;
				                margin: auto;
							}
						}
					}
				}
			}
		}
	}
}
</style>
import axios from 'axios';
//获取收藏列表
export function getCollectedNews(){
	return new Promise((resolve, reject) => {
		axios.get('api/news/latest').then((res) => {
			resolve(res);
		});
	});
}
//获取信息详情
export function getDetails(id){
	return new Promise((resolve, reject) => {
		axios.get('api/news/' + id).then((res) => {
			resolve(res);
		});
	});
}

//获取新闻点赞评论等信息
export function getNewsInfo(id){
	return new Promise((resolve, reject) => {
		axios.get('api/story-extra/' + id).then((res) => {
			resolve(res);
		});
	});
}
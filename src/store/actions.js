import * as types from './mutation_types';

export default {
	//改变跳转详情页的路由状态，判断是从哪里跳入
	changeGoType({commit}, id){
		commit(types.CHANGE_GO_TYPES, id);
	},
	//判断收藏状态
	judgeCollectState({commit}){
		commit(types.JUDGE_COLLECT_STATE);
	},
	//改变新闻评论等信息
	changeStoryExtra({commit}, data){
		commit(types.STORY_EXTRA, data);
	},
	addNews({commit, state}, {stories, ids}){
		let nStories = state.stories.slice();
		let nIds = state.ids.slice();

		let newStories = nStories.concat(stories);
		let newIds = nIds.concat(ids);

		commit(types.ADD_NEWS, newStories);
		commit(types.ADD_IDS, newIds);
	},
	addDate({commit}, date) {
		commit(types.ADD_DATE, date)
		commit(types.ADD_HOMEPAGE_DATE, date)
	},
	addDateStr({commit}, dateStr) {
  	    commit(types.ADD_DATE_STR, dateStr)
  		commit(types.ADD_HOMEPAGE_DATE_STR, dateStr)
	},
	//增加主题新闻数据
	addTheme:({commit},payload) => {
		commit(types.ADD_THEME,payload)
	},
	addThemeIds:({commit},ids) => {
		commit(types.ADD_THEME_NEWID,ids)
	},
	//增加全部加载过的新闻到数组
	addAllNews:({commit},stories) => {
		commit(types.ADD_ALL_NEWS,stories)
	},
	//添加主题新闻下一篇新闻id
	addThemeNextId:({commit},id) => {
		commit(types.ADD_THEME_NEXT_ID,id)
	},
	//改变主编id
	addEditorId:({commit},payload) => {
		commit(types.ADD_EDITOR_ID,payload)
	},
	//对图片url进行转换
	attachImageUrl({commit}, srcUrl) {
		commit(types.ATTACH_URL, srcUrl);
	}
}
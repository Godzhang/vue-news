import * as types from './mutation_types';

export default {
	addPopular(state){
		state.popularity++;
	},
	reducePopular(state){
		state.popularity--;
	},
	//
	setId(state, id){
		state.id = id;
	},
	//
	[types.CHANGE_CURRENT_THEME_ID](state, id){
		state.currentThemeId = id;
	},
	//改变跳转详情页的路由状态，判断是从哪里跳入
	[types.CHANGE_GO_TYPES](state, type){
		state.goType = type;
	},
	//改变模式
	[types.CHANGE_MODEL](state){
		state.isNight = !state.isNight;
	},
	//判断收藏状态
	[types.JUDGE_COLLECT_STATE](state){
		let index = state.isCollectedIds.indexOf(state.id);
		if(index >= 0){
			state.isCollect = false;
			state.isCollectedIds.splice(index, 1);
		}else{
			state.isCollect = true;
			state.isCollectedIds.push(state.id);
		}
	},
	//添加详情页底部状态到数组
	[types.STORY_EXTRA](state, extra){
		state.comments = extra.comments;
	    state.long_comments = extra.long_comments;
	    state.short_comments = extra.short_comments;
	    state.popularity = extra.popularity;
	},
	//增加首页新闻数组和首页新闻id数组
	[types.ADD_NEWS](state,stories){
		state.stories = stories;
	},
	[types.ADD_IDS](state, ids){
		state.ids = ids;
	},
	//改变第一次进入首页状态
	[types.CHANGE_FIRST_LOAD](state){
		state.isFirstLoad = !state.isFirstLoad;
	},
	//改变日期和当前字符串
	[types.ADD_DATE](state,date){
		state.date = date;
	},
	//增加日期字符串
	[types.ADD_DATE_STR](state,dateStr){
		state.dateStr = dateStr;
	},
	//改变首页日期
	[types.ADD_HOMEPAGE_DATE](state,date){
		state.homepageDate = date;
	},
	//改变首页字符串
	[types.ADD_HOMEPAGE_DATE_STR](state,dateStr){
		state.homepageDateStr = dateStr;
	},
	//增加主题新闻数据
	[types.ADD_THEME](state,payload){
		state.currentTheme = payload;
	},
	//主题新闻id数组
	[types.ADD_THEME_NEWID](state,ids){
		state.themeids = ids;
	},
	//增加全部加载过的新闻到数组
	[types.ADD_ALL_NEWS](state,stories){
		state.allStories = state.allStories.concat(stories)
	},
	//增加主题新闻下一篇id
	[types.ADD_THEME_NEXT_ID](state,id){
		state.id = id;
		let index = state.themeids.indexOf(id);
		state.themenextId = state.themeids[index + 1];
	},
	//改变主编id
	[types.ADD_EDITOR_ID](state,payload){
		state.editor = payload;
	}
}
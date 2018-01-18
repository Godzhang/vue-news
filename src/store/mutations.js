import * as types from './mutation_types';

export default {
	//
	setId(state, id){
		state.id = id;
	},
	//
	[types.CHANGE_CURRENT_THEME_ID](state){
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
		if(state.isCollectedIds.indexOf(state.id) > 0){
			state.isCollect = true;
		}else{
			state.isCollect = false;
		}
	}
}
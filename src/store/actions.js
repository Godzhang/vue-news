import * as types from './mutation_types';

export default {
	//改变跳转详情页的路由状态，判断是从哪里跳入
	changeGoType({commit}, id){
		commit(types.CHANGE_GO_TYPES, id);
	},
	//判断收藏状态
	judgeCollectState({commit}){
		commit(types.JUDGE_COLLECT_STATE);
	}
}
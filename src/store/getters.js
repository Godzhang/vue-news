export default {
	isNight: state => state.isNight,
	currentThemeId: state => state.currentThemeId,
	id: state => state.id,
    getCollect: state => state.isCollect ? '取消收藏' : '收藏'
}
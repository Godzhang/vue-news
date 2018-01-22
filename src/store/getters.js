export default {
    isNight: state => state.isNight,
	model: state => state.isNight ? 'night' : 'morning',
	currentThemeId: state => state.currentThemeId,
	id: state => state.id,
    getCollect: state => state.isCollect ? '取消收藏' : '收藏',
    stories: state => state.stories,
    isFirstLoad: state => state.isFirstLoad,
    homepageDate: state => state.homepageDate,
    homepageDateStr: state => state.homepageDateStr,
    themeTitle: state => state.themeTitle
}
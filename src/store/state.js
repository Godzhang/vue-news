export default {
	id: '',
	isNight: false,
	currentThemeId: -1,
	goType: 1,
	isCollect: false,	//当前收藏状态
	isCollectNews: [],	//收藏新闻数组
	isCollectedIds: [],	//收藏新闻id数组
    popularity: 0,     	//当前新闻点赞数
    comments: 0,		//当前新闻评论总数
    long_comments: 0,	//当前新闻长评数
    short_comments: 0,	//当前新闻短评数
    stories: [],		//当前新闻数组
    isFirstLoad: true,	//第一次进入主页
    ids: [],
    homepageDate:0,      //首页当前日期
    homepageDateStr:0,   //首页日期字符串
    dateStr:0,            //详情页日期字符串
    date:0,                //详情页日期,
    currentTheme: '',     //当前主题数组
    themeids:[],          //当前主题新闻数组id
    allStories:[],        //全部已加载新闻数组
    editor:'',             //当前主编信息
    themeTitle: ''  

}
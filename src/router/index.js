import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/home-page/homePage'
import Collect from '@/components/collect/collect'
import NewDetail from '@/components/new-detail/new-detail'
import ThemeDetail from '@/components/theme-detail/theme-detail'
import Editor from '@/components/editor/editor'
import EditorList from '@/components/editor-list/editor-list'
import Comments from '@/components/comments/comments'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage
    },
    {
    	path: '/collect',
    	name: 'collect',
    	component: Collect
    },
    {
      path: '/newDetail/:id',
      name: 'newDetail',
      component: NewDetail
    },
    {
      path: '/themeDetail/:id',
      name: 'themeDetail',
      component: ThemeDetail
    },
    {
      path: '/editor/:id',
      name: 'editor',
      component: Editor
    },
    {
      path: '/editorList/:id',
      name: 'editorsList',
      component: EditorList
    },
    {
      path: '/comments/:id',
      name: 'comments',
      component: Comments
    }
  ]
})

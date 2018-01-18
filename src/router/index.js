import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/home-page/homePage'
import Collect from '@/components/collect/collect'
import NewDetail from '@/components/new-detail/new-detail'

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
    }
  ]
})

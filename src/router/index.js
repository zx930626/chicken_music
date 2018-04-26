import Vue from 'vue'
import Router from 'vue-router'
import tab from '@/components/tab'
import recommend from '@/components/recommend'
import rank from '@/components/rank'
import singer from '../components/singer'
import search from '../components/search'
import Disc from '../components/disc'

Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend',
    },
    {
      path:'/recommend',
      component:recommend,
      children:[
        {
          path:':id',
          component:Disc
        }
      ]
    },
    {
      path:'/rank',
      name:'rank',
      component:rank,
    },
    {
      path:'/singer',
      name:'singer',
      component:singer
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
  ]
})

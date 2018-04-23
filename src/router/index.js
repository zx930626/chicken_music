import Vue from 'vue'
import Router from 'vue-router'
import tab from '@/components/tab'
import recommend from '@/components/recommend'
import rank from '@/components/rank'

Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path:'/rank',
      name:'rank',
      component:rank
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import LOGIN from '@/views/login'
import HOME from '@/views/index'
import OVERVIEW from '@/views/content/overview'
import REPORT from '@/views/content/report'
import CHARGE from '@/views/content/charge'
import USER from '@/views/content/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HOME,
      children: [
        {
          path: '/',
          name: 'overview',
          component: OVERVIEW
        },
        {
          path: '/report',
          name: 'report',
          component: REPORT
        },
        {
          path: '/user',
          name: 'user',
          component: USER
        },
        {
          path: '/charge',
          name: 'charge',
          component: CHARGE
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LOGIN
    }
  ]
})

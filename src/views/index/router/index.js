import Vue from 'vue'
import Router from 'vue-router'

import Home from '../home'
import WritePanel from '../write-panel/writePanel'
import Login from '../login'

// const _import = require('./_import_' + process.env.NODE_ENV)
// const Test = _import('index/home/index')
// const Index = _import('index/App')

Vue.use(Router)
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/write',
      name: 'panel',
      component: WritePanel
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
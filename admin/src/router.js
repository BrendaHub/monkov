import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import store from 'src/store'

const routes = [
  {
    path: '/drafts',
    component: resolve => require(['components/drafts'], resolve)
  }, {
    path: '/tags',
    component: resolve => require(['components/Tags'], resolve)
  }, {
    path: '/login',
    component: resolve => require(['components/Login'], resolve)
  }, {
    path: '/',
    redirect: '/drafts'
  }
]

const router = new VueRouter({routes, mode: 'history'})
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    store.state.token.token
      ? next()
      : next('login')
    // next()
  } else {
    if (!store.state.token.token) {
      next()
    } else {
      from.path
        ? next(from.path)
        : next('/drafts')
    }
  }
})

export default router

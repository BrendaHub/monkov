// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Blog from './Blog'
import VueRouter from 'vue-router'
import routes from './routes'
/* eslint-disable no-new */

Vue.use(VueRouter)

const router = new VueRouter({routes: routes})

const app = new Vue({
  el:'#app',
  router,
  render: h => h(Blog)
})

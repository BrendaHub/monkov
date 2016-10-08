// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Blog from './Blog'
import Router from 'vue-router'
import routes from './routes'
/* eslint-disable no-new */

Vue.use(Router)
const router = new Router()
routes(router)
router.start(Blog, 'blog')
new Vue({
  el: '#blog',
  render: h => h(Blog)
})

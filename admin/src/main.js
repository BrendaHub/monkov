import Vue from 'vue'
import Admin from './Admin'
import store from 'src/store'
import router from './router'
import 'normalize.css'
// window.alert = MessageBox
/* eslint-disable no-new */

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Admin)
})

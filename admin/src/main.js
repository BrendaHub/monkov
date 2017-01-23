// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Admin from './Admin'
import store from 'src/store'
import MessageBox from 'vue-msgbox'
import router from './router'
/* eslint-disable no-new */
// window.alert = MessageBox

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(Admin)
})

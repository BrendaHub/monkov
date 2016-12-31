import Vue from 'vue'
import Vuex from 'vuex'
import drafts from './modules/drafts.js'
import token from './modules/token.js'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.store({
  modules: {
    drafts,
    token
  },
  strict: debug
})

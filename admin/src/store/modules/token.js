import * as types from '../mutation-types'

const getters = {
  token: state => state.token
}

const state = {
  token: sessionStorage.getItem('token')
}

const mutations = {
  [types.TOKEN_CREATE](state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  [types.TOKEN_DELETE](state, token) {
    sessionStorage.removeItem('token')
    state.token = null
  }
}

const actions = {
  createToken(store, username, password) {
    //
  },
  deleteToken({dispatch}) {
    //
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

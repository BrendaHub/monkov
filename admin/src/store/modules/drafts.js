import * as types from '../mutation-types'
import api from 'src/api'
const state = {
  all: [],
  currentId: null,
  currentIndex: -1,
  postId: null,
  title: '',
  saved: true,
  titleSaved: true
}

const getters = {
  all: state => state.all,
  currentId: state => state.currentId,
  currentIndex: state => state.currentIndex,
  postId: state => state.postId,
  title: state => state.title,
  saved: state => state.saved,
  titleSaved: state => state.titleSaved
}

const mutations = {
  [types.RECEIVE_ALL](state, list) {
    if (state.saved && state.titleSaved) {
      state.all = list
      if (list.length == 0) {
        state.currentId = null
        state.currentIndex = -1
      }
    }
  },
  [types.FOCUS](state, index) {
    if (state.saved && state.titleSaved) {
      state.currentIndex = index,
      state.currentId = state.all[index].id
      state.excerpt = state.all[index].excerpt
      state.postId = state.all[index].post
      state.title = state.all[index].title
    }
  },
  [types.EDIT](state) {
    if (state.saved) {
      state.all[state.currentIndex].published = false
      state.saved = false
    }
  },
  [types.SAVE](state) {
    state.saved = true
  },
  [types.TITLE_EDIT](state) {
    if (state.titleSaved) {
      state.all[state.currentIndex].published = false
      state.saved = false
    }
  },
  [types.TITLE_SAVE](state) {
    if (!state.titleSaved) {
      state.titleSaved = true;
    }
  },
  [types.DELETE](state) {
    if (state.saved && state.titleSaved) {
      state.all.splice(state.currentIndex, 1)
      if (state.all.length) {
        state.currentIndex = 0
        state.currentId = state.all[0].id
        state.title.state.all[0].title
        state.postId = state.all[0].post
      } else {
        state.currentId = null
        state.currentIndex = -1
        state.postId = null
        state.title = ''
      }
    }
  },
  [types.PUBLISH](state, postId) {
    state.postId = postId
    state.all[state.currentIndex].post = postId
    state.all[state.currentIndex].published = true
  },
  [types.TITLE_MODIFY](state, title) {
    state.title = title
    state.all[state.currentIndex].title = title
  },
  [types.EXCERPT_MODIFY](state, excerpt) {
    state.all[state.currentIndex].excerpt = excerpt
  },
  [types.TAG_MODIFY](state) {
    state.all[state.currentIndex].published = false
  },
  [types.LAST_EDIT_TIME](state, time) {
    state.all[state.currentIndex].lastEditTime = time
  },
  [types.CREATE](state, draft) {
    state.all.unshift(draft)
    state.currentIndex = 0
    state.currentId = state.all[0].id
    state.title = state.all[0].title
    state.postId = state.all[0].post
  }
}

const actions = {
  async getAllDrafts(store, query) {
    if (query) {
      const {tags, category} = query
    }
    //fix me
    const res = await api.getDraftList()
    if (res.success) {
      store.commit(types.RECEIVE_ALL, res.data)
      res.data.length && store.commit(types.FOCUS, 0)
    }
  },
  focusOnDraft(store, index) {
    store.commit(types.FOCUS, index)
  },
  editDraft(store) {
    store.commit(types.EDIT)
  },
  saveDraft(store) {
    store.commit(types.SAVE)
  },
  editTitle(store) {
    store.commit(types.TITLE_EDIT)
  },
  saveTitle(store) {
    store.commit(types.TITLE_SAVE)
  },
  async deleteDraft(store) {
    if (store.state.saved) {
      const res = await api.deleteDraft(store.state.currentId)
      res.success && store.commit(types.DELETE)
    }
  },
  async publish(store) {
    const res = await api.publish(store.state.currentId)
    res.success && store.commit(types.PUBLISH, res.data.draft.id)
  },
  async submitTitle(store, title) {
    const res = await api.modifyDraftTitle(store.state.currentId, title)
    if (res.success) {
      store.commit(types.TITLE_MODIFY, title)
      store.commit(types.LAST_EDIT_TIME, res.data.lastEditTime)
    }
  },
  submitExcerpt(store, {excerpt, time}) {
    store.commit(types.EXCERPT_MODIFY, excerpt)
    store.commit(types.LAST_EDIT_TIME, time)
  },
  async createDraft(store) {
    const res = await api.createDraft('New Draft')
    if (!res.success)
      return Promise.reject()
    store.commit(types.CREATE, res.data)
  },
  modifyTags(store, time) {
    store.commit(types.TAG_MODIFY)
    store.commit(types.LAST_EDIT_TIME, time)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

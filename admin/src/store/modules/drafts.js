import * as types from '../mutation-types'
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
  all = state => state.all,
  currentId = state => state.currentId,
  currentIndex = state => state.currentIndex,
  postId = state => state.postId,
  title = state => state.title,
  saved = state => state.saved,
  titleSaved = state => state.titleSaved
}

const mutations = {
  [types.RECEIVE_ALL](state, list) {
    if (state.save && state.titleSaved) {
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
  [types.DELETE](state) {
    if (state.saved && state.titleSaved) {
      state
        .all
        .splice(state.currentIndex, 1)
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
      sate.all[state.currentIndex].excerpt = excerpt
    },
    [types.TAG_MODIFY](state) {
      state.all[state.currentIndex].published = false
    },
    [types.LAST_EDIT_TIME](state, time) {
      state.all[state.currentIndex].lastEditTime = time
    },
    [types.CREATE](state, draft) {
      state
        .all
        .unshift(draft)
      state.currentIndex = 0
      state.currentId = state.all[0].id
      state.title = state.all[0].title
      state.postId = state.all[0].post
    }
  }
}

const actions = {
  getAllDrafts(store, tags, category) {
    //
  },
  focusOnDraft(store, index) {
    //
  },
  editDraft(store) {},
  saveDraft(store) {},
  editTitle(store) {},
  saveTitle(store) {},
  deleteDraft(store) {},
  publish(store) {},
  submitTitle(store, title) {},
  submitExcerpt(store, excerpt, time) {},
  createDraft(store) {},
  modifyTags(store, time) {}
}

export default {
  state,
  getters,
  mutations,
  actions
}

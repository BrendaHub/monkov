import service from './service.js'

export default {
  createToken(username, password) {
    return service.post('tokens', {username, password})
  },
  getDraftList(tag) {
    return service.get('drafts', {tag})
  },
  getDraft(title) {
    return service.get(`drafts/${title}`)
  },
  modifyDraftContent(title, content) {
    return service.patch(`drafts/${title}`, {content})
  },
  modifyDraftTitle(title, newTitle) {
    return service.patch(`drafts/${title}`, {newTitle})
  },
  modifyDraftTags(title, tags) {
    return service.patch(`drafts/${title}`, {tags})
  },
  modifyDraftCategory(title, category) {
    return service.patch(`drafts/${title}`, {category})
  },
  createTag(name) {
    return service.post('tags', {name})
  },
  createCategory(name) {
    return service.post('categories', {name})
  },
  createDraft(title) {
    return service.post('drafts', {title})
  },
  publish(title) {
    return service.post('publication', {draftTitle: title})
  },
  deleteDraft(title) {
    return service.delete(`drafts/${title}`)
  },
  getAllTags() {
    return service.get('tags')
  },
  modifyTag(name, newName) {
    return service.patch(`tags/${name}`, {name: newName})
  },
  deleteTag(name) {
    return service.delete(`tags/${name}`)
  },
  getAllCategories() {
    return service.get('categories')
  },
  modifyCategory(name, newName) {
    return service.patch(`categories/${name}`, {name: newName})
  },
  deleteCatefory(name) {
    return service.delete(`categories/${name}`)
  },
  searchTagWithWord(keyword) {
    return service.get('tags', {'start-with': keyword})
  }
}

import service from './service.js'

export default {
  async createToken(username, password) {
    return await service.post('tokens', {username, password})
  },
  async getDraftList(tag) {
    return await service.get('drafts', {tag})
  },
  async getDraft(title) {
    return await service.get(`drafts/${title}`)
  },
  async modifyDraftContent(title, content) {
    return await service.patch(`drafts/${title}`, {content})
  },
  async modifyDraftTitle(title, newTitle) {
    return await service.patch(`drafts/${title}`, {newTitle})
  },
  async modifyDraftTags(title, tags) {
    return await service.patch(`drafts/${title}`, {tags})
  },
  async modifyDraftCategory(title, category) {
    return await service.patch(`drafts/${title}`, {category})
  },
  async createTag(name) {
    return await service.post('tags', {name})
  },
  async createCategory(name) {
    return await service.post('categories', {name})
  },
  async createDraft(title) {
    return await service.post('drafts', {title})
  },
  async publish(title) {
    return await service.post('publication', {draftTitle: title})
  },
  async deleteDraft(title) {
    return await service.delete(`drafts/${title}`)
  },
  async getAllTags() {
    return await service.get('tags')
  },
  async modifyTag(name, newName) {
    return await service.patch(`tags/${name}`, {name: newName})
  },
  async deleteTag(name) {
    return await service.delete(`tags/${name}`)
  },
  async getAllCategories() {
    return await service.get('categories')
  },
  async modifyCategory(name, newName) {
    return await service.patch(`categories/${name}`, {name: newName})
  },
  async deleteCatefory(name) {
    return await service.delete(`categories/${name}`)
  },
  async searchTagWithWord(keyword) {
    return await service.get('tags', {'start-with': keyword})
  }
}

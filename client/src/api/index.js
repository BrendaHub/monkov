import service from './service.js'

export default {
  getPostList(params) {
    return service.get('posts', params)
  },
  getPost(id) {
    return service.get(`posts/${id}`)
  },
  getAllTags() {
    return service.get('tags')
  },
  getPostsByTag(tagId) {
    return service.get('posts', {tag: tagId})
  },
  getAbout() {
    return service.get('about')
  }
}

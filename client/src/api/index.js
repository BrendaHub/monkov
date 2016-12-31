import service from './service.js'

export default {
  getPostList(params) {
    return service.get('posts', params)
  },
  getPost(title) {
    return service.get(`posts/${title}`)
  },
  getAllTags() {
    return service.get('tags')
  },
  getCategories(params) {
    return service.get('categories', params)
  }
}

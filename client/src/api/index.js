import service from './service.js'

export default {
  getPostList(params) {
    return service.get('postlist', params)
  },
  getPost(id) {
    return service.get(`post/${id}`)
  },
  getAllTags() {
    return service.get('tags')
  },
  getPostsByTag(tagId) {
    return service.get('postlist', {tag: tagId})
  },
  getAbout() {
    return service.get('about')
  }
}

import Post from '../models/post.js'

export default init = router => {
  router
    .post('/post')
    .get('postlist')
    .get('post/:id')
    .patch('post/:id')
}

async function postlist(next) {
  const tag = this.query.tag
  if (tag) {
    let postArr = await Post
      .find({
      tags: {
        "$all": [tag]
      }
    })
      .select('title createTime lastEditTime')
      .sort({createTime: -1})
      .exec()
      .catch(err => {
        this.throw(500, 'internal error')
      });
    this.body = {
      success: true,
      data: postArr
    }
  } else {
    const limit = ~~this.query.limit || 10
  }
}

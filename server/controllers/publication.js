import utils from '../utils'
import mw from '../middlewares'
import Draft from '../models/draft.js'
import Post from '../models/post.js'

export default router => router.post('/publish', mw.verifyToken, publish)

let publish = async(ctx, next) => {
  const draftTitle = ctx.request.body.title
  const draft = await Draft
    .findOne({title: draftTitle})
    .exec()
    .catch(utils.internalErrHandler);
  if (!draft.title.length || !draft.excerpt.length || !draft.content.length) {
    ctx.throw(400, 'title, excerpt and content required')
  }
  draft.published = true
  draft.lastEditTime = new Date()
  const postObj = draft.toObject()
  delete postObj._id
  delete postObj.id
  delete postObj.published
  delete postObj.post
  draft
    .save()
    .exec()
    .catch(utils.internalErrHandler);
  let post
  if (draft.post) {
    delete postObj.createTime
    post = await Post.findByIdAndUpdate(draft.post, {
      $set: postObj
    }, {new: true})
      .populate('tags category')
      .exec()
      .catch(utils.internalErrHandler)
  } else {
    postObj.createTime = postObj.lastEditTime
    delete postObj.lastEditTime
    postObj.visit = 0
    postObj.comments = []
    post = await new Post(postObj)
      .save()
      .exec()
      .catch(utils.internalErrHandler);
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    data: post
  }
  await next()
}

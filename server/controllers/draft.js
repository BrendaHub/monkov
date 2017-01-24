import utils from '../utils'
import mw from '../middlewares'
import Draft from '../models/draft.js'
import Tag from '../models/tag.js'
import Category from '../models/category.js'

export default router => {
  router.post('/drafts', mw.verifyToken, create).patch('/drafts/:id', mw.verifyToken, modify).get('/drafts', mw.verifyToken, draftList).get('/drafts/:id', mw.verifyToken, draftDetail).delete('/drafts/:id', mw.verifyToken, deleteDraft)
}

let create = async(ctx, next) => {
  const title = ctx.request.body.title
  const createTime = new Date()
  const lastEditTime = new Date()
  const excerpt = ''
  const content = ''
  const post = null
  const published = false
  !title && ctx.throw(400, 'Title Required')
  let draft = new Draft({
    title,
    createTime,
    lastEditTime,
    excerpt,
    content,
    post,
    published
  })
  const result = await draft.save().catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draft
  }
  await next()
}

let draftList = async(ctx, next) => {
  const tag = ctx.query.tag
  const category = ctx.query.category
  let findOpt = {}
  if (tag) {
    let tagId = await Tag.findOne({name: tag}).exec().catch(utils.internalErrHandler);
    tagId = tagId.id
    Object.assign(findOpt, {
      tags: {
        '$all': [tagId]
      }
    })
  }
  if (category) {
    let catId = await Category.findOne({name: category}).exec().catch(utils.internalErrHandler());
    catId = catId.id
    Object.assign(findOpt, {category: catId})
  }
  const draftArr = await Draft.find(findOpt).populate('tags category').select('title tags category createTime lastEditTime excerpt post published').sort({lastEditTime: -1}).exec().catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draftArr
  }
  await next()
}

let draftDetail = async(ctx, next) => {
  const id = ctx.params.id
  let draft = await Draft.findById(id).populate('tags category').select('title tags category createTime lastEditTime excerpt article draftPublished content').exec().catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draft
  }
  await next()
}

let modify = async(ctx, next) => {
  const id = ctx.params.id
  const modifyOpt = ctx.request.body
  if (modifyOpt.content) {
    const contentArr = modifyOpt.content.split('<!-- more -->')
    modifyOpt.excerpt = contentArr.length > 1
      ? contentArr[0]
      : ''
  }
  modifyOpt.lastEditTime = new Date()
  modifyOpt.published = false
  let result = await Draft.findByIdAndUpdate(id, {
    $set: modifyOpt
  }, {new: true}).populate('tags category').exec().catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: result
  }
  await next()
}

let deleteDraft = async(ctx, next) => {
  const id = ctx.params.id
  const draft = await Draft.findById(id).select('post').exec().catch(utils.internalErrHandler);
  !draft && ctx.throw(400, 'draft not exist')
  draft.post && ctx.throw(403, 'draft already published')
  const result = await Draft.remove({id}).exec().catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true
  }
  await next()
}

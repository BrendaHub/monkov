import Tag from '../models/tag'
import Draft from '../models/draft.js'
import Post from '../models/post.js'
import utils from '../utils'
import mw from '../middlewares'

export default router => {
  router.post('/tags', create).get('/tags', tagList).patch('/tags/:name', modify).delete('/tags/:name', deleteTag).get('/tags/:name', tagDetail)
}

let tagList = async(ctx, next) => {
  const startWith = ctx.query['start-with']
  const queryOpt = {}
  if (startWith) {
    queryOpt.name = {
      $regex: '^' + startWith
    }
  }
  const taglist = await Tag.find(queryOpt).select('name').exec().catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: taglist
  }
  await next()
}

async function tagDetail(ctx, next) {
  const tagName = ctx.params.name
  const tag = await Tag.find({name}).exec().catch()
  const id = tag.id
  // const count = await Post.find({tags:})
}

let create = async(ctx, next) => {
  const tagName = ctx.request.body.name
  if (!tagName || !tagName.length) {
    ctx.throw(400, 'tag name expected')
  }
  const tag = await Tag.findOne({name: tagName}).exec().catch(utils.internalErrHandler);
  if (tag) {
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        id: tag._id,
        name: tag.name
      }
    }
    return await next()
  }

  const newTag = new Tag({name: tagName})
  const result = await newTag.save().catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      id: result._id,
      name: result.name
    }
  }
  await next()
}

let modify = async(ctx, next) => {
  const newName = ctx.request.body.name
  const tagName = ctx.params.name
  const tag = await Tag.findOne({name: newName}).exec().catch(utils.internalErrHandler);
  if (!tag) {
    await Tag.update({
      name: tagName
    }, {
      $set: {
        name: newName
      }
    }).exec().catch(utils.internalErrHandler);
    ctx.status = 200
    ctx.body = {
      success: true
    }
  } else {
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        id: tag._id
      }
    }
  }
  await next()
}

let deleteTag = async(ctx, next) => {
  const name = ctx.params.name
  const tag = await Tag.findOne({name}).exec().catch(utils.internalErrHandler);
  !tag && ctx.throw('400', 'tag not exist')
  await Promise.all([
    Draft.update({}, {
      $pull: {
        tags: tag.id
      }
    }).exec(),
    Post.update({}, {
      $pull: {
        tags: tag.id
      }
    }).exec(),
    Tag.remove({_id: tag.id}).exec()
  ]).catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true
  }
  await next()
}

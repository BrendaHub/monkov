import Tag from '../models/tag'
import utils from '../utils'
import mw from '../middlewares'

export default router => {
  router
    .post('/tags', create)
    .get('/tags', tagList)
    .patch('/tags/:id', modify)
    .delete('/tags/:id', deleteTag)
}

let tagList = async(ctx, next) => {
  const queryStart = ctx.query['start-with']
  const queryOption = {}
  if (queryStart) {
    queryOption.name = {
      $regex: '^' + queryStart
    }
  }
  const taglist = await Tag
    .find(queryOption)
    .exec()
    .catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: taglist
  }
  await next()
}

let create = async(ctx, next) => {
  const tagName = ctx.request.body.name
  if (!~~ tagName) {
    ctx.throw(400, 'tag name expected')
  }
  const tag = await Tag
    .findOne({name: tagName})
    .exec()
    .catch(utils.internalErrHandler);
  if (tag) {
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        id: tag._id
      }
    }
    return await next()
  }

  const newTag = new Tag({name: tagName})
  const result = await newTag
    .save()
    .catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      id: result._id
    }
  }
  await next()
}

let modify = async(ctx, next) => {
  const tagName = ctx.request.body.name
  const tagId = ctx.params.id
  const tag = await Tag
    .findOne({name: tagName})
    .exec()
    .catch(utils.internalErrHandler);
  if (!tag) {
    await Tag.update({
      _id: tagId
    }, {
        $set: {
          name: tagName
        }
      })
      .exec()
      .catch(utils.internalErrHandler);
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
  const id = ctx.params.id
  //unfinished
  await next()
}

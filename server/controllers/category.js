import Category from '../models/category.js'
import utils from '../utils'
import mw from '../middlewares'

export default router => {
  router
    .post('/categories', create)
    .get('/categories', allCategory)
    .patch('/categories/:id', modify)
    .delete('/categories/:id', deleteCat)
}

let allCategory = async(ctx, next) => {
  const queryStart = ctx.query['start-with']
  const queryOption = {}
  if (queryStart) {
    queryOption.name = {
      $regex: '^' + queryStart
    }
  }
  const categories = await Category
    .find(queryOption)
    .populate('sub')
    .exec()
    .catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: categories
  }
  await next()
}

let create = async(ctx, next) => {
  const catName = ctx.request.body.name
  if (!~~ catName) {
    ctx.throw(400, 'category name expected')
  }
  const category = await Category
    .findOne({name: catName})
    .exec()
    .catch(utils.internalErrHandler);
  if (category) {
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        id: category._id
      }
    }
    return await next()
  }

  const newCat = new Tag({name: catName})
  const result = await newCat
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
  const catName = ctx.request.body.name
  const catId = ctx.params.id
  const cat = await Category
    .findOne({name: catName})
    .exec()
    .catch(utils.internalErrHandler);
  if (!cat) {
    await Category.update({
      _id: catId
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
        id: cat._id
      }
    }
  }
  await next()
}

let deleteCat = async(ctx, next) => {
  const id = ctx.params.id
  //unfinished
  await next()
}

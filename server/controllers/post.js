import Post from '../models/post.js'
import utils from '../utils'
import mw from '../middlewares'

export default router => {
  router
    .get('/posts', postlist)
    .post('/posts', create)
    .get('/posts/:id', postDetail)
    .patch('/posts/:id', modify)
}

let create = async(ctx, next) => {
  const {title, tags, content, excerpt} = ctx.request.body
  if (!title || !content) {
    ctx.throw(400, 'Title and content required')
  }
  const post = new Post({
    title,
    tags,
    content,
    excerpt,
    visit: 0,
    createTime: new Date(),
    lastEditTime: new Date(),
    comments: []
  })
  const result = await post
    .save()
    .catch(utils.internalErrHandler);
  ctx.status = 200
  ctx.body = {
    success: true,
    data: result._id
  }
  await next()
}

let postlist = async(ctx, next) => {
  const tag = ctx.query.tag
  if (tag) {
    let postArr = await Post
      .find({
      tags: {
        "$all": [tag]
      }
    })
      .select('title tags imagesrc lastEditTime excerpt')
      .sort({createTime: -1})
      .exec()
      .catch(err => {
        utils
          .logger
          .error(err)
        ctx.throw(500, 'internal error')
      });
    ctx.body = {
      success: true,
      data: postArr
    }
  } else {
    const limit = ~~ctx.query.limit || 10
    const page = ~~ctx.query.page || 1
    let skip = limit * (page - 1)
    const {postArr, totalNumber} = {
      postArr: await Post
        .find()
        .populate('tags ')
        .select('title imagesrc tags lastEditTime excerpt')
        .sort({createTime: -1})
        .limit(limit)
        .skip(skip)
        .exec()
        .catch(utils.internalErrHandler),
      totalNumber: await Post
        .count()
        .exec()
        .catch(utils.internalErrHandler)
    }
    ctx.status = 200
    const resultArr = []
    if (postArr.length) {
      Array
        .prototype
        .forEach
        .call(postArr, post => {
          resultArr.push(post.toObject())
        })
    }
    ctx.body = {
      success: true,
      data: {
        postArr,
        totalNumber
      }
    }
  }
  await next()
}

let postDetail = async(ctx, next) => {
  const id = ctx.params.id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    ctx.throw(400, 'invalid id')
  }
  let post = await Post
    .findById(id)
    .populate('tags')
    .select('title visit tags createTime lastEditTime excerpt content')
    .exec()
    .catch(utils.internalErrHandler);
  ctx.status = 200
  if (post) {
    post = post.toObject();
    ({prevPost: post.prevPost, nextPost: post.nextPost} = {
      prevPost: await post.findOne({
        _id: {
          $gt: post._id
        }
      }, 'title _id')
        .exec()
        .catch(utils.internalErrHandler),
      nextPost: await post.findOne({
        _id: {
          $lt: post._id
        }
      }, 'title _id')
        .sort({_id: -1})
        .exec()
        .catch(utils.internalErrHandler)
    })
  }
  ctx.body = {
    success: true,
    data: post
  }
  await next()
}

let modify = async(ctx, next) => {
  const id = ctx.params.id
  let post = await Post.findByIdAndUpdate(id, {
    $set: ctx.request.body
  }, {new: true})
    .exec()
    .catch(utils.internalErrHandler);
  post = post.toObject()
  ctx.status = 200
  ctx.body = {
    success: true,
    data: post
  }
  await next()
}

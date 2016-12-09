import Post from '../models/post.js'
import utils from '../utils'
import mw from '../middlewares'

export default router => {
  router
    .get('/posts', postlist)
    .post('/posts', mw.verifyToken, create)
    .get('/posts/:id', postDetail)
    .patch('/posts/:id', mw.verifyToken, modify)
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
    createTime: new Date(),
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
  const category = ctx.query.category
  const limit = ~~ctx.query.limit || 10
  const page = ~~ctx.query.page || 1
  let skip = limit * (page - 1)
  let findOpt = {}
  tag && Object.assign(findOpt, {
    tags: {
      '$all': [tag]
    }
  })
  category && Object.assign(findOpt, {category})
  const {postArr, totalNumber} = {
    postArr: await Post
      .find(findOpt)
      .populate('tags')
      .populate('category')
      .select('title imagesrc category tags createTime excerpt')
      .sort({createTime: -1})
      .limit(limit)
      .skip(skip)
      .exec()
      .catch(utils.internalErrHandler),
    totalNumber: await Post
      .find(findOpt)
      .count()
      .exec()
      .catch(utils.internalErrHandler)
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      postArr,
      totalNumber
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
    .select('title visit tags createTime createTime excerpt content')
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

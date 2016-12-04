import Post from '../models/post.js'
import utils from '../utils'

export default router => {
  router
    .get('/posts', postlist)
    .post('/posts', create)
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
    .catch(err => {
      utils
        .logger
        .error(err)
      ctx.throw(500, 'internal error')
    });
  ctx.status = 200
  ctx.body = {
    success: true,
    data: result._id
  }
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
      .select('title imagesrc lastEditTime excerpt')
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
        .select('title imagesrc lastEditTime excerpt')
        .sort({createTime: -1})
        .limit(limit)
        .skip(skip)
        .exec()
        .catch(err => {
          utils
            .logger
            .error(err)
          ctx.throw(500, 'internal error')
        }),
      totalNumber: await Post
        .count()
        .exec()
        .catch(err => {
          utils
            .logger
            .error(err)
          ctx.throw(500, 'internal error')
        })
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
}

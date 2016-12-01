import Post from '../models/post.js'
import '../utils'

export default router => {
  router.get('/postlist', postlist)
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
      .select('title createTime lastEditTime')
      .sort({createTime: -1})
      .exec()
      .catch(err => {
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
    const {postArr, totalNumber} = await {
      postArr: Post
        .find()
        .populate('tags')
        .select('title visit tags createTime lastEditTime excerpt comments')
        .sort({createTime: -1})
        .limit(limit)
        .skip(skip)
        .exec()
        .catch(err => {
          ctx.throw(500, 'internal error')
        }),
      totalNumber: Post
        .count()
        .exec()
        .catch(err => {
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

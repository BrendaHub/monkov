import Post from '../models/post.js'
import '../utils'

export default init = router => {
  router.get('postlist', postlist)
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
    const page = ~~this.query.page || 1
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
          this.throw(500, 'internal error')
        }),
      totalNumber: Post
        .count()
        .exec()
        .catch(err => {
          this.throw(500, 'internal error')
        })
    }
    this.status = 200
    const resultArr = []
    if (postArr) {
      postArr.forEach(post => {
        resultArr.push(post.toObject())
      })
    }
    this.body = {
      success: true,
      data: {
        postArr,
        totalNumber
      }
    }
  }
}

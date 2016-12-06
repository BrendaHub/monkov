import initPost from './post.js'
import initTag from './tag.js'
import initComment from './comment.js'

export default async(router) => {
  await initPost(router)
  await initTag(router)
}

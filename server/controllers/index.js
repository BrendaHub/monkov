import initPost from './post.js'
import './tag.js'
import './comment.js'

export default async(router) => {
  await initPost(router)
}

import initPost from './post.js'
import initTag from './tag.js'
import initComment from './comment.js'
import initCategory from './category.js'

export default async(router) => {
  await initPost(router)
  await initTag(router)
  await initCategory(router)
}

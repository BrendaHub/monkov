import initPost from './post.js'
import initTag from './tag.js'
import initComment from './comment.js'
import initCategory from './category.js'
import initDraft from './draft.js'
import initPublish from './publication.js'
import initToken from './tokens.js'

export default router => {
  initPost(router)
  initTag(router)
  initCategory(router)
  initDraft(router)
  initPublish(router)
  initToken(router)
}

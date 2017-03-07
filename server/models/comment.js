import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  message: String,
  createTime: {
    type: Date
  },
  user: String,
  userAvator: {
    type: String,
    default: ''
  },
  replyTo: Number
})

export default mongoose.model('comment', commentSchema)

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
  author: String,
  authorAvator: {
    type: String,
    default: ''
  }
})

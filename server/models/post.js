import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  visit: {
    type: Number,
    default: 0
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tag'
    }
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
    }
  ],
  createTime: {
    type: Date,
    default: Date.now
  },
  lastEditTime: {
    type: Date,
    default: Date.now
  },
  hidden: Boolean,
  excerpt: String,
  content: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
}, {
  versionKey: false,
  skipVersioning: {
    tags: true
  }
})

postSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
postSchema.set('toObject', {
  getters: true,
  virtuals: true
});
postSchema.path('createTime').get(function(v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
postSchema.path('lastEditTime').get(function(v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss');
});
export default mongoose.model('post', postSchema)

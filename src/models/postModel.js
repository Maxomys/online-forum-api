const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const postSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: [{
    username: {
      type: String
    }
  }],
  edited: {
    type: Boolean,
    default: false
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }

})

postSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', postSchema)

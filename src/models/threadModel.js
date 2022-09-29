const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const threadSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 200,
    uniquie: true,
    required: true
  },
  modifiedAt: {
    type: Date,
    default: Date.now
  },
  
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }

})

threadSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Thread', threadSchema)

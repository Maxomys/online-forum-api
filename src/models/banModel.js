const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const banSchema = new mongoose.Schema({
  givenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  givenTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endsAt: {
    type: Date,
    required: true
  },
  givenAt: {
    type: Date,
    default: Date.now
  },
  canceled: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true
  }

})

banSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Ban', banSchema)

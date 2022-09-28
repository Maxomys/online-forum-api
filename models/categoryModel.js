const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    unique: true,
    required: true
  }

})

module.exports = mongoose.model('Category', categorySchema)

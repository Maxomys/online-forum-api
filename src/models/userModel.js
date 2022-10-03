const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [16, 'Username can be 16 characters long.'],
    unique: true,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Email validation failed.'
    },
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accountType: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  about: {
    type: String,
    maxLength: [255, 'About can be 255 characters long.']
  },
  lastSeen: {
    type: Date
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  likeCount: {
    type: Number,
    default: 0
  }
  
})

module.exports = mongoose.model('User', userSchema)

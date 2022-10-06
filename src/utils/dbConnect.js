const mongoose = require('mongoose')
const { handleLogin } = require('../controllers/userController')

async function connect(app) {
  require('../models/banModel')
  require('../models/categoryModel')
  require('../models/postModel')
  require('../models/threadModel')
  require('../models/userModel')

  let uri
  switch (app.get('env')) {
    case 'test':
      uri = process.env.DB_TEST_URI
      break
    case 'development':
      uri = process.env.DB_URI
      break
  }

  try {
    console.log(uri)
    await mongoose.connect(uri, { autoIndex: true })
    console.log('Mongoose connected!')
  } catch (e) {
    console.log(e)
  }
}

async function disconnect() {
  await mongoose.disconnect()
}


module.exports = {
  connect,
  disconnect
}

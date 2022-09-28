const userModel = require('../models/userModel')

async function getUserById(id) {
  try {
    return await userModel.findById(id)
  } catch (e) {
    console.log(e)
  }
}

async function getUserByUsername(username) {
  try {
    return await userModel.findOne({name: username})
  } catch (e) {
    console.log(e)
  }
}

async function saveUser(user) {
  try {
    return await userModel.create(user)
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  getUserById,
  getUserByUsername,
  saveUser
}

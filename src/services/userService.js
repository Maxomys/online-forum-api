const userRepository = require('../repositories/userRepository')
const { userDto } = require('../mappers/userMapper')
const bcrypt = require('bcrypt')

const saltRounds = 10

async function getUserDtoByUsername(username) {
  const user = await userRepository.getUserByUsername(username)
  return userDto(user)
}

async function getUserByUsername(username) {
  return await userRepository.getUserByUsername(username)
}

async function createNewUser(receivedUser) {
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(receivedUser.password, salt)

  let user = {
    name: receivedUser.name,
    email: receivedUser.email,
    password: hash,
    accountType: 'user',
    about: receivedUser.about,
  }

  const savedUser = await userRepository.saveUser(user)
  return userDto(savedUser)
}

async function addRefreshString(user, refreshString) {
  const salt = await bcrypt.genSalt(saltRounds)
  user.refreshToken = await bcrypt.hash(refreshString, salt)
  return await userRepository.saveUser(user)
}


module.exports = {
  getUserDtoByUsername,
  getUserByUsername,
  createNewUser,
  addRefreshString
}

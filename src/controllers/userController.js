const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const tokenUtils = require('../utils/tokenUtils')

async function getUserByUsername(req, res) {
  const userDto = await userService.getUserDtoByUsername(req.params.username)
  res.status(200)
  res.json(userDto)
}

async function createNewUser(req, res, next) {
  try {
    const savedUserDto = await userService.createNewUser(req.body)
    res.status(201)
    res.json(savedUserDto)
  } catch (e) {
    next(e)
  }
}

async function handleLogin(req, res) {
  const user = {
    name: req.body.username,
    password: req.body.password
  }

  const foundUser = await userService.getUserByUsername(user.name)

  if (! await bcrypt.compare(user.password, foundUser.password)) {
    res.sendStatus(401)
    return
  }

  const refreshString = randomString.generate()
  
  const token = await tokenUtils.buildAccessToken(foundUser)
  const refreshToken = await tokenUtils.buildRefreshToken(foundUser, refreshString)
  
  await userService.addRefreshString(foundUser, refreshString)

  res.status(200)
  res.json({token, refreshToken})
}

async function handleRefresh(req, res) {
  const refreshToken = req.body.refreshToken
  jwt.verify(refreshToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      res.sendStatus(400)
      return
    }

    const foundUser = await userService.getUserByUsername(decoded.name)
    if (! await bcrypt.compare(decoded.refreshToken, foundUser.refreshToken)) {
      res.sendStatus(401)
      return
    }

    const refreshString = randomString.generate()
    
    const token = await tokenUtils.buildAccessToken(foundUser)
    const refreshToken = await tokenUtils.buildRefreshToken(foundUser, refreshString)
    
    await userService.addRefreshString(foundUser, refreshString)

    res.status(200)
    res.json({token, refreshToken})
  })
}


module.exports = {
  getUserByUsername,
  createNewUser,
  handleLogin,
  handleRefresh
}

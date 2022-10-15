const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const tokenUtils = require('../utils/tokenUtils')

async function getUserByUsername(req, res, next) {
  try {
    const userDto = await userService.getUserDtoByUsername(req.params.username)
    res.status(200)
    res.json(userDto)
  } catch (e) {
    next(e)
  }
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

async function handleLogin(req, res, next) {
  const user = {
    name: req.body.username,
    password: req.body.password
  }

  let foundUser
  try {
    foundUser = await userService.getUserByUsername(user.name)
  } catch (e) {
    next(e)
    return
  }

  if (!await bcrypt.compare(user.password, foundUser.password)) {
    res.sendStatus(401)
    return
  }

  const refreshString = randomString.generate()

  try {
    const token = await tokenUtils.buildAccessToken(foundUser)
    const refreshToken = await tokenUtils.buildRefreshToken(foundUser, refreshString)
    await userService.addRefreshString(foundUser, refreshString)
    res.status(200)
    res.json({ token, refreshToken })
  } catch (e) {
    console.log(e)
    next(e)
  }
}

async function handleRefresh(req, res, next) {
  const refreshToken = req.body.refreshToken
  jwt.verify(refreshToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      res.sendStatus(400)
      return
    }

    let foundUser
    try {
      foundUser = await userService.getUserByUsername(decoded.name)
    } catch (e) {
      next(e)
      return
    }
    if (!await bcrypt.compare(decoded.refreshToken, foundUser.refreshToken)) {
      res.sendStatus(401)
      return
    }

    const refreshString = randomString.generate()

    try {
      const token = await tokenUtils.buildAccessToken(foundUser)
      const refreshToken = await tokenUtils.buildRefreshToken(foundUser, refreshString)

      await userService.addRefreshString(foundUser, refreshString)

      res.status(200)
      res.json({ token, refreshToken })
    } catch (e) {
      next(e)
    }
  })
}


module.exports = {
  getUserByUsername,
  createNewUser,
  handleLogin,
  handleRefresh
}

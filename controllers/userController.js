const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const randomstring = require('randomstring')

async function getUserByUsername(req, res) {
  userDto = await userService.getUserDtoByUsername(req.params.username)
  res.status(200)
  res.json(userDto)
}

async function createNewUser(req, res) {
  const savedUserDto = await userService.createNewUser(req.body)
  res.status(201)
  res.json(savedUserDto)
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

  const refreshString = randomstring.generate()
  
  const token = await buildToken(foundUser)
  const refreshToken = await buildRefreshToken(foundUser, refreshString)
  
  await userService.addRefreshString(foundUser, refreshString)

  res.status(200)
  res.json({token, refreshToken})
}

async function handleRefresh(req, res) {
  refreshToken = req.body.refreshToken
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

    const refreshString = randomstring.generate()
    
    const token = await buildToken(foundUser)
    const refreshToken = await buildRefreshToken(foundUser, refreshString)
    
    await userService.addRefreshString(foundUser, refreshString)

    res.status(200)
    res.json({token, refreshToken})
  })
}

function buildToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign({
        name: user.name,
        accountType: user.accountType
      }, 
      process.env.SECRET,
      {expiresIn: '2 hours'},
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      }
    ) 
  })
}

function buildRefreshToken(user, refreshString) {
  return new Promise((resolve, reject) => {
    jwt.sign({
        name: user.name,
        refreshToken: refreshString
      },
      process.env.SECRET,
      {expiresIn: '30 days'},
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      }
    )
  })
}


module.exports = {
  getUserByUsername,
  createNewUser,
  handleLogin,
  handleRefresh
}

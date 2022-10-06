const jwt = require('jsonwebtoken')

const TOKEN_LIFETIME = '2 hours'
const REFRESH_TOKEN_LIFETIME = '2 days'

async function buildAccessToken(user) {
  return await buildToken({
    name: user.name,
    accountType: user.accountType
  }, TOKEN_LIFETIME)
}

async function buildRefreshToken(user, refreshString) {
  return await buildToken({
    name: user.name,
    refreshToken: refreshString
  }, REFRESH_TOKEN_LIFETIME)
}

function buildToken(data, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(data,
      process.env.SECRET,
      { expiresIn: expiresIn },
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
  buildAccessToken,
  buildRefreshToken
}

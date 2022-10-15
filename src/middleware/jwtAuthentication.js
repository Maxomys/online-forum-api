const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  let token = req.get('authorization')
  if (!token) {
    let error = new Error('No token provided!')
    error.status = 401
    next(error)
    return
  }
  token = token.replace(/^[Bb]earer\s+/, '')

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
      let error = new Error('Token verification error')
      err.status = 401
      next(err)
    } else {
      req.auth = decoded
      next()
    }
  })
}


module.exports = authenticate

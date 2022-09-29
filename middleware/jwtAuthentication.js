const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  let token = req.get('authorization')
  if (!token) {
    res.sendStatus(400)
    return
  }
  token = token.replace(/^Bearer\s+/, "")
  let decoded
  try {
    decoded = jwt.verify(token, process.env.SECRET)
  } catch (e) {
    res.status(401)
    res.json(e)
    return
  }
  req.auth = decoded
  next()
}


module.exports = authenticate

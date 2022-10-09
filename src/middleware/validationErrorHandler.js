const mongoose = require('mongoose')

function handleError(err, req, res, next) {
  let bar = err instanceof mongoose.Error.ValidationError
  if (! (err instanceof mongoose.Error.ValidationError)) {
    next(err)
    return
  }

  let messages = Object.entries(err.errors).map(e => {
    return {
      [e[0]]: e[1].message
    }
  })

  res.status(500)
  res.json({
    error: 'validation error',
    messages
  })
}


module.exports = handleError

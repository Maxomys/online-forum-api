function handleError(err, req, res, next) {
  if (!err.status) {
    next(err)
  }
  res.status(err.status)
  res.json({
    error: err.message
  })
}


module.exports = handleError

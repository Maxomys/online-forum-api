const banService = require('../services/banService')

async function getBansByUserIdGivenTo(req, res, next) {
  res.json(await banService.getBansByUserIdGivenTo(req.params.userId))
}

async function createBan(req, res, next) {
  if (req.auth.accountType !== 'admin') {
    let error = new Error('Unauthorized, not and admin')
    error.status = 401
    next(error)
    return
  }

  try {
    await banService.createBanByUserId(req.body, req.auth.name)
  } catch (e) {
    next(e)
  }

  res.sendStatus(201)
}


module.exports = {
  getBansByUserIdGivenTo,
  createBan
}

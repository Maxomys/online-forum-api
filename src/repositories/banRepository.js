const banModel = require('../models/banModel')

async function findBansByUserIdGivenTo(id) {
  try {
    return await banModel.find({givenTo: id})
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function findBansByUserIdGivenByPage(id, options) {
  try {
    return await banModel.paginate({givenBy: id})
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function saveBan(ban) {
  try {
    return await banModel.create(ban)
  } catch (e) {
    console.log(e)
    throw e
  }
}


module.exports = {
  findBansByUserIdGivenTo,
  findBansByUserIdGivenByPage,
  saveBan
}

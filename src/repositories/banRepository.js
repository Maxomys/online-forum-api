const banModel = require('../models/banModel')

async function findBansByUserIdGivenTo(userId) {
  try {
    return await banModel.find({givenTo: userId})
  } catch (e) {
    console.log(e)
  }
}

async function findBansByUserIdGivenByPage(userId, options) {
  try {
    return await banModel.paginate({givenBy: userId})
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  findBansByUserIdGivenTo,
  findBansByUserIdGivenByPage
}

const threadModel = require('../models/threadModel')

async function getThreadPageByCategoryId(categoryId, options) {
  try {
    return await threadModel.paginate({category: categoryId}, options)
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function getThreadByName(name) {
  try {
    return await threadModel.findOne({name: name})
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function getThreadById(id) {
  try {
    return await threadModel.findById(id)
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function saveThread(thread) {
  try {
    return await threadModel.create(thread)
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function deleteThreadById(threadId) {
  try {
    return await threadModel.deleteOne({_id: threadId})
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function getThreadCountByCategoryId(categoryId) {
  try {
    return await threadModel.find({category: categoryId}).count()
  } catch (e) {
    console.log(e)
    throw e
  }
}

module.exports = {
  getThreadPageByCategoryId,
  getThreadByName,
  getThreadById,
  saveThread,
  deleteThreadById,
  getThreadCountByCategoryId
}

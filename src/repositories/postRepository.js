const postModel = require('../models/postModel')

async function getPostPageByThreadId(threadId, options) {
  options.populate = ['author', 'thread']

  try {
    console.log('in post repository')
    return await postModel.paginate({thread: threadId}, options)
  } catch (e) {
    console.log(e)
  }
}

async function getPostById(postId) {
  try {
    return await postModel.findById(postId).populate(['author', 'thread'])
  } catch (e) {
    console.log(e)
  }
}

async function getPostCountByThreadId(threadId) {
  try {
    return await postModel.find({thread: threadId}).count()
  } catch (e) {
    console.log(e)
  }
}

async function savePost(post) {
  try {
    return await postModel.create(post)
  } catch (e) {
    console.log(e)
  }
}

async function removePostsByThreadId(threadId) {
  try {
    return await postModel.deleteMany({thread: threadId})
  } catch (e) {
    console.log(e)
  }
}

async function removePostById(id) {
  try {
    return await postModel.deleteOne({_id: id})
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  getPostPageByThreadId,
  getPostById,
  getPostCountByThreadId,
  savePost,
  removePostsByThreadId,
  removePostById
}

const threadRepository = require('../repositories/threadRepository')
const postRepository = require('../repositories/postRepository')
const userRepository = require('../repositories/userRepository')
const { threadDto } = require('../mappers/threadMapper')

async function getThreadPageByCategoryId(categoryId, options) {
  let page = await threadRepository.getThreadPageByCategoryId(categoryId, options)

  //get the number of posts per thread and create dtos
  page.docs = await Promise.all(page.docs.map(async (th) => {
    let postCount = await postRepository.getPostCountByThreadId(th._id)
    return threadDto(th, postCount)
  }))

  return page
}

async function createNewThread(threadDto, username) {
  const user = await userRepository.getUserByUsername(username)
  if (!user) {
    let error = new Error('User not found for name: ' + username)
    error.status = 400
    throw error
  }
  return await threadRepository.saveThread({
    name: threadDto.name,
    author: user._id,
    category: threadDto.categoryId
  })
}

async function removeThreadById(threadId, username) {
  const user = await userRepository.getUserByUsername(username)
  if (!user) {
    let error = new Error('User not found for name: ' + username)
    error.status = 400
    throw error
  }
  if (user.accountType != 'admin') {
    let error = new Error('Only admin can remove threads')
    error.status = 401
    throw error
  }
  await postRepository.removePostsByThreadId(threadId)
  await threadRepository.deleteThreadById(threadId)
}

async function getThreadById(threadId) {
  thread = await threadRepository.getThreadById(threadId)
  return threadDto(thread)
}

module.exports = {
  getThreadPageByCategoryId,
  createNewThread,
  removeThreadById,
  getThreadById
}

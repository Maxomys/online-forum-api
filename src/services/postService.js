const postRepository = require('../repositories/postRepository')
const userRepository = require('../repositories/userRepository')
const { postDto } = require('../mappers/postMapper')

async function getPostPageByThreadId(threadId, options) {
  let page = await postRepository.getPostPageByThreadId(threadId, options)
  page.docs = page.docs.map(post => postDto(post))
  return page
}

async function createNewPost(postDto, username) {
  const user = await userRepository.getUserByUsername(username)
  if (!user) {
    let error = new Error('User not found for name: ' + username)
    error.status = 400
    throw error
  }
  let post = {
    contents: postDto.contents,
    author: user._id,
    thread: postDto.threadId,
    replyTo: postDto.replyToId
  }
  return await postRepository.savePost(post)
}

async function getPostById(postId) {
  const post = await postRepository.getPostById(postId)
  return postDto(post)
}

async function deletePostById(postId, username) {
  const user = await userRepository.getUserByUsername(username)
  if (!user) {
    let error = new Error('User not found for name: ' + username)
    error.status = 400
    throw error
  }
  
  const foundPost = await postRepository.getPostById(postId)

  //check if retrieved user is an admin or the author 
  if (user._id !== foundPost.author && user.accountType !== 'admin') {
    let error = new Error('Not authorized to delete the post')
    error.status = 401
    throw error
  }

  await postRepository.removePostById(postId)
}


module.exports = {
  getPostPageByThreadId,
  createNewPost,
  getPostById,
  deletePostById
}

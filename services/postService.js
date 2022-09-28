const postRepository = require('../repositories/postRepository')
const { postDto } = require('../mappers/postMapper')
const postModel = require('../models/postModel')

async function getPostPageByThreadId(threadId, options) {
  let page = await postRepository.getPostPageByThreadId(threadId, options)
  page.docs = page.docs.map(post => postDto(post))
  return page
}

async function createNewPost(postDto, user) {
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

async function deletePostById(postId) {
  await postRepository.removePostById(postId)
}


module.exports = {
  getPostPageByThreadId,
  createNewPost,
  getPostById,
  deletePostById
}

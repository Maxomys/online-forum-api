const postService = require('../services/postService')

async function getPostsPageByThreadId(req, res) {
  const options = {
    page: req.query.page ?? 1,
    limit: req.query.limit ?? process.env.PAGE_LIMIT,
    sort: {[req.query.sort ?? 'createdAt']: req.query.dir ?? 1}
  }
  const page = await postService.getPostPageByThreadId(req.params.threadId, options)
  res.status(200)
  res.json(page)
}

async function getPostById(req, res) {
  const postDto = await postService.getPostById(req.params.postId)
  res.status(200)
  res.json(postDto)
}

async function postNewPost(req, res) {
  await postService.createNewPost(req.body, req.user)
  res.sendStatus(201)
}

async function deletePostById(req, res) {
  await postService.deletePostById(req.params.postId)
  res.sendStatus(200)
}


module.exports = {
  getPostsPageByThreadId,
  getPostById,
  postNewPost,
  deletePostById
}

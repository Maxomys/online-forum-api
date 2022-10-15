const postService = require('../services/postService')

async function getPostsPageByThreadId(req, res, next) {
  const options = {
    page: req.query.page ?? 1,
    limit: req.query.limit ?? process.env.PAGE_LIMIT,
    sort: { [req.query.sort ?? 'createdAt']: req.query.dir ?? 1 }
  }
  try {
    const page = await postService.getPostPageByThreadId(req.params.threadId, options)
    res.status(200)
    res.json(page)
  } catch (e) {
    next(e)
  }
}

async function getPostById(req, res, next) {
  try {
    const postDto = await postService.getPostById(req.params.postId)
    res.status(200)
    res.json(postDto)
  } catch (e) {
    next(e)
  }
}

async function postNewPost(req, res, next) {
  try {
    const post = await postService.createNewPost(req.body, req.auth.name)
    res.status(201)
    res.json({ id: post._id })
  } catch (e) {
    next(e)
  }
}

async function deletePostById(req, res, next) {
  try {
    await postService.deletePostById(req.params.postId, req.auth.name)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}


module.exports = {
  getPostsPageByThreadId,
  getPostById,
  postNewPost,
  deletePostById
}

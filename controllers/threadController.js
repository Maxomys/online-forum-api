const threadService = require('../services/threadService')

async function getThreadPageByCategoryId(req, res) {
  let options = {
    page: req.query.page ?? 1,
    limit: req.query.limit ?? process.env.PAGE_LIMIT,
    sort: {[req.query.sort ?? 'modifiedAt']: req.query.dir ?? 1}
  }
  const page = await threadService.getThreadPageByCategoryId(req.params.categoryId, options)
  res.status(200)
  res.json(page)
}

async function getThreadById(req, res) {
  const threadDto = await threadService.getThreadById(req.params.threadId)
  res.status(200)
  res.json(threadDto)
}

async function postNewThread(req, res) {
  await threadService.createNewThread(req.body, req.user)
  res.sendStatus(201)
}

async function deleteThreadById(req, res) {
  await threadService.removeThreadById(req.params.threadId)
  res.sendStatus(200)
}


module.exports = {
  getThreadPageByCategoryId,
  getThreadById,
  postNewThread,
  deleteThreadById
}

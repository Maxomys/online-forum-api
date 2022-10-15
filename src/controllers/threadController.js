const threadService = require('../services/threadService')

async function getThreadPageByCategoryId(req, res, next) {
  let options = {
    page: req.query.page ?? 1,
    limit: req.query.limit ?? process.env.PAGE_LIMIT,
    sort: {[req.query.sort ?? 'modifiedAt']: req.query.dir ?? 1}
  }
  try {
    const page = await threadService.getThreadPageByCategoryId(req.params.categoryId, options)
    res.status(200)
    res.json(page)
  } catch (e) {
    next(e)
  }
}

async function getThreadById(req, res, next) {
  try {
    const threadDto = await threadService.getThreadById(req.params.threadId)
    res.status(200)
    res.json(threadDto)
  } catch (e) {
    next(e)
  }
}

async function postNewThread(req, res, next) {
  try {
    await threadService.createNewThread(req.body, req.auth.name)
  } catch (e) {
    next(e)
    return
  }
  res.sendStatus(201)
}

async function deleteThreadById(req, res, next) {
  try {
    await threadService.removeThreadById(req.params.threadId, req.auth.name)
  } catch (e) {
    next(e)
    return
  }
  res.sendStatus(200)
}


module.exports = {
  getThreadPageByCategoryId,
  getThreadById,
  postNewThread,
  deleteThreadById
}

const categoryService = require('../services/categoryService')

async function getAllCategories(req, res, next) {
  try {
    const categoryDtos = await categoryService.getAllCategories()
    res.status(200)
    res.json(categoryDtos)
  } catch (e) {
    next(e)
  }
}

async function postNewCategory(req, res, next) {
  if (req.auth.accountType !== 'admin') {
    let error = new Error('Unauthorized, not and admin')
    error.status = 401
    next(error)
    return
  }
  try {
    await categoryService.addCategory(req.body)
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
}

async function deleteCategoryById(req, res, next) {
  if (req.auth.accountType !== 'admin') {
    let error = new Error('Unauthorized, not and admin')
    error.status = 401
    next(error)
    return
  }
  await categoryService.deleteCategoryById(req.params.categoryId)
  res.sendStatus(200)
}


module.exports = {
  getAllCategories,
  postNewCategory,
  deleteCategoryById
}

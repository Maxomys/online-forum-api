const categoryService = require('../services/categoryService')

async function getAllCategories(req, res) {
  categoryDtos = await categoryService.getAllCategories()
  res.status(200)
  res.json(categoryDtos)
}

async function postNewCategory(req, res, next) {
  if (req.auth.accountType !== 'admin') {
    let error = new Error('Unauthorized, not and admin')
    error.status = 401
    next(error)
    return
  }
  await categoryService.addCategory(req.body)
  res.sendStatus(201)
}

async function deleteCategoryById(req, res, next) {
  if (req.auth.accountType !== 'admin') {
    let error = new Error('Unauthorized, not and admin')
    error.status = 401
    console.log(error)
    next(error)
    return
  }
  await categoryService.deleteCategoryById(req.params.categoryId)
}


module.exports = {
  getAllCategories,
  postNewCategory,
  deleteCategoryById
}

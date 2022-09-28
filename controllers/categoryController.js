const categoryService = require('../services/categoryService')

async function getAllCategories(req, res) {
  categoryDtos = await categoryService.getAllCategories()
  res.status(200)
  res.json(categoryDtos)
}

async function postNewCategory(req, res) {
  await categoryService.addCategory(req.body)
  res.sendStatus(201)
}

async function deleteCategoryById(req, res) {
  await categoryService.deleteCategoryById(req.params.categoryId)
}


module.exports = {
  getAllCategories,
  postNewCategory,
  deleteCategoryById
}

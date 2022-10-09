const categoryModel = require('../models/categoryModel')

async function getAllCategories() {
  try {
    return await categoryModel.find()
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function saveCategory(category) {
  try {
    return await categoryModel.create(category)
  } catch (e) {
    console.log(e)
    throw e
  }
}

async function deleteCategoryById(id) {
  try {
    return await categoryModel.deleteOne({_id: id})
  } catch (e) {
    console.log(e)
    throw e
  }
}


module.exports = {
  getAllCategories,
  saveCategory,
  deleteCategoryById
}

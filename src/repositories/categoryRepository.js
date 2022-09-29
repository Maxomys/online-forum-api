const categoryModel = require('../models/categoryModel')

async function getAllCategories() {
  try {
    return await categoryModel.find()
  } catch (e) {
    console.log(e)
  }
}

async function saveCategory(category) {
  try {
    return await categoryModel.create(category)
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  getAllCategories,
  saveCategory
}

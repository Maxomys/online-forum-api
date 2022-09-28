const categoryRepository = require('../repositories/categoryRepository')
const threadRepository = require('../repositories/threadRepository')
const { categoryDto } = require('../mappers/categoryMapper')

async function getAllCategories() {
  let categories = await categoryRepository.getAllCategories()
  
  //get the number of threads per category and create dtos
  categories = await Promise.all(categories.map(async (cat) => {
    let threadsCount = await threadRepository.getThreadCountByCategoryId(cat._id)
    return categoryDto(cat, threadsCount)
  }))

  return categories
}

async function addCategory(categoryDto) {
  let category = {
    name: categoryDto.name
  }
  return await categoryRepository.saveCategory(category)
}

async function deleteCategoryById(categoryId) {
  return await categoryRepository.deleteCategoryById(categoryId)
}


module.exports = {
  getAllCategories,
  addCategory,
  deleteCategoryById
}

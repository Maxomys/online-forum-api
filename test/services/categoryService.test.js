const expect = require("chai").expect
const { stub } = require("sinon")

const categoryService = require('../../src/services/categoryService')
const categoryRepository = require('../../src/repositories/categoryRepository')
const threadRepository = require('../../src/repositories/threadRepository')

describe('CategoryService unit tests', () => {
  
  let categories = [{
    _id: "categoryId",
    name: "name"
  }]

  it('returns category dtos', async () => {
    const getAllCategoriesFn = stub(categoryRepository, 'getAllCategories')
      .returns(categories)
    const getThreadCountByCategoryIdFn = stub(threadRepository, 'getThreadCountByCategoryId')
      .returns(6)

    let dtos = await categoryService.getAllCategories()
    console.log(dtos)

    expect(dtos).to.deep.equal([{
      id: "categoryId",
      name: "name",
      threadCount: 6
    }])
  })

})

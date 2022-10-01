const expect = require("chai").expect
const sinon = require('sinon')
const { stub } = require("sinon")

const categoryService = require('../../src/services/categoryService')
const categoryRepository = require('../../src/repositories/categoryRepository')
const threadRepository = require('../../src/repositories/threadRepository')

describe('CategoryService unit tests', () => {
  
  let categories = [{
    _id: "categoryId",
    name: "name"
  }]

  afterEach(() => {
    sinon.restore()
  })

  it('returns category dtos', async () => {
    sinon.stub(categoryRepository, 'getAllCategories')
      .returns(categories)
    sinon.stub(threadRepository, 'getThreadCountByCategoryId')
      .returns(6)

    let dtos = await categoryService.getAllCategories()

    expect(dtos).to.deep.equal([{
      id: "categoryId",
      name: "name",
      threadCount: 6
    }])
  })

})

const expect = require("chai").expect
const sinon = require('sinon')
const { stub } = require("sinon")

const threadRepository = require('../../src/repositories/threadRepository')
const postRepository = require('../../src/repositories/postRepository')
const userRepository = require('../../src/repositories/userRepository')
const threadService = require('../../src/services/threadService')

describe('Thread service unit tests', () => {

  afterEach(() => {
    sinon.restore()
  })

  let page = {
    docs: [{
      name: 'thread1',
      modifiedAt: new Date(),
      author: 'authorId',
      category: 'categoryId'
    }]
  }

  it('returns thread dtos page', async () => {
    sinon.stub(threadRepository, 'getThreadPageByCategoryId')
      .returns(page)
    sinon.stub(postRepository, 'getPostCountByThreadId')
      .returns(3)
  
    let dtoPage = await threadService.getThreadPageByCategoryId()
    expect(dtoPage.docs[0].postsCount).to.equal(3)
  })

  it('throws user not found error', async () => {
    sinon.stub(userRepository, 'getUserByUsername')
      .returns(undefined)
    
    try {
      await threadService.createNewThread()
    } catch (error) {
      console.log(error)
      expect(error.status).to.equal(400)
    }
  })

  it('throws error when user is not and admin', async () => {
    sinon.stub(userRepository, 'getUserByUsername')
      .returns({
        accountType: 'user'
      })
    
    try {
      await threadService.removeThreadById()
    } catch (error) {
      expect(error.status).to.equal(401)
    }
  })
})

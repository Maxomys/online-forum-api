const { expect } = require('chai')
const sinon = require('sinon')
const { stub } = require('sinon')
const app = require('../../src/server')
const request = require('supertest')
const hashUtils = require('../../src/utils/hashUtils')
const tokenUtils = require('../../src/utils/tokenUtils')
const dbConnect = require('../../src/utils/dbConnect')

const categoryModel = require('../../src/models/categoryModel')
const threadModel = require('../../src/models/threadModel')
const userModel = require('../../src/models/userModel')
const postModel = require('../../src/models/postModel')

describe('Post integration tests', function() {

  this.timeout(20000)

  let user1
  let category1
  let thread1

  before(async function() {
    await userModel.deleteMany({})
    await categoryModel.deleteMany({})
    await threadModel.deleteMany({})
    await postModel.deleteMany({})

    user1 = await userModel.create({
      name: 'user1',
      email: 'user@email.com',
      password: await hashUtils.hashPassword('password')
    })

    category1 = await categoryModel.create({
      name: 'category1'
    })

    thread1 = await threadModel.create({
      name: 'thread1',
      author: user1._id,
      category: category1._id
    })
  })

  after(async function() {
    try {
      await userModel.deleteMany({})
      await categoryModel.deleteMany({})
      await threadModel.deleteMany({})
      await postModel.deleteMany({})

      await dbConnect.disconnect()
    } catch (e) {
      console.log(e)
    }
  })

  it('Sends and retrieves a post', async function() {

    const accessToken = await tokenUtils.buildAccessToken({
      name: user1.name,
      accountType: user1.accountType
    })

    const postDto = {
      contents: 'postContents',
      threadId: thread1._id.toString()
    }

    let postResponse
    let getResponse

    try {
      postResponse = await request(app)
        .post('/api/v1/posts')
        .send(postDto)
        .set('authorization', 'bearer ' + accessToken)

      getResponse = await request(app)
        .get('/api/v1/posts/' + postResponse.body.id)

    } catch (e) {
      console.log(e)
    }

    expect(getResponse.body.id).to.equal(postResponse.body.id)
  })
})

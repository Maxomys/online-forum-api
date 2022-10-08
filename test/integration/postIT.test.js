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
  let post1

  let accessToken

  beforeEach(async function() {
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

    post1 = await postModel.create({
      contents: 'post contents',
      author: user1._id,
      thread: thread1._id
    })

    accessToken = await tokenUtils.buildAccessToken({
      name: user1.name,
      accountType: user1.accountType
    })
  })

  afterEach(async function() {
    try {
      await userModel.deleteMany({})
      await categoryModel.deleteMany({})
      await threadModel.deleteMany({})
      await postModel.deleteMany({})
    } catch (e) {
      console.log(e)
    }
  })

  // it('Sends and retrieves a post', async function() {
  //
  //   const postDto = {
  //     contents: 'postContents',
  //     threadId: thread1._id.toString()
  //   }
  //
  //   let postResponse
  //   let getResponse
  //
  //   try {
  //     postResponse = await request(app)
  //       .post('/api/v1/posts')
  //       .send(postDto)
  //       .set('authorization', 'bearer ' + accessToken)
  //
  //     getResponse = await request(app)
  //       .get('/api/v1/posts/' + postResponse.body.id)
  //
  //   } catch (e) {
  //     console.log(e)
  //   }
  //
  //   expect(getResponse.body.id).to.equal(postResponse.body.id)
  // })
  //
  // it('Deletes a post', async function() {
  //   let deleteResponse
  //
  //   try {
  //     deleteResponse = await request(app)
  //       .delete('/api/v1/posts/' + post1.id)
  //       .set('authorization', 'bearer ' + accessToken)
  //   } catch (e) {
  //     console.log(e)
  //   }
  //
  //   let postRetrieved = await postModel.findOne({_id: user1.id})
  //
  //   expect(deleteResponse.status).to.equal(200)
  //   expect(postRetrieved).to.be.null
  // })

  it('Gets page of posts in a thread', async function() {
    let getResponse

    try {
      getResponse = await request(app)
        .get('/api/v1/threads/' + thread1.id + '/posts')
    } catch (e) {
      console.log(e)
    }

    expect(getResponse.body.docs).to.not.be.empty
    expect(getResponse.body.docs[0].contents).to.equal(post1.contents)
  })
})

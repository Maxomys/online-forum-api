const expect = require('chai').expect
const sinon = require('sinon')
const { stub } = require('sinon')

const postRepository = require('../../src/repositories/postRepository')
const userRepository = require('../../src/repositories/userRepository')
const postService = require('../../src/services/postService')

describe('Post Service tests', () => {

  let postPage = {
    docs: [{
      contents: 'a post',
      createdAt: new Date(),
      edited: false,
      author: 'authorId',
      thread: 'threadId',
      replyTo: 'postId'
    }]
  }

  let post = {
    contents: 'a post',
    createdAt: new Date(),
    edited: false,
    author: 'notUserId',
    thread: 'threadId',
    replyTo: 'postId'
  }

  let postDto = {
    contents: 'a post',
    threadId: 'threadId',
    replyTo: 'postId'
  }

  let user = {
    _id: 'userId',
    username: 'user'
  }

  afterEach(() => {
    sinon.restore()
  })

  it('returns post dto page', async () => {
    sinon.stub(postRepository, 'getPostPageByThreadId')
      .returns(postPage)

    let dtosPage = await postService.getPostPageByThreadId()

    expect(dtosPage).to.not.be.null
  })

  it('creates new post and returns it', async () => {
    sinon.stub(userRepository, 'getUserByUsername')
      .returns(user)

    let postRepositoryStub = sinon.stub(postRepository, 'savePost')


    await postService.createNewPost(postDto, 'user')

    expect(postRepositoryStub.args[0][0].author).to.equal('userId')
  })

  it('throws error when user in not the author', async () => {
    sinon.stub(userRepository, 'getUserByUsername')
      .returns(user)
    sinon.stub(postRepository, 'getPostById')
      .returns(post)

    try {
      await postService.deletePostById()
    } catch (error) {
      expect(error.message).to.equal('Not authorized to delete the post')
    }
  })
})

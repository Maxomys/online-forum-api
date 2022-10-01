const { expect } = require('chai')
const sinon = require('sinon')
const { stub } = require('sinon')

const userRepository = require('../../src/repositories/userRepository')
const userService = require('../../src/services/userService')

describe('User service tests', () => {

  let user = {
    _id: 'userId',
    email: 'user@user.pl',
    name: 'user',
    password: 'password'
  }

  it('creates new user', async () => {
    let userRepositoryStub = stub(userRepository, 'saveUser')
      .returns(user)

    await userService.createNewUser(user)

    expect(userRepositoryStub.args[0][0].name).to.equal('user')
  })
})


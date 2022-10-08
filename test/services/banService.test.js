const { expect } = require('chai')
const sinon = require('sinon')
const { stub } = require('sinon')

const banRepository = require('../../src/repositories/banRepository')
const userRepository = require('../../src/repositories/userRepository')
const banService = require('../../src/services/banService')

describe('Ban service tests', function() {

  let admin = {
    id: 'adminId',
    name: 'admin',
    accountType: 'admin'
  }

  let user = {
    id: 'userId',
    name: 'user',
    accountType: 'user'
  }

  let bans = [{
    givenTo: user,
    endsAt: new Date(),
    description: 'a ban'
  }]

  beforeEach(function() {
    sinon.restore()
  })

  it('returns bans dto page', async function() {
    stub(userRepository, 'getUserById')
      .onFirstCall().returns(user)
      .returns(admin)
    stub(banRepository, 'findBansByUserIdGivenTo')
      .returns(bans)

    let dtos = await banService.getBansByUserIdGivenTo()

    expect(dtos[0].givenTo.name).to.equal(user.name)
  })

  it('Creates ban by user id', async function() {
    stub(userRepository, 'getUserById')
      .returns(user)
    stub(userRepository, 'getUserByUsername')
      .returns(admin)

    const userRepositoryStub = stub(userRepository, 'saveUser')
    const banRepositoryStub = stub(banRepository, 'saveBan')

    const banDto = {
      description: 'ban description'
    }

    await banService.createBanByUserId(banDto)

    expect(banRepositoryStub.args[0][0].givenBy).is.not.null
    expect(banRepositoryStub.args[0][0].description).equals(banDto.description)
  })
})

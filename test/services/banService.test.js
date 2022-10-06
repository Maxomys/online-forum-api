const { expect } = require('chai')
const sinon = require('sinon')
const { stub } = require('sinon')

const banRepository = require('../../src/repositories/banRepository')
const userRepository = require('../../src/repositories/userRepository')
const banService = require('../../src/services/banService')

describe('Ban service tests', () => {

  let admin = {
    name: 'admin',
    accountType: 'admin'
  }

  let user = {
    name: 'user',
    accountType: 'user'
  }

  let bans = [{
    givenTo: user,
    endsAt: new Date(),
    description: 'a ban'
  }]

  beforeEach(() => {
    sinon.restore()
  })

  it('returns bans dto page', async () => {
    sinon.stub(userRepository, 'getUserById')
      .onFirstCall().returns(user)
      .returns(admin)
    sinon.stub(banRepository, 'findBansByUserIdGivenTo')
      .returns(bans)

    let dtos = await banService.getBansByUserIdGivenTo()

    expect(dtos[0].givenTo.name).to.equal(user.name)
  })
})

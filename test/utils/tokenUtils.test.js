const { expect } = require('chai')
const sinon = require('sinon')
const { stub } = require('sinon')
const tokenUtils = require('../../src/utils/tokenUtils')
const jwt = require('jsonwebtoken')

describe('Token utils tests', function() {

  before(function() {
    process.env.SECRET = 'secret'
  })

  it('Builds access token', async function() {
    const user = {
      name: 'user',
      accountType: 'user'
    }

    const token = await tokenUtils.buildAccessToken(user)
    const decoded = jwt.verify(token, 'secret')

    expect(decoded).to.include(user)
  })

  it('Builds refresh token', async function() {
    const user = {
      name: 'user',
      accountType: 'user'
    }
    const refreshString = 'refreshString'

    const token = await tokenUtils.buildRefreshToken(user, refreshString)
    const decoded = jwt.verify(token, 'secret')

    expect(decoded).to.include({ name: user.name, refreshToken: refreshString })
  })
})

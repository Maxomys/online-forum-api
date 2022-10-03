const banRepository = require('../repositories/banRepository')
const userRepository = require('../repositories/userRepository')
const { banDto } = require('../mappers/banMapper')

//ban duration in hours
const DURATION = 12

async function getBansByUserIdGivenTo(userId) {
  const bans = await banRepository.findBansByUserIdGivenTo(userId) ?? []
  const user = await userRepository.getUserById(userId)

  return await Promise.all(bans.map(async (ban) => {
    const admin = await userRepository.getUserById(ban.givenBy)
    return banDto(ban, admin, user)
  }))
}

async function createBanByUserId(dto, adminUsername) {
  const user = await userRepository.getUserById(dto.userId)
  const admin = await userRepository.getUserByUsername(adminUsername)
  if (!user) {
    let error = new Error('User not found for id: ' + dto.userId)
    error.status = 404
    throw error
  }

  const date = Date.now() + DURATION * 3600 * 1000

  const ban = {
    givenBy: admin._id,
    givenTo: dto.userId,
    endsAt: dto.endsAt ?? date,
    description: dto.description
  }

  user.isBanned = true

  await userRepository.saveUser(user)
  return await banRepository.saveBan(ban)
}

module.exports = {
  getBansByUserIdGivenTo,
  createBanByUserId
}

function userDto(user) {
  return {
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toUTCString(),
    accountType: user.accountType,
    about: user.about,
    lastSeen: user.lastSeen?.toUTCString(),
    isBanned: user.isBanned,
    likeCount: user.likeCount
  }
}


module.exports = {
  userDto
}

function banDto(ban, admin, user) {
  return {
    givenBy: {
      name: admin.name,
      id: admin._id
    },
    givenTo: {
      name: user.name,
      id: user._id
    },
    endsAt: ban.endsAt.toUTCString(),
    canceled: ban.canceled,
    description: ban.description
  }
}


module.exports = {
  banDto
}

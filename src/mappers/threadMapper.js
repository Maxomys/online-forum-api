function threadDto(thread, postCount) {
  return {
    id: thread._id,
    name: thread.name,
    authorName: thread.author.name,
    postsCount: postCount,
    modifiedAt: thread.modifiedAt.toUTCString()
  }
}


module.exports = {
  threadDto
}

function postDto(post) {
  return {
    id: post._id,
    contents: post.contents,
    createdAt: post.createdAt.toUTCString(),
    likes: post.likes,
    edited: post.edited,
    threadName: post.thread.name,
    author: {
      id: post.author._id,
      username: post.author.name
    },
    replyToId: post.replyTo
  }
}


module.exports = {
  postDto
}

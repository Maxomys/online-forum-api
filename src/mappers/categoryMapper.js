function categoryDto(category, threadCount) {
  return {
    id: category._id,
    name: category.name,
    threadCount: threadCount
  }
}


module.exports = {
  categoryDto
}

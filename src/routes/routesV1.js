const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const threadController = require('../controllers/threadController')
const postController = require('../controllers/postController')
const userController = require('../controllers/userController')
const authenticate = require('../middleware/jwtAuthentication')

router.post('/login', userController.handleLogin)
router.post('/tokenRefresh', userController.handleRefresh)

router.get('/users/:username', userController.getUserByUsername)
router.post('/users', userController.createNewUser)

router.get('/categories', categoryController.getAllCategories)
router.post('/categories', authenticate, categoryController.postNewCategory)
router.delete('/categories/:categoryId', authenticate, categoryController.deleteCategoryById)

router.get('/categories/:categoryId/threads', threadController.getThreadPageByCategoryId)
router.get('/threads/:threadId', threadController.getThreadById)
router.post('/threads', authenticate, threadController.postNewThread)
router.delete('/threads/:threadId', authenticate, threadController.deleteThreadById)

router.get('/threads/:threadId/posts', postController.getPostsPageByThreadId)
router.get('/posts/:postId', postController.getPostById)
router.post('/posts', authenticate, postController.postNewPost)
router.delete('/posts/:postId', authenticate, postController.deletePostById)


module.exports = router

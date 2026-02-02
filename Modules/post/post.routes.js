const express = require('express')
const router = express.Router()
const postController = require('./post.controller')
const {authenticate} = require('../../Middlewares/Authenticate')
const {authorize} = require('../../Middlewares/Authorize')


router.get('/getUserPosts', authenticate, authorize('USER'), postController.getUserPosts)
router.post('/createPost', authenticate, authorize('USER'), postController.create)

module.exports = router;
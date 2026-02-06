const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const {authenticate} = require('../../Middlewares/Authenticate');
const { authorize } = require('../../Middlewares/Authorize');
const upload = require('../../Middlewares/multer.middleware')

router.post('/register', userController.register);
router.get('/get', userController.getUsers);
router.post('/login', userController.login)
router.get('/getCountedPosts:id',authenticate, authorize('USER'),userController.getUserCountedPosts)
router.get('/getAllUsers', authenticate, authorize('ADMIN'), userController.getUsers)
router.get('/getContributions', authenticate, authorize('USER'), userController.getUserContributions)
router.patch('/uploadImages', authenticate, authorize('USER'), upload.fields([{name: 'profileImage', maxCount: 1}, {name: 'coverImage', maxCount: 1}]), userController.uploadImages)

module.exports = router;
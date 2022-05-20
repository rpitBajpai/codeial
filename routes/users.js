const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');


router.get('/profile', userController.profile);
router.get('/post', postController.post);
router.get('/sign-up', userController.signUp );
router.get('/sign-in', userController.signIn );

module.exports = router;
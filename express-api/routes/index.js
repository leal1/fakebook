const express = require('express');
const router = express.Router();

// require controllers
const postController = require('../controllers/postController');

router.get('/posts', postController.postList);

router.post('/posts', postController.createPost);

router.post('/posts/:id', postController.addComment);

router.put('/posts/:id', postController.likeOrUnlikePost);

module.exports = router;
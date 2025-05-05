const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// router.get('/posts', postController.getPosts);
// router.get('/posts/:id', postController.getPostById);
// router.post('/posts', postController.createPost);
// router.post('/posts/createAI', postController.createPostAI);
// router.delete('/posts/:id', postController.deletePostById);
router.get('/posts/remove/:id', postController.deletePostById);

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.post('/createAI', postController.createPostAI);
router.get('/remove/:id', postController.deletePostById);

module.exports = router;
const express = require('express');
const router = express.Router();

// import controllers
const { createComment } = require('../controllers/commentController');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { likePost, unlikePost } = require('../controllers/likeController');

// Mapping Routes
router.post('/comments/create', createComment);//
router.post('/post/create', createPost);//
router.get('/posts', getPosts);//
router.get('/post/:id', getPostById);//
router.put('/post/updatePost/:id', updatePost);//
router.delete('/post/deletePost/:id', deletePost);//
router.post('/likes/like', likePost);//
router.delete('/likes/unlike', unlikePost);//

// export
module.exports = router;
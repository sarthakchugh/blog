const express = require('express');
const router = express.Router();
const {
    createPost,
    getAllPosts,
    getPostById,
    deletePost,
    featurePost,
    uploadAuth,
} = require('../controllers/post.controller');
const increaseVisit = require('../middlewares/increaseVisit');

router.get('/upload-auth', uploadAuth);

router.get('/', getAllPosts);
router.get('/:slug', increaseVisit, getPostById);
router.post('/new', createPost);
router.delete('/:id', deletePost);
router.patch('/feature', featurePost);

module.exports = router;

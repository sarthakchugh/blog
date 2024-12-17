const express = require('express');
const router = express.Router();

const { getAllComments, createComment, deleteComment } = require('../controllers/comment.controller');

router.get('/:postId', getAllComments);
router.post('/:postId', createComment);
router.delete('/:commentId', deleteComment);

module.exports = router;

const express = require('express');
const router = express.Router();

const { getSavedPosts, savePost } = require('../controllers/user.controller');

router.get('/saved', getSavedPosts);
router.patch('/save', savePost);

module.exports = router;

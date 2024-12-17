const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { clerkWebhook } = require('../controllers/webhook.controller');

router.post('/clerk',bodyParser.raw({ type: 'application/json' }), clerkWebhook);

module.exports = router;

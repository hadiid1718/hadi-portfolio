const express = require('express');
const router = express.Router();
const chatbotController = require('../controller/chatbotController');

// Public route - anyone visiting the portfolio can chat with the bot
router.post('/chat', chatbotController.chat);

module.exports = router;
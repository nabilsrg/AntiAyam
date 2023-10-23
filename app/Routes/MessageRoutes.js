const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/MessageController');

// Rute pendaftaran pengguna
router.post('/send', MessageController.send);
router.get('/show', MessageController.show);

module.exports = router;
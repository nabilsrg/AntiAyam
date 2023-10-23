const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rute pendaftaran pengguna
router.post('/register', UserController.register);

// Rute masuk pengguna
router.post('/login', UserController.login);

module.exports = router;
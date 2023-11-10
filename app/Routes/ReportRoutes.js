const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/ReportController');

// Rute pendaftaran pengguna
router.post('/', ReportController.create);
router.get('/', ReportController.read);

module.exports = router;
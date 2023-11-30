const express = require('express');
const router = express.Router();
const userRoutes = require('../app/Routes/UserRoutes')
const messageRoutes = require('../app/Routes/MessageRoutes')

// Rute untuk halaman beranda
router.get('/AntiAyam/login', (req, res) => {
    res.render('login')
}); 

router.get('/AntiAyam/register', (req, res) => {
    res.render('register')
}); 


router.get('/AntiAyam', (req, res) => {
    const username = req.session.username
    res.render('chat', {data: username})
}); 

router.get('/AntiAyam/admin', (req, res) => {
    res.render('chat')
}); 

router.use('/user', userRoutes);
router.use('/message', messageRoutes)

module.exports = router;
const express = require('express');
const http = require("http");
const session = require('express-session');

const socketio = require("socket.io")

const bodyParser = require('body-parser');
const routes = require('./config/routes'); // Impor berkas routes.js

const app = express();
let server = http.createServer(app)
let io = socketio(server)
// Middleware dan konfigurasi lainnya
app.use('/public', express.static('public'));
app.use(express.static('public'));
app.set('views', './app/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'rahasia', // Ganti dengan string rahasia yang kuat
  resave: false,
  saveUninitialized: true,
}));

// Gunakan router dari routes.js
app.use('/', routes);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});

const users = {}

io.on('connection', socket => {
    socket.on('new-user', username => {
      users[socket.id] = username; // Menyimpan username dalam variabel users
      console.log(`User ${username} terhubung.`);
    });
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const routes = require('./config/routes'); // Impor berkas routes.js

// Middleware dan konfigurasi lainnya
app.set('views', './app/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gunakan router dari routes.js
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
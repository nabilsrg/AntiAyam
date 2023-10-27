const moment = require('moment/moment');
const db = require('../../config/database');

const MessageModel = {
    //membuat pesan baru
    createMessage: (message, callback) => {
        const { username, content } = message;
        var mysqlTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        const query = 'INSERT INTO messages (username, content, timestamp) VALUES (?, ?, ?)';
        db.query(query, [username, content, mysqlTimestamp], (err, results) => {
            if (err) {
            console.log(err)
            callback(err, null);
            } else {
            callback(null, results.insertId);
            }
        });
    },

    //menampilkan semua message
    showMessage: (callback) => {
        const query = 'SELECT * FROM messages';
        db.query(query, (err, results) => {
            if (err) {
            console.log(err)
            callback(err, null);
            } else {
            callback(null, results);
            }
        });
    },

    deleteMessageById: (messageId, callback) => {
        // Query SQL untuk menghapus pengguna berdasarkan ID
        const query = 'DELETE FROM users WHERE id = ?';
      
        db.query(query, [userId], (err, results) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, results.affectedRows); // Mengembalikan jumlah baris yang terpengaruh (biasanya 1)
          }
        });
      }
};
  
module.exports = MessageModel;
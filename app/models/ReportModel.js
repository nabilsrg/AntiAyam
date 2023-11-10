const db = require('../../config/database');

const ReportModel = {
    //membuat pesan baru
    createReport: (report, callback) => {
        const { reporterId, reportedId, imgName, description } = report;
        const query = 'INSERT INTO report (reporter_Id, reported_Id, img_name, description) VALUES (?, ?, ?, ?)';
        db.query(query, [reporterId, reportedId, imgName, description], (err, results) => {
            if (err) {
            console.log(err)
            callback(err, null);
            } else {
            callback(null, results.insertId);
            }
        });
    },

    //menampilkan semua message
    readReport: (callback) => {
        const query = 'SELECT * FROM report';
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
  
module.exports = ReportModel;
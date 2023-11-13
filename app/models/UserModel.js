const db = require('../../config/database');

// Mendefinisikan model UserModel
const UserModel = {
  //membuat data user baru
  createUser: (user, callback) => {
    const { username, id, password } = user;
    const query = 'INSERT INTO users (username, id, password) VALUES (?, ?, ?)';
    db.query(query, [username, id, password], (err) => {
      if (err) {
        console.log(err)
        callback(err);
      } else {
        callback(null);
      }
    });
  },

  //mencocokkan password
  authenticateUser: (id, password, callback) => {
    UserModel.getUserById(id, (err, user) => {
      if (err) {
        callback(err, null, null);
      } else {
        if (!user) {
          // Pengguna dengan username tertentu tidak ditemukan
          callback('User not found', null, null);
        } else {
          // Bandingkan password yang diinputkan dengan password dalam database
          if (password === user.password) {
            // Password cocok
            if(user.isAdmin){
              callback(null, true, user.username, true);
            } else {
              callback(null, true, user.username, false);
            }
          } else {
            // Password tidak cocok
            callback(null, false, null);
          }
        }
      }})
  },

  //mendapatkan data user berdasarkan username
  getUserByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },

  //mendapatkan data user berdasarkan id
  getUserById: (userId, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },

  // update user data dengan Id
  updateUserById: (userId, updatedData, callback) => {
    const { username, password } = updatedData;

    const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
  
    db.query(query, [username, email, password, userId], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results.affectedRows); // Mengembalikan jumlah baris yang terpengaruh (biasanya 1)
      }
    });
  },
  
  // hapus user dengan Id
  deleteUserById: (userId, callback) => {
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

module.exports = UserModel;
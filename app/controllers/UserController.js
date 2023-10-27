// Import modul yang diperlukan
const express = require('express');
const app = express()
const UserModel = require('../models/UserModel');

// Kontroler untuk manajemen pengguna
const UserController = {
  // Fungsi untuk pendaftaran pengguna
  register: (req, res) => {
    const userData = req.body;
 
    //Validasi data pengguna (misalnya: pastikan data yang diperlukan ada)
    if (!isValidUserData(userData)) {
      return res.status(400).json({ message: 'Data pengguna kosong atau tidak valid' });
    }

    // Membuat pengguna baru
    UserModel.createUser(userData, (err, userId) => {
        if (err) {
          if (err.code = 'ER_DUP_ENTRY' )
            return res.status(500).json({ message: 'ganti username' });
          else 
            console.error('Gagal membuat pengguna: ' + err.message);
            return res.status(500).json({ message: 'Gagal membuat pengguna' });
        } else {
            console.log('Pengguna berhasil terdaftar dengan ID: ' + userId);
            return res.status(201).json({ message: 'Pengguna berhasil terdaftar', userId });
        }
    });
  },

  // Fungsi untuk masuk pengguna
  login: (req, res) => {
    const { username, password } = req.body;

    if (!isValidUserData(req.body)) {
        return res.status(400).json({ message: 'Data pengguna kosong atau tidak valid '+ username });
    }

    // Melakukan otentikasi pengguna
    UserModel.authenticateUser(username, password, (err, match, user) => {
      if (err) {
        console.error('Gagal masuk pengguna: ' + err.message);
        return res.status(401).json({ message: 'Gagal masuk pengguna' });
      } else {
        if (match) {
        console.log('Pengguna berhasil masuk: ' + user);

        return res.status(200).json({ message: 'Pengguna berhasil masuk', user: user});
        } else {
            console.log('Pengguna gagal masuk');

            return res.status(401).json({message: 'Username atau Password Salah'})
        }
    }
    });
  },
};

// Fungsi bantuan untuk validasi data pengguna agar tidak kosong
function isValidUserData(userData) {
  return userData.username && userData.password;
}

module.exports = UserController;
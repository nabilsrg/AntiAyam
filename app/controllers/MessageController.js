const express = require('express');
const app = express()
const MessageModel = require('../models/MessageModel');
const req = require('express/lib/request');

const MessageController = {
    // Fungsi untuk menambahkan pesan
    send: (req, res) => {
        const username = req.session.username
        const content = req.body.content;
    
        //Validasi data pesan (misalnya: pastikan data yang diperlukan ada)
        if (!isValidUserData(content, username)) {
            return res.status(400).json({ message: 'Data pesan kosong atau tidak valid' });
        }
    
        // Membuat pesan baru
        MessageModel.createMessage(content, username, (err, messageId) => {
            if (err) {
                console.error('Gagal membuat pesan: ' + err.message);
                return res.status(500).json({ message: 'Gagal mengirim pesan' });
            } else {
                console.log('Pesan berhasil terkirim dengan ID: ' + messageId + ', pengirim: ' + username);
                return res.status(201).json({ message: 'Pesan berhasil terkirim', messageId });
            }
        });
    },

    //menampilkan semua pesan
    show: (req, res) => {
        MessageModel.showMessage((err, messages) => {
            if (err) {
                console.error('Gagal menerima pesan');
            } else {
                console.log('Pesan berhasil ditampilkan');
                return res.status(200).json({ message: 'Pesan berhasil ditampilkan', messages})
            }
        })
    },

    //menghapus pesan
    delete: (req, res) => {
        
    }
};

function isValidUserData(content, username) {
    // Contoh validasi sederhana, Anda bisa menambahkan validasi yang lebih kompleks sesuai kebutuhan
    return content && username;
}

module.exports = MessageController;
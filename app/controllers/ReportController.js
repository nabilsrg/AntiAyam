const express = require('express');
const app = express()
const req = require('express/lib/request');
const ReportModel = require('../models/ReportModel');

const ReportController = {
    // Fungsi untuk menambahkan pesan
    create: (req, res) => {
        const report = req.body;
    
        //Validasi data pesan (misalnya: pastikan data yang diperlukan ada)
        if (!isValidReportData(report)) {
            return res.status(400).json({ message: 'Data pesan kosong atau tidak valid' });
        }
    
        // Membuat reoprt baru
        ReportModel.createReport(report, (err, reportId) => {
            if (err) {
                console.error('Gagal membuat laporan: ' + err.message);
                return res.status(500).json({ message: 'Gagal membuat laporan' });
            } else {
                console.log('Laporan berhasil dibuat dengan ID: ' + reportId);
                return res.status(201).json({ message: 'Laporan berhasil dibuat', reportId});
            }
        });
    },

    //menampilkan semua pesan
    read: (req, res) => {
        ReportModel.readReport((err, results) => {
            if (err) {
                console.error('Gagal menampilkan report');
            } else {
                console.log('Report berhasil ditampilkan');
                return res.status(200).json({ message: 'Pesan berhasil ditampilkan', results})
            }
        })
    },

    //menghapus pesan
    delete: (req, res) => {
        
    }
};

function isValidReportData(report) {
    // Contoh validasi sederhana, Anda bisa menambahkan validasi yang lebih kompleks sesuai kebutuhan
    return report.reporterId && report.reportedId && report.description;
}

module.exports = ReportController;
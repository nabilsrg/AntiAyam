const mysql = require('mysql')

const db = mysql.createConnection({
    host: "antiayam-db.cs7hxfjx0nf2.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "antiayam987",
    database: "antiayam"
})

module.exports = db
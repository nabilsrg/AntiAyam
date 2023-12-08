const mysql = require('mysql')

const db = mysql.createConnection({
    host: "antiayam-db.cfvckgueuywx.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "antiayam987",
    database: "antiayam"
})

module.exports = db
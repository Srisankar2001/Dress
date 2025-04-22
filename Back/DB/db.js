const mysql = require("mysql2")

const HOST = process.env.HOST
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE
const PORT = process.env.PORT

const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
})

module.exports = db
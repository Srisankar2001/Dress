const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const db = require("../DB/db")
const UserRoles = require("../Enums/UserRoles")

const SECRET_KEY = process.env.SECRET_KEY

const register = async (req, res) => {
    const { firstname, lastname, email, password, address, phone } = req.body

    if (!firstname || !lastname || !email || !password || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ? AND is_deleted = 0", [email])
        if (rowEmail.length > 0) {
            return res.status(400).json({ status: false, message: "Email Already Exist" })
        }

        const hash = await bcrypt.hash(password, 10)

        const [rowRegister] = await db.promise().execute("INSERT INTO user(firstname,lastname,email,password,role,address,phone) VALUES(?,?,?,?,?,?,?)", [firstname, lastname, email, hash, UserRoles.USER, address, phone])
        if (rowRegister.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "User Registration Failed" })
        }
        return res.status(200).json({ status: true, message: "User Registered Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowLogin] = await db.promise().execute("SELECT * FROM user WHERE email = ? AND is_deleted = 0", [email])
        if (rowLogin.length === 0) {
            return res.status(400).json({ status: false, message: "Email not registered" })
        }
        const user = rowLogin[0]
        const hashPassword = user.password

        const isMatch = await bcrypt.compare(password, hashPassword)
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Password is wrong" })
        } else {
            const data = { id: user.id, role: user.role }
            const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1d' })
            res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })
            return res.status(200).json({ status: true, message: "Login Successfull" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getData = async (req, res) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ status: false, message: "Token is missing" })
    }

    try {
        const decode = jwt.verify(token, SECRET_KEY)
        const id = decode.id
        const [rowDecode] = await db.promise().execute("SELECT id,firstname,lastname,email,role,phone,address FROM user WHERE id = ? AND is_deleted = 0", [id])
        if (rowDecode.length === 0) {
            return res.status(400).json({ status: false, message: "User not found" })
        }
        const data = {
            id: rowDecode[0].id,
            firstname: rowDecode[0].firstname,
            lastname: rowDecode[0].lastname,
            email: rowDecode[0].email,
            role: rowDecode[0].role,
            phone: rowDecode[0].phone,
            address: rowDecode[0].address
        }
        return res.status(200).json({ status: true, message: "Data fetched", data: data })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const authController = {register, login, getData}
module.exports = authController
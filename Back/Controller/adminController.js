const bcrypt = require("bcrypt")
const db = require("../DB/db")
const UserRoles = require("../Enums/UserRoles")

const registerAdmin = async (req, res) => {
    const { firstname, lastname, email, password, address, phone } = req.body

    if (!firstname || !lastname || !email || !password || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ?", [email])
        if (rowEmail.length > 0) {
            return res.status(400).json({ status: false, message: "Email Already Exist" })
        }

        const hash = await bcrypt.hash(password, 10)

        const [rowRegister] = await db.promise().execute("INSERT INTO user(firstname,lastname,email,password,role,address,phone) VALUES(?,?,?,?,?,?,?)", [firstname, lastname, email, hash, UserRoles.ADMIN, address, phone])
        if (rowRegister.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Admin Registration Failed" })
        }
        return res.status(200).json({ status: true, message: "Admin Registered Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const registerEmployee = async (req, res) => {
    const { firstname, lastname, email, password, address, phone } = req.body

    if (!firstname || !lastname || !email || !password || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ?", [email])
        if (rowEmail.length > 0) {
            return res.status(400).json({ status: false, message: "Email Already Exist" })
        }

        const hash = await bcrypt.hash(password, 10)

        const [rowRegister] = await db.promise().execute("INSERT INTO user(firstname,lastname,email,password,role,address,phone) VALUES(?,?,?,?,?,?,?)", [firstname, lastname, email, hash, UserRoles.EMPLOYEE, address, phone])
        if (rowRegister.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Employee Registration Failed" })
        }
        return res.status(200).json({ status: true, message: "Employee Registered Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const assignOrderToEmployee = async(req,res)=>{

}

const changeOrderStatus = async(req,res)=>{

}

const adminController = {}
module.exports = adminController
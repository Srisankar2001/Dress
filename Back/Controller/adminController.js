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

const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, email, address, phone } = req.body

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!firstname || !lastname || !email || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [row] = await db.promise().execute("SELECT * FROM user WHERE id =? AND role=?", [id, UserRoles.EMPLOYEE])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if (row[0].email !== email) {
            const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ?", [email])
            if (rowEmail.length > 0) {
                return res.status(400).json({ status: false, message: "Email Already Exist" })
            }
        }

        const [rowUpdate] = await db.promise().execute("UPDATE user SET firstname = ?, lastname = ?, email = ?, address = ?, phone = ? WHERE id = ?",[firstname,lastname,email,address,phone,id])
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Employee Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Employee Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}


const getEmployee = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [row] = await db.promise().execute("SELECT * FROM user WHERE id =? AND role=?", [id, UserRoles.EMPLOYEE])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Employee  Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllEmployee = async (req, res) => {
    try {
        const [row] = await db.promise().execute("SELECT * FROM user WHERE role = ?", [UserRoles.EMPLOYEE])
        return res.status(200).json({ status: true, message: "All Employees Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const adminController = {
    registerAdmin,
    registerEmployee,
    updateEmployee,
    getAllEmployee,
    getEmployee
}

module.exports = adminController
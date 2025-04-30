const bcrypt = require("bcrypt")
const db = require("../DB/db")
const UserRoles = require("../Enums/UserRoles")

const registerAdmin = async (req, res) => {
    const user_id = req.user_id
    const { firstname, lastname, email, password, address, phone } = req.body

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!firstname || !lastname || !email || !password || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ? AND is_deleted = 0", [email])
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
    const user_id = req.user_id
    const { firstname, lastname, email, password, address, phone } = req.body

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!firstname || !lastname || !email || !password || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ? AND is_deleted = 0", [email])
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
    const user_id = req.user_id
    const { id } = req.params
    const { firstname, lastname, email, address, phone } = req.body

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!firstname || !lastname || !email || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM user WHERE id =? AND role=? AND is_deleted = 0", [id, UserRoles.EMPLOYEE])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if (row[0].email !== email) {
            const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ? AND is_deleted = 0", [email])
            if (rowEmail.length > 0) {
                return res.status(400).json({ status: false, message: "Email Already Exist" })
            }
        }

        const [rowUpdate] = await db.promise().execute("UPDATE user SET firstname = ?, lastname = ?, email = ?, address = ?, phone = ? WHERE id = ?", [firstname, lastname, email, address, phone, id])
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Employee Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Employee Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateAdmin = async (req, res) => {
    const user_id = req.user_id
    const { id } = req.params
    const { firstname, lastname, email, address, phone } = req.body

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (id === user_id) {
        return res.status(400).json({ status: false, message: "You can't update your account" })
    }

    if (!firstname || !lastname || !email || !address || !phone) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM user WHERE id =? AND role=? AND is_deleted = 0", [id, UserRoles.ADMIN])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if (row[0].email !== email) {
            const [rowEmail] = await db.promise().execute("SELECT * FROM user WHERE email = ? AND is_deleted = 0", [email])
            if (rowEmail.length > 0) {
                return res.status(400).json({ status: false, message: "Email Already Exist" })
            }
        }

        const [rowUpdate] = await db.promise().execute("UPDATE user SET firstname = ?, lastname = ?, email = ?, address = ?, phone = ? WHERE id = ?", [firstname, lastname, email, address, phone, id])
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Admin Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Admin Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getEmployee = async (req, res) => {
    const user_id = req.user_id
    const { id } = req.params

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }


        const [row] = await db.promise().execute("SELECT * FROM user WHERE id =? AND role=? AND is_deleted = 0", [id, UserRoles.EMPLOYEE])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Employee  Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllEmployee = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }
    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM user WHERE role = ? AND is_deleted = 0", [UserRoles.EMPLOYEE])
        return res.status(200).json({ status: true, message: "All Employees Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAdmin = async (req, res) => {
    const user_id = req.user_id
    const { id } = req.params

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (id === user_id) {
        return res.status(400).json({ status: false, message: "You can't get your account" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM user WHERE id =? AND role=? AND is_deleted = 0", [id, UserRoles.ADMIN])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Admin Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllAdmin = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }
    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM user WHERE role = ? AND is_deleted = 0 AND id <> ?", [UserRoles.ADMIN,user_id])
        return res.status(200).json({ status: true, message: "All Admins Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteEmployee = async (req, res) => {
    const user_id = req.user_id
    const { id } = req.params

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [row] = await db.promise().execute("UPDATE user SET is_deleted = 1 WHERE id =?", [id])
        if (row.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Employee Delete Failed" })
        }

        return res.status(200).json({ status: true, message: "Employee Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteAdmin = async (req, res) => {
    const user_id = req.user_id
    const { id } = req.params

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (id === user_id) {
        return res.status(400).json({ status: false, message: "You can't update your account" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [row] = await db.promise().execute("UPDATE user SET is_deleted = 1 WHERE id =?", [id])
        if (row.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Admin Delete Failed" })
        }

        return res.status(200).json({ status: true, message: "Admin Deleted Successfully"})
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const adminController = {
    registerAdmin,
    registerEmployee,
    updateEmployee,
    updateAdmin,
    getAllEmployee,
    getAllAdmin,
    getEmployee,
    getAdmin,
    deleteAdmin,
    deleteEmployee
}

module.exports = adminController
const db = require("../DB/db")

const createDress = async (req, res) => {
    const { name, description, price, type_id } = req.body
    const image = req.file.filename

    if (!name || !image || !description || !price || !type_id) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsTypeExist] = await db.promise().execute("SELECT * FROM dress_type WHERE id = ?", [type_id])
        if (rowIsTypeExist.length === 0) {
            return res.status(400).json({ status: false, message: "Dress Type Not Found" })
        }

        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress WHERE name = ?", [name])
        if (rowIsExist.length > 0) {
            return res.status(400).json({ status: false, message: "Dress Name Already Exist" })
        }

        const [rowInsert] = await db.promise().execute(
            "INSERT INTO dress(name,image,description,price,type_id) VALUES(?,?,?,?,?)",
            [name, image, description, price, type_id])

        if (rowInsert.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Insert Failed" })
        }
        return res.status(200).json({ status: true, message: "Dress  Added Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateDressWithImage = async (req, res) => {
    const { id } = req.params
    const { name, description, price, type_id } = req.body
    const image = req.file.filename

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!name || !image || !description || !price || !type_id) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress WHERE id = ?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if (rowIsExist[0].type_id !== type_id) {
            const [rowIsTypeExist] = await db.promise().execute("SELECT * FROM dress_type WHERE id = ?", [type_id])
            if (rowIsTypeExist.length === 0) {
                return res.status(400).json({ status: false, message: "Dress Type Not Found" })
            }
        }

        if (rowIsExist[0].name !== name) {
            const [rowIsTypeExist] = await db.promise().execute("SELECT * FROM dress WHERE name = ? AND id <> ?", [name, id])
            if (rowIsTypeExist.length > 0) {
                return res.status(400).json({ status: false, message: "Dress Name Already Exist" })
            }
        }

        const [rowUpdate] = await db.promise().execute(
            "UPDATE dress SET name=?, image=?, description=?, price=?, type_id=? WHERE id=?",
            [name, image, description, price, type_id, id]
        )
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Dress  Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateDressWithoutImage = async (req, res) => {
    const { id } = req.params
    const { name, description, price, type_id } = req.body

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!name || !description || !price || !type_id) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress WHERE id = ?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if (rowIsExist[0].type_id !== type_id) {
            const [rowIsTypeExist] = await db.promise().execute("SELECT * FROM dress_type WHERE id = ?", [type_id])
            if (rowIsTypeExist.length === 0) {
                return res.status(400).json({ status: false, message: "Dress Type Not Found" })
            }
        }

        if (rowIsExist[0].name !== name) {
            const [rowIsTypeExist] = await db.promise().execute("SELECT * FROM dress WHERE name = ? AND id <> ?", [name, id])
            if (rowIsTypeExist.length > 0) {
                return res.status(400).json({ status: false, message: "Dress Name Already Exist" })
            }
        }

        const [rowUpdate] = await db.promise().execute(
            "UPDATE dress SET name=?, description=?, price=?, type_id=? WHERE id=?",
            [name, description, price, type_id, id]
        )
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Dress  Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const deleteDress = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        const [rowIsDressExistInOrdeItem] = await db.promise().execute("SELECT * FROM order_item WHERE dress_id =?", [id])
        if (rowIsDressExistInOrdeItem.length !== 0) {
            return res.status(400).json({ status: false, message: "Dress is Ordered By User" })
        }

        const [rowDelete] = await db.promise().execute("DELETE FROM dress WHERE id = ?", [id])
        if (rowDelete.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Delete Failed" })
        }

        return res.status(200).json({ status: true, message: "Dress Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getDress = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [row] = await db.promise().execute("SELECT * FROM dress WHERE id =?", [id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Dress  Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllDress = async (req, res) => {
    const { type_id } = req.params

    if (type_id) {
        try {
            const [rowIsTypeExist] = await db.promise().execute("SELECT * FROM dress_type WHERE id =?", [type_id])
            if (rowIsTypeExist.length === 0) {
                return res.status(400).json({ status: false, message: "Type not found" })
            }
            const [row] = await db.promise().execute("SELECT * FROM dress WHERE type_id = ?",[type_id])
            return res.status(200).json({ status: true, message: "All Dresses Fetched Successfully", data: row })
        } catch (error) {
            return res.status(500).json({ status: false, message: "Internal Server Error" })
        }
    } else {
        try {
            const [row] = await db.promise().execute("SELECT d.*, dt.name as type_name FROM dress d JOIN dress_type dt ON d.type_id = dt.id")
            return res.status(200).json({ status: true, message: "All Dresses Fetched Successfully", data: row })
        } catch (error) {
            return res.status(500).json({ status: false, message: "Internal Server Error" })
        }
    }
}

const dressController = {
    createDress,
    updateDressWithImage,
    updateDressWithoutImage,
    deleteDress,
    getDress,
    getAllDress
}

module.exports = dressController
const db = require("../DB/db")

const createQuestion = async (req, res) => {
    const { question } = req.body
    const user_id = req.user_id

    if (!question) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowInsert] = await db.promise().execute("INSERT INTO feedback(user_id,question) VALUES(?,?)", [user_id, question])

        if (rowInsert.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Feedback Add Fail" })
        }
        return res.status(200).json({ status: true, message: "Feedback Added Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }

}

const updateQuestion = async (req, res) => {
    const { id } = req.params
    const { question } = req.body
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!question) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }


    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM feedback WHERE id =? and user_id=?", [id, user_id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if (rowIsExist[0].answer !== null) {
            return res.status(400).json({ status: false, message: "Can't update the feedback" })
        }

        const [rowUpdate] = await db.promise().execute("UPDATE feedback SET question=? WHERE id=?", [question, id])
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Feedback Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Feedback Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const answerQuestion = async (req, res) => {
    const { id } = req.params
    const { answer } = req.body
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!answer) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "ADMIN Not Found" })
        }

        const [rowIsExist] = await db.promise().execute("SELECT * FROM feedback WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        const [rowUpdate] = await db.promise().execute("UPDATE feedback SET answer=? WHERE id=?", [answer, id])
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Feedback Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Feedback Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteQuestion = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM feedback WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        const [rowDelete] = await db.promise().execute("DELETE FROM feedback WHERE id = ?", [id])
        if (rowDelete.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Feedback Delete Failed" })
        }

        return res.status(200).json({ status: true, message: "Feedback Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [rowIsExist] = await db.promise().execute("SELECT * FROM feedback WHERE id =? AND user_id=?", [id, user_id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Feedback Fetched Successfully", data: rowIsExist[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllUser = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [row] = await db.promise().execute("SELECT * FROM feedback WHERE user_id = ?", [user_id])

        return res.status(200).json({ status: true, message: "All Feedbacks Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAdmin = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "ADMIN Not Found" })
        }

        const [rowIsExist] = await db.promise().execute("SELECT * FROM feedback WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Feedback Fetched Successfully", data: rowIsExist[0] })
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
            return res.status(400).json({ status: false, message: "ADMIN Not Found" })
        }

        const [row] = await db.promise().execute("SELECT f.*,u.firstname,u.lastname FROM feedback f JOIN user u ON f.user_id = u.id")

        return res.status(200).json({ status: true, message: "All Feedbacks Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const feedbackController = {
    createQuestion,
    answerQuestion,
    updateQuestion,
    deleteQuestion,
    getUser,
    getAllUser,
    getAdmin,
    getAllAdmin
}

module.exports = feedbackController
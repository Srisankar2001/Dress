const db = require("../DB/db")

const createDressType = async(req,res)=>{
    const {name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam} = req.body

    if(!name || shoulder == null || chest == null || bust == null || under_bust == null || waist == null || hip == null || thigh == null || total_rise == null || calf == null || upper_arm == null || inseam == null || outseam == null){
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress_type WHERE name = ?", [name])
        if (rowIsExist.length > 0) {
            return res.status(400).json({ status: false, message: "Dress Type Already Exist" })
        }

        const [rowInsert] = await db.promise().execute(
            "INSERT INTO dress_type(name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam])

        if (rowInsert.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Type Insert Failed" })
        }
        return res.status(200).json({ status: true, message: "Dress Type Added Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }

}

const updateDressType = async(req,res)=>{
    const {id} = req.params
    const {name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam} = req.body

    if(!id){
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if(!name || shoulder == null || chest == null || bust == null || under_bust == null || waist == null || hip == null || thigh == null || total_rise == null || calf == null || upper_arm == null || inseam == null || outseam == null){
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress_type WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if(rowIsExist[0].name !== name){
            const [rowIsAnotherExist] = await db.promise().execute("SELECT * FROM dress_type WHERE name = ? AND id <> ?", [name,id])
        if (rowIsAnotherExist.length > 0) {
            return res.status(400).json({ status: false, message: "Dress Type Already Exist" })
        }

        }
        const [rowUpdate] = await db.promise().execute(
            "UPDATE dress_type SET name=?, shoulder=?, chest=?, bust=?, under_bust=?, waist=?, hip=?, thigh=?, total_rise=?, calf=?, upper_arm=?, inseam=?, outseam=? WHERE id=?",
            [name, shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, id]
        )
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Type Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Dress Type Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteDressType = async(req,res)=>{
    const {id} = req.params
   
    if(!id){
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress_type WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        const [rowIsDressExist] = await db.promise().execute("SELECT * FROM dress WHERE type_id =?", [id])
        if (rowIsDressExist.length > 0) {
            return res.status(400).json({ status: false, message: "Dress Exist With This Type" })
        }

        const [rowDelete] = await db.promise().execute("DELETE FROM dress_type WHERE id = ?",[id])
        if (rowDelete.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Type Delete Failed" })
        }

        return res.status(200).json({ status: true, message: "Dress Type Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getDressType = async(req,res)=>{
    const {id} = req.params
   
    if(!id){
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM dress_type WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Dress Type Fetched Successfully", data: rowIsExist[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllDressType = async(req,res)=>{
    try {
        const [row] = await db.promise().execute("SELECT * FROM dress_type")
        return res.status(200).json({ status: true, message: "All Dress Types Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const dressTypeController = {
    createDressType,
    updateDressType,
    deleteDressType,
    getDressType,
    getAllDressType
}

module.exports = dressTypeController
const db = require("../DB/db")

const createSize = async(req,res)=>{
    const {name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam,height} = req.body

    if(!name || !shoulder || !chest || !bust || !under_bust || !waist || !hip || !thigh || !total_rise || !calf || !upper_arm || !inseam || !outseam || !height){
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM size WHERE name = ?", [name])
        if (rowIsExist.length > 0) {
            return res.status(400).json({ status: false, message: "Size Already Exist" })
        }

        const [rowInsert] = await db.promise().execute(
            "INSERT INTO size(name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam,height) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam,height])

        if (rowInsert.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Size Insert Failed" })
        }
        return res.status(200).json({ status: true, message: "Size Added Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }

}

const updateSize = async(req,res)=>{
    const {id} = req.params
    const {name,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam,height} = req.body

    if(!id){
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if(!name || !shoulder || !chest || !bust || !under_bust || !waist || !hip || !thigh || !total_rise || !calf || !upper_arm || !inseam || !outseam || !height){
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM size WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        if(rowIsExist[0].name !== name){
            const [rowIsAnotherExist] = await db.promise().execute("SELECT * FROM size WHERE name = ? AND id <> ?", [name,id])
        if (rowIsAnotherExist.length > 0) {
            return res.status(400).json({ status: false, message: "Size Already Exist" })
        }

        }
        const [rowUpdate] = await db.promise().execute(
            "UPDATE size SET name=?, shoulder=?, chest=?, bust=?, under_bust=?, waist=?, hip=?, thigh=?, total_rise=?, calf=?, upper_arm=?, inseam=?, outseam=?, height=? WHERE id=?",
            [name, shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height, id]
        )
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Size Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Size Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteSize = async(req,res)=>{
    const {id} = req.params
   
    if(!id){
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM size WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        
        const [rowDelete] = await db.promise().execute("DELETE FROM size WHERE id = ?",[id])
        if (rowDelete.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Size Delete Failed" })
        }

        return res.status(200).json({ status: true, message: "Size Deleted Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getSize = async(req,res)=>{
    const {id} = req.params
   
    if(!id){
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsExist] = await db.promise().execute("SELECT * FROM size WHERE id =?", [id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Size Fetched Successfully", data: rowIsExist[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllSize = async(req,res)=>{
    try {
        const [row] = await db.promise().execute("SELECT * FROM size")
        return res.status(200).json({ status: true, message: "All Dress Types Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const sizeController = {
    createSize,
    updateSize,
    deleteSize,
    getSize,
    getAllSize
}

module.exports = sizeController
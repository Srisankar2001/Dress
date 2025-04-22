const db = require("../DB/db")

const createCartItem = async(req,res)=>{
    const {dress_id} = req.body
    let {shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height} = req.body
    const user_id = req.user_id

    if (!user_id || !dress_id) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [rowIsDressExist] = await db.promise().execute("SELECT * FROM dress WHERE id = ?", [dress_id])
        if (rowIsDressExist.length === 0) {
            return res.status(400).json({ status: false, message: "Dress Not Found" })
        }

        const [rowDressType] = await db.promise().execute("SELECT * FROM dress_type WHERE id = ?", [rowIsDressExist[0].type_id])
        if (rowDressType.length === 0) {
            return res.status(400).json({ status: false, message: "Dress Type Not Found" })
        }else{
            if(rowDressType[0].shoulder){
                if(shoulder === null){
                    return res.status(400).json({ status: false, message: "Shoulder measure required" })
                }
            }else{
                shoulder = null
            }

            if(rowDressType[0].chest){
                if(chest === null){
                    return res.status(400).json({ status: false, message: "Chest measure required" })
                }
            }else{
                chest = null
            }

            if(rowDressType[0].bust){
                if(bust === null){
                    return res.status(400).json({ status: false, message: "Bust measure required" })
                }
            }else{
                bust = null
            }

            if(rowDressType[0].under_bust){
                if(under_bust === null){
                    return res.status(400).json({ status: false, message: "Under Bust measure required" })
                }
            }else{
                under_bust = null
            }

            if(rowDressType[0].waist){
                if(waist === null){
                    return res.status(400).json({ status: false, message: "Waist measure required" })
                }
            }else{
                waist = null
            }

            if(rowDressType[0].hip){
                if(hip === null){
                    return res.status(400).json({ status: false, message: "Hip measure required" })
                }
            }else{
                hip = null
            }

            if(rowDressType[0].thigh){
                if(thigh === null){
                    return res.status(400).json({ status: false, message: "Thigh measure required" })
                }
            }else{
                thigh = null
            }

            if(rowDressType[0].total_rise){
                if(total_rise === null){
                    return res.status(400).json({ status: false, message: "Total Rise measure required" })
                }
            }else{
                total_rise = null
            }

            if(rowDressType[0].calf){
                if(calf === null){
                    return res.status(400).json({ status: false, message: "Calf measure required" })
                }
            }else{
                calf = null
            }

            if(rowDressType[0].upper_arm){
                if(upper_arm === null){
                    return res.status(400).json({ status: false, message: "Upper Arm measure required" })
                }
            }else{
                upper_arm = null
            }

            if(rowDressType[0].inseam){
                if(inseam === null){
                    return res.status(400).json({ status: false, message: "Inseam measure required" })
                }
            }else{
                inseam = null
            }

            if(rowDressType[0].outseam){
                if(outseam === null){
                    return res.status(400).json({ status: false, message: "Outseam measure required" })
                }
            }else{
                outseam = null
            }

            if(height === null){
                return res.status(400).json({ status: false, message: "Height measure required" })
            }
        }

        const [rowInsert] = await db.promise().execute(
            "INSERT INTO cart(user_id, dress_id, shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [user_id, dress_id, shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height])

        if (rowInsert.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Added To Cart Failed" })
        }
        return res.status(200).json({ status: true, message: "Dress Added To Cart Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const updateCartItem = async(req,res)=>{
    const {id} = req.params
    const {dress_id} = req.body
    let {shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height} = req.body
    const user_id = req.user_id

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    if (!dress_id) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [rowIsExist] = await db.promise().execute("SELECT * FROM cart WHERE id = ? AND user_id = ?", [id,user_id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID Not Found" })
        }

        const [rowIsDressExist] = await db.promise().execute("SELECT * FROM dress WHERE id = ?", [dress_id])
        if (rowIsDressExist.length === 0) {
            return res.status(400).json({ status: false, message: "Dress Not Found" })
        }

        const [rowDressType] = await db.promise().execute("SELECT * FROM dress_type WHERE id = ?", [rowIsDressExist[0].type_id])
        if (rowDressType.length === 0) {
            return res.status(400).json({ status: false, message: "Dress Type Not Found" })
        }else{
            if(rowDressType[0].shoulder){
                if(shoulder === null){
                    return res.status(400).json({ status: false, message: "Shoulder measure required" })
                }
            }else{
                shoulder = null
            }

            if(rowDressType[0].chest){
                if(chest === null){
                    return res.status(400).json({ status: false, message: "Chest measure required" })
                }
            }else{
                chest = null
            }

            if(rowDressType[0].bust){
                if(bust === null){
                    return res.status(400).json({ status: false, message: "Bust measure required" })
                }
            }else{
                bust = null
            }
            
            if(rowDressType[0].under_bust){
                if(under_bust === null){
                    return res.status(400).json({ status: false, message: "Under Bust measure required" })
                }
            }else{
                under_bust = null
            }

            if(rowDressType[0].waist){
                if(waist === null){
                    return res.status(400).json({ status: false, message: "Waist measure required" })
                }
            }else{
                waist = null
            }

            if(rowDressType[0].hip){
                if(hip === null){
                    return res.status(400).json({ status: false, message: "Hip measure required" })
                }
            }else{
                hip = null
            }

            if(rowDressType[0].thigh){
                if(thigh === null){
                    return res.status(400).json({ status: false, message: "Thigh measure required" })
                }
            }else{
                thigh = null
            }

            if(rowDressType[0].total_rise){
                if(total_rise === null){
                    return res.status(400).json({ status: false, message: "Total Rise measure required" })
                }
            }else{
                total_rise = null
            }

            if(rowDressType[0].calf){
                if(calf === null){
                    return res.status(400).json({ status: false, message: "Calf measure required" })
                }
            }else{
                calf = null
            }

            if(rowDressType[0].upper_arm){
                if(upper_arm === null){
                    return res.status(400).json({ status: false, message: "Upper Arm measure required" })
                }
            }else{
                upper_arm = null
            }

            if(rowDressType[0].inseam){
                if(inseam === null){
                    return res.status(400).json({ status: false, message: "Inseam measure required" })
                }
            }else{
                inseam = null
            }

            if(rowDressType[0].outseam){
                if(outseam === null){
                    return res.status(400).json({ status: false, message: "Outseam measure required" })
                }
            }else{
                outseam = null
            }

            if(height === null){
                return res.status(400).json({ status: false, message: "Height measure required" })
            }
        }

        const [rowUpdate] = await db.promise().execute(
            "UPDATE cart SET shoulder = ?, chest = ?, bust = ?, under_bust = ?, waist =?, hip = ?, thigh =?, total_rise = ?, calf = ?, upper_arm = ?, inseam = ?, outseam =?, height = ? WHERE id = ?",
            [shoulder, chest, bust, under_bust, waist, hip, thigh, total_rise, calf, upper_arm, inseam, outseam, height, id]
        )
        if (rowUpdate.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Dress Update Failed" })
        }
        return res.status(200).json({ status: true, message: "Dress  Updated Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteCartItem = async(req,res)=>{
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

        const [rowIsExist] = await db.promise().execute("SELECT * FROM cart WHERE id =? AND user_id = ?", [id,user_id])
        if (rowIsExist.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        const [rowDelete] = await db.promise().execute("DELETE FROM cart WHERE id = ?", [id])
        if (rowDelete.affectedRows === 0) {
            return res.status(400).json({ status: false, message: "Item Remove From Cart Failed" })
        }

        return res.status(200).json({ status: true, message: "Item Removed From Cart Successfully" })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getCartItem = async(req,res)=>{
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

        const [row] = await db.promise().execute("SELECT * FROM cart WHERE id =? AND user_id = ?", [id,user_id])
        if (row.length === 0) {
            return res.status(400).json({ status: false, message: "ID not found" })
        }

        return res.status(200).json({ status: true, message: "Item Fetched Successfully", data: row[0] })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllCartItems = async(req,res)=>{
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [row] = await db.promise().execute("SELECT d.*,c.id as cart_id FROM cart c JOIN dress d ON c.dress_id = d.id WHERE c.user_id = ?",[user_id])
        return res.status(200).json({ status: true, message: "All Items Fetched Successfully", data: row })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const cartController = {
    createCartItem,
    updateCartItem,
    deleteCartItem,
    getCartItem,
    getAllCartItems
}
module.exports = cartController
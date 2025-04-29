const db = require("../DB/db")
const OrderItemStatus = require("../Enums/OrderItemStatus")
const OrderStatus = require("../Enums/OrderStatus")

const createPayment = async (req, res) => {
    const { order_id, amount, reference } = req.body
    const user_id = req.user_id

    if (!order_id || !amount || !reference || !user_id) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    db.promise().beginTransaction()

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [rowOrderExist] = await db.promise().execute("SELECT * FROM `order` WHERE id = ? AND user_id = ?", [order_id,user_id])
        if (rowOrderExist.length === 0) {
            return res.status(400).json({ status: false, message: "Order Not Found" })
        }

        if(rowOrderExist[0].total > amount){
            return res.status(400).json({ status: false, message: "Amount is not enough" })
        }

        if(rowOrderExist[0].status !== OrderStatus.NOT_PAID){
            return res.status(400).json({ status: false, message: "Amount is already paid" })
        }
        
        const [insertPayment] = await db.promise().execute("INSERT INTO payment(order_id,amount,reference) VALUES(?,?,?)",[order_id,amount,reference])
        if(insertPayment.affectedRows === 0){
            await db.promise().rollback()
            return res.status(400).json({ status: false, message: "Server Error" })
        }
        const [updateOrder] = await db.promise().execute("UPDATE `order` SET status = ? WHERE id = ?",[OrderStatus.PENDING,order_id])
        if(updateOrder.affectedRows === 0){
            await db.promise().rollback()
            return res.status(400).json({ status: false, message: "Server Error" })
        }
        const [updateOrderItem] = await db.promise().execute("UPDATE order_item SET status = ? WHERE order_id = ?",[OrderItemStatus.NOT_ACCEPTED,order_id])
        if(updateOrderItem.affectedRows === 0){
            await db.promise().rollback()
            return res.status(400).json({ status: false, message: "Server Error" })
        }
        await db.promise().commit()
        return res.status(200).json({ status: true, message: "Payment Successful" })
    } catch (error) {
        await db.promise().rollback()
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
const paymentController = {
    createPayment
}
module.exports = paymentController
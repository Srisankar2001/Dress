const db = require("../DB/db")
const OrderItemStatus = require("../Enums/OrderItemStatus")
const OrderStatus = require("../Enums/OrderStatus")

const createOrder = async (req, res) => {
    const { address, cart } = req.body
    const user_id = req.user_id

    if (!user_id || !address || !cart) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    if (cart.length === 0) {
        return res.status(400).json({ status: false, message: "No items are in the cart" })
    }

    await db.promise().beginTransaction()

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        for (let i = 0; i < cart.length; i++) {
            const [rowIsCartExist] = await db.promise().execute("SELECT * FROM cart WHERE id = ?", [cart[i]])
            if (rowIsCartExist.length === 0) {
                return res.status(400).json({ status: false, message: "Item Not Found in Cart" })
            } else {
                if (rowIsCartExist[0].user_id !== user_id) {
                    return res.status(400).json({ status: false, message: "Internal Server Error" })
                }
            }
        }

        const [rowInsertedOrder] = await db.promise().execute("INSERT INTO `order`(user_id, address) VALUES(?,?)", [user_id, address])
        if (rowInsertedOrder.affectedRows === 0) {
            await db.promise().rollback()
            return res.status(400).json({ status: false, message: "Order Placement Failed" })
        }

        const orderId = rowInsertedOrder.insertId
        let total = 0

        for (let i = 0; i < cart.length; i++) {
            const [rowCart] = await db.promise().execute("SELECT c.*, d.price FROM cart c JOIN dress d ON c.dress_id = d.id WHERE c.id = ?", [cart[i]])
            if (rowCart.length === 0) {
                await db.promise().rollback()
                return res.status(400).json({ status: false, message: "Dress Not Found in Server" })
            }

            await db.promise().execute("INSERT INTO order_item(order_id,dress_id,price,shoulder,chest,bust,under_bust,waist,hip,thigh,total_rise,calf,upper_arm,inseam,outseam,height) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [orderId, rowCart[0].dress_id, rowCart[0].price, rowCart[0].shoulder, rowCart[0].chest, rowCart[0].bust, rowCart[0].under_bust, rowCart[0].waist, rowCart[0].hip, rowCart[0].thigh, rowCart[0].total_rise, rowCart[0].calf, rowCart[0].upper_arm, rowCart[0].inseam, rowCart[0].outseam, rowCart[0].height])

            total += Number(rowCart[0].price)

            await db.promise().execute("DELETE FROM cart WHERE id = ?", [cart[i]])
        }

        const [rowCompleteOrder] = await db.promise().execute("UPDATE `order` SET total = ?, status = ? WHERE id = ?", [total, OrderStatus.NOT_PAID, orderId])
        if (rowCompleteOrder.affectedRows === 0) {
            await db.promise().rollback()
            return res.status(400).json({ status: false, message: "Order Placement Failed" })
        }

        await db.promise().commit()
        return res.status(200).json({ status: true, message: "Order Placement Successfully" })

    } catch (error) {
        await db.promise().rollback()
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const cancelOrder = async (req, res) => {
    const { id } = req.params
    const user_id = req.user_id

    if (!id || !user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    await db.promise().beginTransaction()

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        const [rowOrder] = await db.promise().execute("SELECT * FROM `order` WHERE id =? AND user_id = ?", [id, user_id])
        if (rowOrder.length === 0) {
            return res.status(400).json({ status: false, message: "Order not found" })
        }

        if (rowOrder[0].status === OrderStatus.NOT_PAID) {
            await db.promise().execute("UPDATE `order` SET status = ? WHERE id = ?", [OrderStatus.CANCELLED, id])
            await db.promise().execute("UPDATE order_item SET status = ? WHERE order_id = ?", [OrderItemStatus.CANCELLED, id])
        } else if (rowOrder[0].status === OrderStatus.PENDING) {
            await db.promise().execute("UPDATE `order` SET status = ? WHERE id = ?", [OrderStatus.CANCELLED, id])
            await db.promise().execute("UPDATE order_item SET status = ? WHERE order_id = ?", [OrderItemStatus.CANCELLED, id])
            await db.promise().execute("UPDATE payment SET refund = 1 WHERE order_id = ?", [id])
        } else {
            return res.status(400).json({ status: false, message: "You can't cancelled the order now" })
        }

        await db.promise().commit()
        return res.status(200).json({ status: true, message: "Order Cancelled Successfully" })
    } catch (error) {
        console.log(error)
        await db.promise().rollback()
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const completeOrder = async (req, res) => {
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
        const [rowOrder] = await db.promise().execute("SELECT * FROM `order` WHERE id =? AND user_id = ?", [id, user_id])
        if (rowOrder.length === 0) {
            return res.status(400).json({ status: false, message: "Order not found" })
        }

        if (rowOrder[0].status === OrderStatus.SHIPPED) {
            const [rowCompleteOrder] = await db.promise().execute("UPDATE `order` SET status = ? WHERE id = ?", [OrderStatus.COMPLETED, id])
            if (rowCompleteOrder.affectedRows === 0) {
                return res.status(400).json({ status: false, message: "Order Status Update Fail" })
            }

            return res.status(200).json({ status: true, message: "Order Completed Successfully" })
        } else {
            return res.status(400).json({ status: false, message: "Invalid Request" })
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getOrderUser = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'USER'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }
        const [rowOrder] = await db.promise().execute("SELECT o.id AS order_id, o.total, o.address, o.status, o.created_at as date, COUNT(oi.id) AS count FROM `order` o JOIN order_item oi ON o.id = oi.order_id WHERE o.user_id = ? GROUP BY o.id, o.total, o.address, o.status, o.created_at", [user_id])
        return res.status(200).json({ status: true, message: "All Orders Fetched Successfully", data: rowOrder })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getOrderAdmin = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN'", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }
        const [rowOrder] = await db.promise().execute("SELECT o.id AS order_id, o.user_id, o.total, o.address, o.status, o.created_at AS date, COUNT(oi.id) AS count FROM `order` o JOIN order_item oi ON o.id = oi.order_id GROUP BY o.id, o.user_id, o.total, o.address, o.status, o.created_at")
        return res.status(200).json({ status: true, message: "All Orders Fetched Successfully", data: rowOrder })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const orderController = {
    createOrder,
    cancelOrder,
    completeOrder,
    getOrderUser,
    getOrderAdmin
}

module.exports = orderController
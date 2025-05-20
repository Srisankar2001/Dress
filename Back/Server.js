const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const db = require("./DB/db")
const app = express()

const authRouter = require("./Router/authRouter")
const adminRouter = require("./Router/adminRouter")
const dressTypeRouter = require("./Router/dressTypeRouter")
const dressRouter = require("./Router/dressRouter")
const cartRouter = require("./Router/cartRouter")
const orderRouter = require("./Router/orderRouter")
const orderItemRouter = require("./Router/orderItemRouter")
const paymentRouter = require("./Router/paymentRouter")
const sizeRouter = require("./Router/sizeRouter")
const dashboardRouter = require("./Router/dashboardRouter")
const feedbackRouter = require("./Router/feedbackRouter")
const mailRouter = require("./Router/mailRouter")

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(express.static("upload"))
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/admin", adminRouter)
app.use("/api/dress_type", dressTypeRouter)
app.use("/api/dress", dressRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)
app.use("/api/order_item", orderItemRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/size", sizeRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/feedback", feedbackRouter)
app.use("/api/mail", mailRouter)

db.connect((err) => {
    if (err) {
        console.log("DB Connection : Failed", err.message)
    } else {
        console.log("DB Connection : Success")
        app.listen(3001, (err) => {
            if (err) {
                console.log("Server Start : Failed")
            } else {
                console.log("Server Start : Success")
            }
        })
    }
})
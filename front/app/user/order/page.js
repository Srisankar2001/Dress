"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { Payment } from "./components/payment/Payment"
import { Confirm } from "./components/confirm/Confirm"
import { Cancel } from "./components/cancel/Cancel"
import OrderStatus from "@/enums/OrderStatus"
import { OrderForm } from "./components/orderForm/OrderForm"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/authContext"
import showToast from "@/utils/toast"

const page = () => {
    const router = useRouter()
    const { isUser } = useAuth()
    const [isReady, setIsReady] = useState(false)
    const [payment, setPayment] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [orderForm, setOrderForm] = useState(false)
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get('/order/user')
            if (response.data.status) {
                setOrders(response.data.data)
            }
        } catch (err) {
            // alert(err.response?.data?.message || "Internal Server Error")
            showToast(false, err.response?.data?.message || "Internal Server Error")
        }
    }

    useEffect(() => {
        if (!isUser) {
            router.push("/user/home")
        } else {
            setIsReady(true)
        }
    }, [])

    useEffect(() => {
        if (isReady) {
            fetchOrders()
        }
    }, [isReady, payment, confirm, cancel, orderForm])

    const handlePayment = (id, total) => {
        setPayment({ id, total })
    }

    const handleConfirm = (id) => {
        setConfirm(id)
    }

    const handleCancel = (id) => {
        setCancel(id)
    }

    const handleOrderForm = (id) => {
        setOrderForm(id)
    }

    const renderOrders = () => {
        if (orders.length === 0) {
            return (
                <tr className="order-empty">
                    <td colSpan="6">No Orders Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {orders.map((item, index) => (
                        <tr key={index} onClick={() => handleOrderForm(item.order_id)}>
                            <td>{item.order_id}</td>
                            <td>{item.date.split("T")[0]}</td>
                            {item.status === OrderStatus.NOT_COMPLETED && <td className="order-notCompleted">{item.status}</td>}
                            {item.status === OrderStatus.NOT_PAID && <td className="order-notPaid">{item.status}</td>}
                            {item.status === OrderStatus.PENDING && <td className="order-pending">{item.status}</td>}
                            {item.status === OrderStatus.PROCESSING && <td className="order-processing">{item.status}</td>}
                            {item.status === OrderStatus.SHIPPED && <td className="order-shipped">{item.status}</td>}
                            {item.status === OrderStatus.COMPLETED && <td className="order-completed">{item.status}</td>}
                            {item.status === OrderStatus.CANCELLED && <td className="order-cancelled">{item.status}</td>}
                            <td className="col-address">{item.address}</td>
                            <td>{item.total} LKR</td>
                            <td className="order-action">
                                {item.status === OrderStatus.NOT_PAID && <input type="button" value="Pay" className="Payment-btn" onClick={(e) => { e.stopPropagation(); handlePayment(item.order_id, item.total) }} />}
                                {item.status === OrderStatus.SHIPPED && <input type="button" value="Confirm" className="Confirm-btn" onClick={(e) => { e.stopPropagation(); handleConfirm(item.order_id) }} />}
                                {(item.status === OrderStatus.NOT_PAID || item.status === OrderStatus.PENDING) && <input type="button" value="Cancel" className="Cancel-btn" onClick={(e) => { e.stopPropagation(); handleCancel(item.order_id) }} />}
                            </td>
                        </tr>
                    ))}
                </>
            )
        }
    }

    return (
        <div className="order-container">
            <h1>Order Page</h1>
            {orderForm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <OrderForm id={orderForm} setOrderForm={setOrderForm} />
                    </div>
                </div>
            )}
            {payment && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <Payment id={payment.id} total={payment.total} setPayment={setPayment} />
                    </div>
                </div>
            )}
            {confirm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <Confirm id={confirm} setConfirm={setConfirm} />
                    </div>
                </div>
            )}
            {cancel && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <Cancel id={cancel} setCancel={setCancel} />
                    </div>
                </div>
            )}
            <div className="order-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="col-address">Address</th>
                            <th>Price</th>
                            <th className="order-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderOrders()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page

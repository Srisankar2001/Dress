"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { Payment } from "./components/payment/Payment"
import { Confirm } from "./components/confirm/Confirm"
import { Cancel } from "./components/cancel/Cancel"

const page = () => {
    const [payment, setPayment] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/order/user')
                if (response.data.status) {
                    setOrders(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchOrders()
    }, [payment, confirm, cancel])

    const handlePayment = (id, total) => {
        setPayment({ id, total })
    }

    const handleConfirm = (id) => {
        setConfirm(id)
    }

    const handleCancel = (id) => {
        setCancel(id)
    }

    const renderOrders = () => {
        if (orders.length === 0) {
            return (
                <tr className="order-empty">
                    <td>No Orders Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {orders.map((item, index) => (
                        <tr key={index}>
                            <th>{item.created_at.split("T")[0]}</th>
                            <th>{item.status}</th>
                            <th className="col-address">{item.address}</th>
                            <th>{item.total} LKR</th>
                            <td className="order-action">
                                {item.status === "NOT PAID" && <input type="button" value="Pay" className="Payment-btn" onClick={() => handlePayment(item.id, item.total)} />}
                                {item.status === "SHIPPED" && <input type="button" value="Confirm" className="Confirm-btn" onClick={() => handleConfirm(item.id)} />}
                                {(item.status === "NOT PAID" || item.status === "PENDING") && <input type="button" value="Cancel" className="Cancel-btn" onClick={() => handleCancel(item.id)} />}
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

"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import OrderStatus from "@/enums/OrderStatus"

const page = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/order/admin')
                if (response.data.status) {
                    setOrders(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchOrders()
    }, [])

    const renderOrders = () => {
        if (orders.length === 0) {
            return (
                <tr className="order-empty">
                    <td colSpan="5">No Items Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {orders.map((item, index) => (
                        <tr key={index}>
                           <td>{item.id}</td>
                            <td>{item.date.split("T")[0]}</td>
                            {item.status === OrderStatus.NOT_COMPLETED && <td className="order-notCompleted">{item.status}</td>}
                            {item.status === OrderStatus.NOT_PAID && <td className="order-notPaid">{item.status}</td>}
                            {item.status === OrderStatus.PENDING && <td className="order-pending">{item.status}</td>}
                            {item.status === OrderStatus.PROCESSING && <td className="order-processing">{item.status}</td>}
                            {item.status === OrderStatus.SHIPPED && <td className="order-cancelled">{item.status}</td>}
                            <td className="order-action">
                                {item.status === "NOT ACCEPTED" && <input type="button" value="Assign" className="assign-btn" onClick={() => handleAssign(item.order_item_id)} />}
                            </td>
                        </tr>
                    ))}
                </>
            )
        }
    }

    return (
        <div className="order-container">
            <h1>Order Item Page</h1>
            {assignForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <AssignForm id={assignForm} setAssignForm={setAssignForm} />
                    </div>
                </div>
            )}
            <div className="order-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th className="order-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderOrderItems()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page

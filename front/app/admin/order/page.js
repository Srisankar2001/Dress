"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import OrderStatus from "@/enums/OrderStatus"
import { OrderForm } from "./component/orderForm/OrderForm"

const page = () => {
    const [orderForm,setOrderForm] = useState(false)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/order/admin')
                if (response.data.status) {
                    console.log(response.data.data[0])
                    setOrders(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchOrders()
    }, [orderForm])

    const handleOrderForm = (id) => {
        setOrderForm(id)
    }
    const renderOrders = () => {
        if (orders.length === 0) {
            return (
                <tr className="order-empty">
                    <td colSpan="9">No Items Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {orders.map((item, index) => (
                        <tr key={index} onClick={()=>handleOrderForm(item.order_id)}>
                            <td>{item.order_id}</td>
                            <td>{item.date.split("T")[0]}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.count}</td>
                            <td>{item.total} LKR</td>
                            {item.status === OrderStatus.NOT_COMPLETED && <td className="order-notCompleted">{item.status}</td>}
                            {item.status === OrderStatus.NOT_PAID && <td className="order-notPaid">{item.status}</td>}
                            {item.status === OrderStatus.PENDING && <td className="order-pending">{item.status}</td>}
                            {item.status === OrderStatus.PROCESSING && <td className="order-processing">{item.status}</td>}
                            {item.status === OrderStatus.SHIPPED && <td className="order-shipped">{item.status}</td>}
                            {item.status === OrderStatus.COMPLETED && <td className="order-completed">{item.status}</td>}
                            {item.status === OrderStatus.CANCELLED && <td className="order-cancelled">{item.status}</td>}
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
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <OrderForm id={orderForm} setOrderForm={setOrderForm} />
                    </div>
                </div>
            )}
            <div className="order-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
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

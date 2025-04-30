"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { AssignForm } from "./component/assignForm/AssignForm"
import OrderItemStatus from "@/enums/OrderItemStatus"

const page = () => {
    const [assignForm, setAssignForm] = useState(false)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await axiosInstance.get('/order_item/admin')
                if (response.data.status) {
                    setOrderItems(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchOrderItems()
    }, [assignForm])


    const handleAssign = (id) => {
        setAssignForm(id)
    }

    const renderOrderItems = () => {
        if (orderItems.length === 0) {
            return (
                <tr className="orderItem-empty">
                    <td colSpan="6">No Items Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {orderItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.order_item_id}</td>
                            <td className="image-col">
                                <img
                                    src={`http://localhost:3001/${item.dress_image}`}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "/assets/default-img.jpg"
                                    }}
                                    className="dress-image"
                                    alt="Dress"
                                />
                            </td>
                            <td>{item.date.split("T")[0]}</td>
                            <td>{item.dress_name}</td>
                            {item.status === OrderItemStatus.NOT_PAID && <td className="orderItem-notPaid">{item.status}</td>}
                            {item.status === OrderItemStatus.NOT_ACCEPTED && <td className="orderItem-notAccepted">{item.status}</td>}
                            {item.status === OrderItemStatus.ACCEPTED && <td className="orderItem-accepted">{item.status}</td>}
                            {item.status === OrderItemStatus.COMPLETED && <td className="orderItem-completed">{item.status}</td>}
                            {item.status === OrderItemStatus.CANCELLED && <td className="orderItem-cancelled">{item.status}</td>}
                            <td className="orderItem-action">
                                {item.status === "NOT ACCEPTED" && <input type="button" value="Assign" className="assign-btn" onClick={() => handleAssign(item.order_item_id)} />}
                            </td>
                        </tr>
                    ))}
                </>
            )
        }
    }

    return (
        <div className="orderItem-container">
            <h1>Order Item Page</h1>
            {assignForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <AssignForm id={assignForm} setAssignForm={setAssignForm} />
                    </div>
                </div>
            )}
            <div className="orderItem-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th className="orderItem-action">Action</th>
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

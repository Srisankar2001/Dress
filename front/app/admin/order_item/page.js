"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { AssignForm } from "./component/assignForm/AssignForm"

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
    }, [])


    const handleAssign = (id) => {
        setAssignForm(id)
    }

    const renderOrderItems = () => {
        if (orderItems.length === 0) {
            return (
                <tr className="orderItem-empty">
                    <td>No Items Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {orderItems.map((item, index) => (
                        <tr key={index}>
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
                            <th>{item.date.split("T")[0]}</th>
                            <th>{item.dress_name}</th>
                            <th>{item.status}</th>
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

"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { AcceptForm } from "./component/AcceptForm/AcceptForm"
import { DeclineForm } from "./component/DeclineForm/DeclineForm"
import { CompleteForm } from "./component/CompleteForm/CompleteForm"
import { OrderDetailsForm } from "./component/OrderDetailsForm/OrderDetailsForm"
import showToast from "@/utils/toast"
import OrderItemStatus from "@/enums/OrderItemStatus"

const page = () => {
    const [acceptForm, setAcceptForm] = useState(false)
    const [completeForm, setCompeleteForm] = useState(false)
    const [declineForm, setDeclineForm] = useState(false)
    const [orderDetailsForm, setOrderDetailsForm] = useState(false)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await axiosInstance.get('/order_item/employee')
                if (response.data.status) {
                    setOrderItems(response.data.data)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false, err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchOrderItems()
    }, [acceptForm, completeForm, declineForm])


    const handleAccept = (id) => {
        setAcceptForm(id)
    }

    const handleDecline = (id) => {
        setDeclineForm(id)
    }

    const handleComplete = (id) => {
        setCompeleteForm(id)
    }

    const handleDetails = (id) => {
        setOrderDetailsForm(id)
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
                        <tr key={index} onClick={() => handleDetails(item.order_item_id)}>
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
                                {item.status === "NOT ACCEPTED" && <input type="button" value="Accept" className="assign-btn" onClick={(e) => { e.stopPropagation(); handleAccept(item.order_item_id) }} />}
                                {item.status === "ACCEPTED" && <input type="button" value="Complete" className="complete-btn" onClick={(e) => { e.stopPropagation(); handleComplete(item.order_item_id) }} />}
                                {item.status === "ACCEPTED" && <input type="button" value="Decline" className="decline-btn" onClick={(e) => { e.stopPropagation(); handleDecline(item.order_item_id) }} />}
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
            {orderDetailsForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <OrderDetailsForm id={orderDetailsForm} setOrderDetailsForm={setOrderDetailsForm} />
                    </div>
                </div>
            )}
            {acceptForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <AcceptForm id={acceptForm} setAcceptForm={setAcceptForm} />
                    </div>
                </div>
            )}
            {declineForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <DeclineForm id={declineForm} setDeclineForm={setDeclineForm} />
                    </div>
                </div>
            )}
            {completeForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <CompleteForm id={completeForm} setCompleteForm={setCompeleteForm} />
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

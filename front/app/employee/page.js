"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { AcceptForm } from "./component/AcceptForm/AcceptForm"
import { DeclineForm } from "./component/DeclineForm/DeclineForm"
import { CompleteForm } from "./component/CompleteForm/CompleteForm"

const page = () => {
    const [acceptForm,setAcceptForm] = useState(false)
    const [completeForm,setCompeleteForm] = useState(false)
    const [declineForm,setDeclineForm] = useState(false)
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        const fetchOrderItems = async () => {
            try {
                const response = await axiosInstance.get('/order_item/employee')
                if (response.data.status) {
                    setOrderItems(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchOrderItems()
    }, [])


    const handleAccept = (id) => {
        setAcceptForm(id)
    }

    const handleDecline = (id) => {
        setDeclineForm(id)
    }

    const handleComplete = (id) => {
        setCompeleteForm(id)
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
                                {item.status === "NOT ACCEPTED" && <input type="button" value="Accept" className="assign-btn" onClick={() => handleAccept(item.order_item_id)} />}
                                {item.status === "ACCEPTED" && <input type="button" value="Decline" className="decline-btn" onClick={() => handleDecline(item.order_item_id)} />}
                                {item.status === "ACCEPTED" && <input type="button" value="Complete" className="complete-btn" onClick={() => handleComplete(item.order_item_id)} />}
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

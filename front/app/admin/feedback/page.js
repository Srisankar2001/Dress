"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { UpdateForm } from "./components/updateForm/UpdateForm"
import { DeleteForm } from "./components/deleteForm/DeleteForm"

const page = () => {
    const [updateForm, setUpdateForm] = useState(false)
    const [deleteForm, setDeleteFrom] = useState(false)
    const [feedbacks, setfeedbacks] = useState([])

    useEffect(() => {
        const fetchfeedbacks = async () => {
            try {
                const response = await axiosInstance.get('/feedback/admin')
                if (response.data.status) {
                    setfeedbacks(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchfeedbacks()
    }, [updateForm, deleteForm])

    const handleUpdate = (id) => {
        setUpdateForm(id)
    }

    const handleDelete = (id) => {
        setDeleteFrom(id)
    }

    const renderFeedbacks = () => {
        if (feedbacks.length === 0) {
            return (
                <div className="feedback-empty">
                    <p>No feedbacks Available</p>
                </div>
            )
        } else {
            return (
                <>
                    {feedbacks.map((item, index) => (
                        <div key={index} className="feedback-div-item">
                            <h1>{item.question}</h1>
                            <h2>{item.answer ? item.answer : "Waiting For Reply..."}</h2>
                            <div className="feedback-action">
                                <input type="button" value="Update" className="Update-btn" onClick={(e) => { handleUpdate(item.id) }} />
                                <input type="button" value="Delete" className="Delete-btn" onClick={(e) => { handleDelete(item.id) }} />
                            </div>
                        </div>
                    ))}
                </>
            )
        }
    }

    return (
        <div className="feedback-container">
            <div className="feedback-nav">
                <h1>Feedback Page</h1>
            </div>
            {updateForm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <UpdateForm id={updateForm} setUpdateForm={setUpdateForm} />
                    </div>
                </div>
            )}
            {deleteForm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <DeleteForm id={deleteForm} setDeleteForm={setDeleteFrom} />
                    </div>
                </div>
            )}
            <div className="feedback-div">
                {renderFeedbacks()}
            </div>
        </div>
    )
}

export default page

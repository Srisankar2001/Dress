"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { UpdateForm } from "./components/updateForm/UpdateForm"
import { DeleteForm } from "./components/deleteForm/DeleteForm"

const page = () => {
    const [updateForm, setUpdateForm] = useState(false)
    const [deleteForm, setDeleteForm] = useState(false)
    const [feedbacks, setfeedbacks] = useState([])

    useEffect(() => {
        const fetchfeedbacks = async () => {
            try {
                const response = await axiosInstance.get('/feedback/admin')
                if (response.data.status) {
                    setfeedbacks(response.data.data)
                    console.log(response.data.data)
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
        setDeleteForm(id)
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
                            <h3>User ID : {item.user_id}</h3>
                            <h3>Name : {item.firstname} {item.lastname}</h3>
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
                        <DeleteForm id={deleteForm} setDeleteForm={setDeleteForm} />
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

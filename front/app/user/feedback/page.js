"use client"

import { useEffect, useState } from "react"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/authContext"
import { CreateForm } from "./components/createFrom/CreateForm"
import { UpdateForm } from "./components/updateForm/UpdateForm"
import { DeleteForm } from "./components/deleteForm/DeleteForm"

const page = () => {
    const router = useRouter()
    const { isUser } = useAuth()
    const [isReady, setIsReady] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [createForm, setCreateForm] = useState(false)
    const [deleteForm, setDeleteFrom] = useState(false)
    const [feedbacks, setfeedbacks] = useState([])

    const fetchfeedbacks = async () => {
        try {
            const response = await axiosInstance.get('/feedback/user')
            if (response.data.status) {
                setfeedbacks(response.data.data)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
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
            fetchfeedbacks()
        }
    }, [isReady, createForm, updateForm, deleteForm])

    const handleCreate = () => {
        setCreateForm(true)
    }

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
                <input type="button" value="Create" onClick={handleCreate} />
            </div>
            {createForm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <CreateForm setCreateForm={setCreateForm} />
                    </div>
                </div>
            )}
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

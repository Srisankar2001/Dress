"use client"
import React, { useEffect, useState } from 'react'
import "./DeleteForm.css"
import axiosInstance from '@/config/axiosConfig'

export const DeleteForm = ({ id, setDeleteForm }) => {
    const [question, setQuestion] = useState("")

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axiosInstance.get(`/feedback/user/${id}`)
                if (response.data.status) {
                    const data = response.data.data
                    setQuestion(data.question)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setDeleteForm(false)
            }
        }
        fetchFeedback()
    }, [id])


    const handleReset = () => {
        setDeleteForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete(`/feedback/delete/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                setDeleteForm(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setDeleteForm(false)
        }
    }
    return (
        <div className="feedback-delete">
            <h1>Feedback Delete Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="feedback-delete-text">
                    <h1>Do You Want To Delete this Question ?</h1>
                    <p>" {question} "</p>
                </div>
                <div className="feedback-delete-button-div">
                    <input type="submit" value="Delete" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

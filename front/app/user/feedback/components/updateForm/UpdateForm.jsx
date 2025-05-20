"use client"
import React, { useEffect, useState } from 'react'
import "./UpdateForm.css"
import validate from '../../validation'
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const UpdateForm = ({ id, setUpdateForm }) => {
    const [question, setQuestion] = useState("")
    const [error, setError] = useState(null)

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
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false, err.response?.data?.message || "Internal Server Error")
                setUpdateForm(false)
            }
        }
        fetchFeedback()
    }, [id])

    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleReset = () => {
        setUpdateForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(question)
        setError(errors)
        if (errors === null) {
            try {
                const data = {
                    question: question.trim()
                }
                const response = await axiosInstance.put(`/feedback/user/${id}`, data)
                if (response.data.status) {
                    // alert(response.data.message)
                    showToast(true, response.data.message)
                    setUpdateForm(false)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false, err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="feedback-update">
            <h1>Feedback Update Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="feedback-update-input-div">
                    <div className="feedback-update-input">
                        <label htmlFor="question">Question</label>
                        <input type="text" name="question" value={question} placeholder="Enter The Question" onChange={handleChange} />
                        {error && <p>{error}</p>}
                    </div>
                </div>
                <div className="feedback-update-button-div">
                    <input type="submit" value="Update" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

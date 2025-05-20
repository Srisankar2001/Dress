"use client"
import React, { useEffect, useState } from 'react'
import "./CreateForm.css"
import validate from '../../validation'
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const CreateForm = ({ setCreateForm }) => {
    const [question, setQuestion] = useState("")
    const [error, setError] = useState(null)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleChange = (e) => {
        setQuestion(e.target.value)
    }

    const handleReset = () => {
        setCreateForm(false)
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
                const response = await axiosInstance.post("/feedback/create", data)
                if (response.data.status) {
                    // alert(response.data.message)
                    showToast(true, response.data.message)
                    setCreateForm(false)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false, err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="feedback-create">
            <h1>Feedback Create Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="feedback-create-input-div">
                    <div className="feedback-create-input">
                        <label htmlFor="question">Question</label>
                        <input type="text" name="question" value={question} placeholder="Enter The Question" onChange={handleChange} />
                        {error && <p>{error}</p>}
                    </div>
                </div>
                <div className="feedback-create-button-div">
                    <input type="submit" value="Create" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

"use client"
import React, { useEffect, useState } from 'react'
import "./Report.css"
import validate from './validation'
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const Report = ({ setBill, setReport }) => {
    const [input, setInput] = useState({
        startDate: "",
        endDate: ""
    })
    const [error, setError] = useState({
        startDate: null,
        endDate: null
    })

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleReset = () => {
        setReport(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(val => val === null)) {
            try {
                const data = {
                    startDate: input.startDate,
                    endDate: input.endDate
                }
                const response = await axiosInstance.post("/dashboard/report", data)
                if (response.data.status) {
                    const responseData = response.data.data
                    if (responseData.length === 0) {
                        // alert("No Sale happen between this week")
                        showToast(false,"No Sale happen between this week")
                        setReport(false)
                    } else {
                        setBill({ startDate: input.startDate, endDate: input.endDate, data: responseData })
                        setReport(false)
                    }

                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false,err.response?.data?.message || "Internal Server Error")
            }
        }
    }

    return (
        <div className="report">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Report Generate Page</h1>
                <div className="report-input-div">
                    <div className="report-input">
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" name="startDate" value={input.startDate} onChange={handleChange} />
                        {error.startDate && <p>{error.startDate}</p>}
                    </div>
                    <div className="report-input">
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" name="endDate" value={input.endDate} onChange={handleChange} />
                        {error.endDate && <p>{error.endDate}</p>}
                    </div>
                </div>
                <div className="report-button-div">
                    <input type="submit" value="Generate" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

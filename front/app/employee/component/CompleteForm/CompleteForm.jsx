"use client"
import React from 'react'
import "./CompleteForm.css"
import axiosInstance from '@/config/axiosConfig'

export const CompleteForm = ({ id, setCompleteForm, fetchOrderItems }) => {

    const handleReset = () => {
        setCompleteForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order_item/employee/complete/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                await fetchOrderItems()
                setCompleteForm(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setCompleteForm(false)
        }
    }
    return (
        <div className="orderItem-complete-container">
            <h1>Dress Complete Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="orderItem-complete-text">
                    <p>Did You Completed The Order?</p>
                </div>
                <div className="orderItem-complete-button-div">
                    <input type="submit" value="Confirm" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

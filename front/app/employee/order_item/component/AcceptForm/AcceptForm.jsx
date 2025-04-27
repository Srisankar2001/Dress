"use client"
import React from 'react'
import "./AcceptForm.css"
import axiosInstance from '@/config/axiosConfig'

export const AcceptForm = ({ id, setAcceptForm }) => {

    const handleReset = () => {
        setAcceptForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order_item/employee/accept/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                setAcceptForm(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setAcceptForm(false)
        }
    }
    return (
        <div className="orderItem-accept-container">
            <div className="orderItem-accept-content">
                <h1>Accept Order</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className="orderItem-accept-text">
                        <p>Do you want to accept the order?</p>
                    </div>
                    <div className="orderItem-accept-button-div">
                        <button type="submit">Confirm</button>
                        <button type="reset">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

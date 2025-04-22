"use client"
import React from 'react'
import "./DeclineForm.css"
import axiosInstance from '@/config/axiosConfig'

export const DeclineForm = ({ id, setDeclineForm }) => {

    const handleReset = () => {
        setDeclineForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order_item/employee/not_accept/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                setDeclineForm(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setDeclineForm(false)
        }
    }
    return (
        <div className="orderItem-decline-container">
            <h1>Dress Decline Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="orderItem-decline-text">
                    <p>Do You Want To Decline This Order?</p>
                </div>
                <div className="orderItem-decline-button-div">
                    <input type="submit" value="Confirm" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

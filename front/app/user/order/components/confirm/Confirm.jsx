"use client"
import axiosInstance from '@/config/axiosConfig'
import React  from 'react'
import "./Confirm.css"

export const Confirm = ({ id, setConfirm }) => {
    
    const handleReset = () => {
        setConfirm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order/complete/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                setConfirm(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setConfirm(false)
        }
    }
    return (
        <div className="confirm">
            <h1>Order Confirm Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="confirm-text">
                    <p>Confirm Order Recived</p>
                </div>
                <div className="confirm-button-div">
                    <input type="submit" value="Yes" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

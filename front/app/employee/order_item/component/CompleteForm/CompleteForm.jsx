"use client"
import React from 'react'
import "./CompleteForm.css"
import axiosInstance from '@/config/axiosConfig'

export const CompleteForm = ({ id, setCompleteForm }) => {

    const handleReset = () => {
        setCompleteForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order_item/employee/complete/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                setCompleteForm(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setCompleteForm(false)
        }
    }
    return (
        <div className="orderItem-complete-container">
      <div className="orderItem-complete-content">
        <h1>Complete Order</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="orderItem-complete-text">
            <p>Have you completed the order?</p>
          </div>
          <div className="orderItem-complete-button-div">
            <button type="submit">Confirm</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    )
}

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
      <div className="orderItem-decline-content">
        <h1>Decline Order</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="orderItem-decline-text">
            <p>Do you want to decline this order?</p>
          </div>
          <div className="orderItem-decline-button-div">
            <button type="submit">Confirm</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </div>
    </div>
    )
}

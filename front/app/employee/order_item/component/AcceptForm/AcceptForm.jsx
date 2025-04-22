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
            <h1>Dress Accept Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="orderItem-accept-text">
                    <p>Do You Want To Accept The Order?</p>
                </div>
                <div className="orderItem-accept-button-div">
                    <input type="submit" value="Confirm" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

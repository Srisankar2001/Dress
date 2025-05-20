"use client"
import axiosInstance from '@/config/axiosConfig'
import React, { useEffect } from 'react'
import "./Confirm.css"
import showToast from '@/utils/toast'

export const Confirm = ({ id, setConfirm }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleReset = () => {
        setConfirm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order/complete/${id}`)
            if (response.data.status) {
                // alert(response.data.message)
                showToast(true,response.data.message)
                setConfirm(false)
            }
        } catch (err) {
            // alert(err.response?.data?.message || "Internal Server Error")
              showToast(false,err.response?.data?.message || "Internal Server Error")
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

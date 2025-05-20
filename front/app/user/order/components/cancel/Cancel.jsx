"use client"
import axiosInstance from '@/config/axiosConfig'
import React, { useEffect } from 'react'
import "./Cancel.css"
import showToast from '@/utils/toast'

export const Cancel = ({ id, setCancel }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleReset = () => {
        setCancel(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.put(`/order/cancel/${id}`)
            if (response.data.status) {
                // alert(response.data.message)
                showToast(true,response.data.message)
                setCancel(false)
            }
        } catch (err) {
            // alert(err.response?.data?.message || "Internal Server Error")
            showToast(false,err.response?.data?.message || "Internal Server Error")
            setCancel(false)
        }
    }
    return (
        <div className="cancel">
            <h1>Order Cancel Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="cancel-text">
                    <p>Do You Want To Cancel This Order? </p>
                </div>
                <div className="cancel-button-div">
                    <input type="submit" value="Yes" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

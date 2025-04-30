"use client"
import axiosInstance from '@/config/axiosConfig'
import React, { useEffect } from 'react'
import "./Payment.css"

export const Payment = ({ id, total, setPayment }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const generateRefNumber = () => {
        const prefix = "Ref "
        const randomDigits = Math.floor(100000 + Math.random() * 900000)
        return prefix + randomDigits
    }

    const handleReset = () => {
        setPayment(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = {
                order_id: id,
                amount: total,
                reference: generateRefNumber()
            }
            const response = await axiosInstance.post(`/payment/create`, data)
            if (response.data.status) {
                alert(response.data.message)
                setPayment(null)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setPayment(null)
        }
    }
    return (
        <div className="payment">
            <h1>Payment Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="payment-text">
                    <p>Confirm Pay {Number(total).toFixed(2)} LKR</p>
                </div>
                <div className="payment-button-div">
                    <input type="submit" value="Pay" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

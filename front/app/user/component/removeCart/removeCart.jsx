"use client"
import axiosInstance from '@/config/axiosConfig'
import React, { useState, useEffect } from 'react'
import "./removeCart.css"

export const RemoveCart = ({ id, dress_id, setRemoveCart }) => {
    const [name, setName] = useState("")

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await axiosInstance.get(`/dress/get/${dress_id}`)
                if (response.data.status) {
                    setName(response.data.data.name)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setRemoveCart(null)
            }
        }
        fetchName()
    }, [id])

    const handleReset = () => {
        setRemoveCart(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete(`/cart/delete/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                setRemoveCart(null)
            } else {
                alert(response.data.message)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
        }
    }

    return (
        <div className="removeCart">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Delete Cart Page</h1>
                <div className="removeCart-text">
                    <p>Do You Want To Delete " {name} "</p>
                </div>
                <div className="removeCart-button-div">
                    <input type="submit" value="Delete" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

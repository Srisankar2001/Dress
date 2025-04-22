"use client"
import React, { useEffect, useState } from 'react'
import "./DeleteForm.css"
import axiosInstance from '@/config/axiosConfig'

export const DeleteForm = ({ id, setDeleteForm }) => {
    const [name, setName] = useState("")

    useEffect(() => {
        const fetchDress = async () => {
            try {
                const response = await axiosInstance.get(`/dress/get/${id}`)
                if (response.data.status) {
                    setName(response.data.data.name)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setDeleteForm(false)
            }
        }
        fetchDress()
    }, [id])


    const handleReset = () => {
        setDeleteForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete(`/dress/delete/${id}`)
            if (response.data.status) {
                alert(response.data.message)
                setDeleteForm(false)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
            setDeleteForm(false)
        }
    }
    return (
        <div className="dress-delete">
            <h1>Dress Delete Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="dress-delete-text">
                    <p>Do You Want To Delete " {name} "</p>
                </div>
                <div className="dress-delete-button-div">
                    <input type="submit" value="Delete" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

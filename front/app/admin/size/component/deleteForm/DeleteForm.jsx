"use client"
import React, { useEffect, useState } from 'react'
import "./DeleteForm.css"
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const DeleteForm = ({ id, setDeleteForm }) => {
    const [name, setName] = useState("")

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const fetchSize = async () => {
            try {
                const response = await axiosInstance.get(`/size/get/${id}`)
                if (response.data.status) {
                    setName(response.data.data.name)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false,err.response?.data?.message || "Internal Server Error")
                setDeleteForm(false)
            }
        }
        fetchSize()
    }, [id])


    const handleReset = () => {
        setDeleteForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete(`/size/delete/${id}`)
            if (response.data.status) {
                // alert(response.data.message)
                showToast(true,response.data.message)
                setDeleteForm(false)
            }
        } catch (err) {
            // alert(err.response?.data?.message || "Internal Server Error")
            showToast(false,err.response?.data?.message || "Internal Server Error")
            setDeleteForm(false)
        }
    }
    return (
        <div className="size-delete">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Size Delete Page</h1>
                <div className="size-delete-text">
                    <p>Do You Want To Delete " {name} "</p>
                </div>
                <div className="size-delete-button-div">
                    <input type="submit" value="Delete" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

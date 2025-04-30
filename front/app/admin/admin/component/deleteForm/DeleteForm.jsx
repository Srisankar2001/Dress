"use client"
import React, { useEffect, useState } from 'react'
import "./DeleteForm.css"
import axiosInstance from '@/config/axiosConfig'

export const DeleteForm = ({ id, setDeleteForm }) => {
    const [name, setName] = useState({ firstname: "", lastname: "" })

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])
    
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axiosInstance.get(`/admin/admin/${id}`)
                if (response.data.status) {
                    setName({
                        firstname: response.data.data.firstname,
                        lastname: response.data.data.lastname
                    })
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setDeleteForm(false)
            }
        }
        fetchAdmin()
    }, [id])


    const handleReset = () => {
        setDeleteForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete(`/admin/admin/${id}`)
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
        <div className="admin-delete">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Admin Delete Page</h1>
                <div className="admin-delete-text">
                    <p>Do You Want To Delete " {name.firstname} {name.lastname} "</p>
                </div>
                <div className="admin-delete-button-div">
                    <input type="submit" value="Delete" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

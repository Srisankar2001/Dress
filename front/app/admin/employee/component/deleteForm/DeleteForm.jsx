"use client"
import React, { useEffect, useState } from 'react'
import "./DeleteForm.css"
import axiosInstance from '@/config/axiosConfig'

export const DeleteForm = ({ id, setDeleteForm }) => {
    const [name, setName] = useState({ firstname: "", lastname: "" })

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axiosInstance.get(`/admin/employee/${id}`)
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
        fetchEmployee()
    }, [id])


    const handleReset = () => {
        setDeleteForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete(`/admin/employee/${id}`)
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
        <div className="employee-delete">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Employee Delete Page</h1>
                <div className="employee-delete-text">
                    <p>Do You Want To Delete " {name.firstname} {name.lastname} "</p>
                </div>
                <div className="employee-delete-button-div">
                    <input type="submit" value="Delete" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

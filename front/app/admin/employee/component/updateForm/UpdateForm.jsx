"use client"
import React, { useEffect, useState } from 'react'
import "./UpdateForm.css"
import axiosInstance from '@/config/axiosConfig'
import validate from './validation'
import showToast from '@/utils/toast'

export const UpdateForm = ({ id, setUpdateForm }) => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        email: ""
    })
    const [error, setError] = useState({
        firstname: null,
        lastname: null,
        phone: null,
        address: null,
        email: null,
        password: null,
        confirmPassword: null
    })

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])
    
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axiosInstance.get(`/admin/employee/${id}`)
                if (response.data.status) {
                    setInput({
                        firstname: response.data.data.firstname,
                        lastname: response.data.data.lastname,
                        phone: response.data.data.phone,
                        address: response.data.data.address,
                        email: response.data.data.email
                    })
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
             showToast(false,err.response?.data?.message || "Internal Server Error")
                setUpdateForm(false)
            }
        }
        fetchEmployee()
    }, [id])

    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleReset = () => {
        setUpdateForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(val => val === null)) {
            try {
                const finalFirstname = input.firstname.trim()
                const finalLastname = input.lastname.trim()
                const data = {
                    firstname: finalFirstname.charAt(0).toUpperCase() + finalFirstname.slice(1).toLowerCase(),
                    lastname: finalLastname.charAt(0).toUpperCase() + finalLastname.slice(1).toLowerCase(),
                    phone: input.phone.trim(),
                    address: input.address.trim(),
                    email: input.email.trim().toLowerCase()
                }
                const response = await axiosInstance.put(`/admin/employee/${id}`, data)
                if (response.data.status) {
                    // alert(response.data.message)
                    showToast(true,response.data.message)
                    setUpdateForm(false)
                } else {
                    // alert(response.data.message)
                    showToast(false,response.data.message)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
               showToast(false,err.response?.data?.message || "Internal Server Error")
            }
        }
    }


    return (
        <div className="employee-update">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Employee Update From</h1>
                <div className="employee-update-input-div">
                    <div className="employee-update-input">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" value={input.firstname} placeholder="Enter Your Firstname" onChange={handleChange} />
                        {error.firstname && <p>{error.firstname}</p>}
                    </div>
                    <div className="employee-update-input">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" value={input.lastname} placeholder="Enter Your Lastname" onChange={handleChange} />
                        {error.lastname && <p>{error.lastname}</p>}
                    </div>
                    <div className="employee-update-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={input.email} placeholder="Enter Your Email" onChange={handleChange} />
                        {error.email && <p>{error.email}</p>}
                    </div>
                    <div className="employee-update-input">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" name="phone" value={input.phone} placeholder="Enter Your Phone Number" onChange={handleChange} />
                        {error.phone && <p>{error.phone}</p>}
                    </div>
                    <div className="employee-update-input">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={input.address} placeholder="Enter Your Address" onChange={handleChange} />
                        {error.address && <p>{error.address}</p>}
                    </div>
                </div>
                <div className="employee-update-button-div">
                    <input type="submit" value="Update" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

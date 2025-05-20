"use client"
import React, { useEffect, useState } from 'react'
import "./CreateForm.css"
import validate from './validation'
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const CreateForm = ({ setCreateForm }) => {
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: ""
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

    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleReset = () => {
        setCreateForm(false)
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
                    email: input.email.trim().toLowerCase(),
                    password: input.password.trim()
                }
                const response = await axiosInstance.post("/admin/employee", data)
                if (response.data.status) {
                    // alert(response.data.message)
                    showToast(true,response.data.message)
                    setCreateForm(false)
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
        <div className="employee-create">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Employee Create Form</h1>
                <div className="employee-create-input-div">
                    <div className="employee-create-input">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" value={input.firstname} placeholder="Enter Your Firstname" onChange={handleChange} />
                        {error.firstname && <p>{error.firstname}</p>}
                    </div>
                    <div className="employee-create-input">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" value={input.lastname} placeholder="Enter Your Lastname" onChange={handleChange} />
                        {error.lastname && <p>{error.lastname}</p>}
                    </div>
                    <div className="employee-create-input">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" name="phone" value={input.phone} placeholder="Enter Your Phone Number" onChange={handleChange} />
                        {error.phone && <p>{error.phone}</p>}
                    </div>
                    <div className="employee-create-input">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={input.address} placeholder="Enter Your Address" onChange={handleChange} />
                        {error.address && <p>{error.address}</p>}
                    </div>
                    <div className="employee-create-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={input.email} placeholder="Enter Your Email" onChange={handleChange} />
                        {error.email && <p>{error.email}</p>}
                    </div>
                    <div className="employee-create-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={input.password} placeholder="Enter Your Password" onChange={handleChange} />
                        {error.password && <p>{error.password}</p>}
                    </div>
                    <div className="employee-create-input">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" value={input.confirmPassword} placeholder="Re-Enter Your Password" onChange={handleChange} />
                        {error.confirmPassword && <p>{error.confirmPassword}</p>}
                    </div>
                </div>
                <div className="employee-create-button-div">
                    <input type="submit" value="Create" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

"use client"

import { useState } from "react"
import validate from "./validation"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter()
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
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        setInput({
            firstname: "",
            lastname: "",
            phone: "",
            address: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setError({
            firstname: null,
            lastname: null,
            phone: null,
            address: null,
            email: null,
            password: null,
            confirmPassword: null
        })
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
                const response = await axiosInstance.post("/auth/register",data)
                if (response.data.status) {
                    alert(response.data.message)
                    router.push("/auth/login")
                } else {
                    alert(response.data.message)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="register">
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="register-input-div">
                    <div className="register-input">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" name="firstname" value={input.firstname} placeholder="Enter Your Firstname" onChange={handleChange} />
                        {error.firstname && <p>{error.firstname}</p>}
                    </div>
                    <div className="register-input">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" name="lastname" value={input.lastname} placeholder="Enter Your Lastname" onChange={handleChange} />
                        {error.lastname && <p>{error.lastname}</p>}
                    </div>
                    <div className="register-input">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" name="phone" value={input.phone} placeholder="Enter Your Phone Number" onChange={handleChange} />
                        {error.phone && <p>{error.phone}</p>}
                    </div>
                    <div className="register-input">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" value={input.address} placeholder="Enter Your Address" onChange={handleChange} />
                        {error.address && <p>{error.address}</p>}
                    </div>
                    <div className="register-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={input.email} placeholder="Enter Your Email" onChange={handleChange} />
                        {error.email && <p>{error.email}</p>}
                    </div>
                    <div className="register-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={input.password} placeholder="Enter Your Password" onChange={handleChange} />
                        {error.password && <p>{error.password}</p>}
                    </div>
                    <div className="register-input">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" value={input.confirmPassword} placeholder="Re-Enter Your Password" onChange={handleChange} />
                        {error.confirmPassword && <p>{error.confirmPassword}</p>}
                    </div>
                </div>
                <div className="register-button-div">
                    <input type="submit" value="Submit" />
                    <input type="reset" value="Clear" />
                </div>
            </form>
            <div className="register-link">
                <a href="/auth/login">Already Have An Account. Click Here To Login</a>
            </div>
        </div>
    )
}

export default page
"use client"

import { useState } from "react"
import validate from "./validation"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { useRouter } from "next/navigation"
import arrow from "../assets/arrow.png"
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
    const router = useRouter()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: null,
        password: null
    })
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        setInput({
            email: "",
            password: ""
        })
        setError({
            email: null,
            password: null
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(val => val === null)) {
            try {
                const data = {
                    email: input.email.toLowerCase().trim(),
                    password: input.password.trim()
                }
                const response = await axiosInstance.post("/auth/login", data)
                if (response.data.status) {
                    alert(response.data.message)
                    const role = response.data.data.role
                    if (role === "ADMIN") {
                        router.push("/admin/dashboard")
                    } else if (role === "EMPLOYEE") {
                        router.push("/employee/dashboard")
                    } else {
                        router.push("/user/home")
                    }
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="login">
            <header>
                <Link href="/user/home">
                    <Image src={arrow} alt="Back" />
                </Link>
                <h1>Login Page</h1>
            </header>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="login-input-div">
                    <div className="login-input">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={input.email} placeholder="Enter Your Email" onChange={handleChange} />
                        {error.email && <p>{error.email}</p>}
                    </div>
                    <div className="login-input">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={input.password} placeholder="Enter Your Password" onChange={handleChange} />
                        {error.password && <p>{error.password}</p>}
                    </div>
                </div>
                <div className="login-button-div">
                    <input type="submit" value="Submit" />
                    <input type="reset" value="Clear" />
                </div>
            </form>
            <div className="login-link">
                <a href="/auth/register">Don't Have An Account. Click Here To Register</a>
            </div>
        </div>
    )
}

export default page
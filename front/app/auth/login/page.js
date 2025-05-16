"use client"

import { useEffect, useState } from "react"
import validate from "./validation"
import "./page.css"
import axiosInstance from "@/config/axiosConfig"
import { useRouter } from "next/navigation"
import arrow from "../assets/arrow.png"
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from "@/context/authContext"
import showToast from "@/utils/toast"

const page = () => {
    const router = useRouter()
    const { isUser, isAdmin, isEmployee, loading, refreshAuth } = useAuth()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: null,
        password: null
    })

    // Redirect authenticated users after loading is complete
    useEffect(() => {
        if (!loading) {
            if (isAdmin) {
                router.push("/admin/dashboard")
            } else if (isEmployee) {
                router.push("/employee/dashboard")
            } else if (isUser) {
                router.push("/user/home")
            }
        }
    }, [loading, isUser, isAdmin, isEmployee, router])

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
                    // alert(response.data.message)
                    showToast(true, response.data.message)
                    setTimeout(async () => {
                        await refreshAuth()
                    }, 2000)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false, err.response?.data?.message || "Internal Server Error")
            }
        }
    }

    // Show loading indicator while context is fetching
    if (loading) {
        return (
            <div className="login-loading">
                <p>Loading...</p>
            </div>
        )
    } else {
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


}

export default page
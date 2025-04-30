"use client"

import { useRouter } from "next/navigation"
import { Navbar } from "./component/navbar/Navbar"
import "./layout.css"
import { useAuth } from "@/context/authContext"
import { useEffect } from "react"

const layout = ({ children }) => {
    const router = useRouter()
    const { isEmployee, loading } = useAuth()
    useEffect(() => {
        if (!loading) {
            if (!isEmployee) {
                router.push("/auth/login")
            }
        }
    }, [isEmployee, loading, router])
    return (
        <div className="layout-container">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default layout
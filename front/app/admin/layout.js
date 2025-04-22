"use client"

import { useAuth } from "@/context/authContext"
import { useRouter } from "next/navigation"
import { useEffect } from 'react'
import { Navbar } from "./component/navbar/Navbar"
import "./layout.css"

const layout = ({ children }) => {
    const router = useRouter()
    const { isAdmin, loading } = useAuth()
    // useEffect(() => {
    //     if(!isAdmin){
    //         router.push("/auth/login")
    //     }
    // },[])
    return (
        <div className="layout-container">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default layout
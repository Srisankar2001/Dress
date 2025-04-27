"use client"

import { Navbar } from "./component/navbar/Navbar"
import "./layout.css"

const layout = ({ children }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default layout
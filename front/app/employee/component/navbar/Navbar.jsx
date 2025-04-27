"use client"

import React from 'react'
import "./Navbar.css"
import dashboard from "../assets/dashboard.png"
import order_item from "../assets/order_item.png"
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/employee/dashboard" className='nav-item'>
                        <Image src={dashboard} alt='Dashboard' />
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link href="/employee/order_item" className='nav-item'>
                        <Image src={order_item} alt='Order Item' />
                        <p>Order Items</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

"use client"

import React from 'react'
import "./Navbar.css"
import dashboard from "../assets/dashboard.png"
import dress_type from "../assets/dress_type.png"
import dress from "../assets/dress.png"
import employee from "../assets/employee.png"
import order from "../assets/order.png"
import order_item from "../assets/order_item.png"
import size from "../assets/size.png"
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/admin/dashboard" className='nav-item'>
                        <Image src={dashboard} alt='Dashboard' />
                        <p>Dashboard</p>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/dress_type" className='nav-item'>
                        <Image src={dress_type} alt='Dress Type' />
                        <p>Dress Type</p>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/size" className='nav-item'>
                        <Image src={size} alt='Size' />
                        <p>Size</p>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/dress" className='nav-item'>
                        <Image src={dress} alt='Dress' />
                        <p>Dress</p>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/employee" className='nav-item'>
                        <Image src={employee} alt='Employee' />
                        <p>Employee</p>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/order" className='nav-item'>
                        <Image src={order} alt='Order' />
                        <p>Orders</p>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/order_item" className='nav-item'>
                        <Image src={order_item} alt='Order Item' />
                        <p>Order Items</p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

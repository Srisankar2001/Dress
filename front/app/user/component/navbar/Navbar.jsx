"use client"
import { useAuth } from '@/context/authContext'
import React from 'react'
import home from "../assets/home.png"
import order from "../assets/order.png"
import cart from "../assets/cart.png"
import login from "../assets/login.png"
import logout from "../assets/logout.png"
import "./Navbar.css"
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
    const { isUser } = useAuth()
    return (
        <nav>
            <ul className='nav-left'>
                <li>
                    <Link href="/user/home">
                        <Image src={home} alt="Home" />
                        <p>Home</p>
                    </Link>
                </li>
                {isUser &&
                    <Link href="/user/order">
                        <li>
                            <Image src={order} alt="Order" />
                            <p>Orders</p>
                        </li>
                    </Link>
                }
                {isUser &&
                    <Link href="/user/cart">
                        <li>
                            <Image src={cart} alt="Cart" />
                            <p>Cart</p>
                        </li>
                    </Link>
                }
            </ul>
            <div className='nav-right'>
                {isUser &&
                    <li>
                        <Image src={logout} alt="Logout" />
                        <p>Logout</p>
                    </li>
                }
                {!isUser &&
                    <li>
                        <Image src={login} alt="Login" />
                        <p>Login</p>
                    </li>
                }
            </div>
        </nav>
    )
}

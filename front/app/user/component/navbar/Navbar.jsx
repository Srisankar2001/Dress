"use client"
import { useAuth } from '@/context/authContext'
import React from 'react'
import home from "../assets/home.png"
import store from "../assets/store.png"
import order from "../assets/order.png"
import cart from "../assets/cart.png"
import login from "../assets/login.png"
import logout from "../assets/logout.png"
import logo from "../assets/logo.png"
import feedback from "../assets/feedback.png"
import info from "../assets/info.png"
import "./Navbar.css"
import Image from 'next/image'
import Link from 'next/link'

export const Navbar = () => {
    const { isUser, logoutFunction } = useAuth()
    return (
        <nav>
            <ul className='nav-left'>
                <li>
                    <Image src={logo} alt="Logo" />
                </li>
                <li>
                    <Link href="/user/home">
                        <Image src={home} alt="Home" />
                        <p>Home</p>
                    </Link>
                </li>
                <li>
                    <Link href="/user/store">
                        <Image src={store} alt="Store" />
                        <p>Store</p>
                    </Link>
                </li>
                {isUser &&
                    <li>
                        <Link href="/user/order">
                            <Image src={order} alt="Order" />
                            <p>Orders</p>
                        </Link>
                    </li>
                }
                {isUser &&
                    <li>
                        <Link href="/user/cart">
                            <Image src={cart} alt="Cart" />
                            <p>Cart</p>
                        </Link>
                    </li>
                }
                {isUser &&
                    <li>
                        <Link href="/user/feedback">
                            <Image src={feedback} alt="Feedback" />
                            <p>Feedback</p>
                        </Link>
                    </li>
                }
                <li>
                    <Link href="/user/aboutus">
                        <Image src={info} alt="About Us" />
                        <p>About Us</p>
                    </Link>
                </li>
            </ul>
            <div className='nav-right'>
                {isUser &&
                    <li onClick={logoutFunction}>
                        <Link href="#">
                            <Image src={logout} alt="Logout" />
                            <p>Logout</p>
                        </Link>
                    </li>
                }
                {!isUser &&
                    <li>
                        <Link href="/auth/login">
                            <Image src={login} alt="Login" />
                            <p>Login</p>
                        </Link>
                    </li>
                }
            </div>
        </nav>
    )
}

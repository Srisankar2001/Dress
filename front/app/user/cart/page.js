"use client"
import axiosInstance from '@/config/axiosConfig'
import React, { useEffect, useState } from 'react'
import "./page.css"
import { useAuth } from '@/context/authContext'
import { EditCart } from '../component/editCart/editCart'
import { RemoveCart } from '../component/removeCart/removeCart'

const page = () => {
    const { details } = useAuth()
    const [editCart, setEditCart] = useState(null)
    const [removeCart, setRemoveCart] = useState(null)
    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const [error, setError] = useState(null)
    const fetchItems = async () => {
        try {
            const response = await axiosInstance.get('/cart/getAll')
            if (response.data.status) {
                setItems(response.data.data)
                setTotal(response.data.data.reduce((sum, item) => sum + Number(item.price), 0));
            }
        } catch (err) {
            alert(err.response?.data?.message || "Internal Server Error")
        }
    }

    useEffect(() => {
        fetchItems()
        setAddress(details.address)
    }, [editCart,removeCart])


    const handleEdit = (id,dress_id) => {
        setEditCart({id,dress_id})
    }

    const handleRemove = (id,dress_id) => {
        setRemoveCart({id,dress_id})
    }

    const handleCheckout = async () => {
        if (address.trim() !== "") {
            setError(null)
            try {
                const cart = items.map(item => (item.cart_id))
                const data = {
                    cart: cart,
                    address: address
                }
                const response = await axiosInstance.post("/order/create", data)
                if (response.data.status) {
                    alert(response.data.message)
                    fetchItems()
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        } else {
            setError("Address Field is Empty")
        }
    }

    const renderItems = () => {
        if (items.length === 0) {
            return (
                <div className="cart-empty">
                    <p>No Items Available</p>
                </div>
            )
        } else {
            return (
                <div className='cart-item-div'>
                    {items.map((item, index) => (
                        <div key={index} className='cart-item'>
                            <div className="image-div">
                                <img
                                    src={`http://localhost:3001/${item.image}`}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "/assets/default-img.jpg"
                                    }}
                                    className="dress-image"
                                    alt="dress"
                                />
                            </div>
                            <div className="home-cart-content">
                                <h2>{item.name}</h2>
                                <h1>{item.price} LKR</h1>
                                <div className="btn-div">
                                    <input type="button" value="Edit" onClick={() => handleEdit(item.cart_id,item.id)}/>
                                    <input type="button" value="Remove" onClick={() => handleRemove(item.cart_id,item.id)}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }

    return (
        <div className='cart-container'>
            {editCart && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <EditCart id={editCart.id} dress_id={editCart.dress_id} setEditCart={setEditCart} />
                    </div>
                </div>
            )}
            {removeCart && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <RemoveCart id={removeCart.id} dress_id={removeCart.dress_id} setRemoveCart={setRemoveCart} />
                    </div>
                </div>
            )}
            <div className='cart-left'>
                {renderItems()}
            </div>
            {items.length !== 0 &&
                <div className='cart-right'>
                    <p>Sub Total : {total.toFixed(2)} LKR</p>
                    <div className='cart-input'>
                        <label htmlFor='address'>Delivery Address</label>
                        <input type='text' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                        {error && <p>{error}</p>}
                    </div>
                    <div className='cart-action'>
                        <input type='button' value="Checkout" onClick={handleCheckout} />
                    </div>
                </div>
            }
        </div>
    )
}

export default page
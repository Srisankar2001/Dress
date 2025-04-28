"use client"
import axiosInstance from '@/config/axiosConfig'
import { useAuth } from '@/context/authContext'
import React, { useEffect, useState } from 'react'
import "./page.css"
import { AddToCart } from '../component/addTocart/addToCart'
import { MoreInfo } from '../component/moreInfo/MoreInfo'

const page = () => {
    const { isUser } = useAuth()
    const [addToCart, setAddToCart] = useState(null)
    const [moreInfo, setMoreInfo] = useState(null)
    const [dresses, setDresses] = useState([])

    useEffect(() => {
        const fetchDresses = async () => {
            try {
                const response = await axiosInstance.get('/dress/getAll')
                if (response.data.status) {
                    setDresses(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchDresses()
    }, [])

    const handleAddToCart = (id, type_id) => {
        setAddToCart({ id, type_id })
    }

    const handleMoreInfo = (id, type_id) => {
        setMoreInfo({ id, type_id })
    }

    const renderDresses = () => {
        if (dresses.length === 0) {
            return (
                <div className="dress-empty">
                    <p>No Dresses Available</p>
                </div>
            )
        } else {
            return (
                <div className='home-dress-div'>
                    {dresses.map((item, index) => (
                        <div key={index} className='home-dress'>
                            <div className="image-div">
                                <img
                                    src={`http://localhost:3001/${item.image}`}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "/assets/default-img.jpg"
                                    }}
                                    className="dress-image"
                                    alt="Dress"
                                />
                            </div>
                            <div className="home-dress-content">
                                <h2>{item.name}</h2>
                                <h1>{item.price} LKR</h1>
                                <div className="btn-div">
                                    <input className='btn-addToCart' type="button" value="Add To Cart" onClick={() => handleAddToCart(item.id, item.type_id)} />
                                    <input className='btn-moreInfo' type="button" value="More Info" onClick={() => handleMoreInfo(item.id, item.type_id)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }
    return (
        <div className='home-container'>
            {addToCart && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <AddToCart id={addToCart.id} type_id={addToCart.type_id} setAddToCart={setAddToCart} />
                    </div>
                </div>
            )}
            {moreInfo && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <MoreInfo id={moreInfo.id} type_id={moreInfo.type_id} setMoreInfo={setMoreInfo} />
                    </div>
                </div>
            )}
            {renderDresses()}
        </div>
    )
}

export default page
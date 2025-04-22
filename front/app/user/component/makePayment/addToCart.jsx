"use client"
import axiosInstance from '@/config/axiosConfig'
import React, { useState, useEffect } from 'react'
import "./addToCart.css"
import validate from './validation'

export const MakePayment = ({ order_id, total, setMakePayment }) => {
    const [name, setName] = useState("")
    const [sizes, setSizes] = useState([])
    const [input, setInput] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDress = async () => {
            try {
                const response = await axiosInstance.get(`/dress/get/${id}`)
                if (response.data.status) {
                    setName(response.data.data.name)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setAddToCart(null)
            }
        }

        const fetchType = async () => {
            try {
                const response = await axiosInstance.get(`/dress_type/get/${type_id}`)
                if (response.data.status) {
                    const typeData = response.data.data
                    const fields = [
                        "shoulder", "chest", "bust", "under_bust", "waist",
                        "hip", "thigh", "total_rise", "calf", "upper_arm",
                        "inseam", "outseam"
                    ]
                    const newInput = { height: "" }

                    fields.forEach(field => {
                        if (typeData[field] === 1) {
                            newInput[field] = ""
                        }
                    })

                    setInput(newInput)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setAddToCart(null)
            }
        }

        const fetchAllSizes = async () => {
            try {
                const response = await axiosInstance.get('/size/getAll')
                if (response.status) {
                    setSizes(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setAddToCart(null)
            }
        }

        fetchDress()
        fetchType()
        fetchAllSizes()
    }, [id, type_id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (e) => {
        const value = e.target.value
        if (!value) return

        const selectedSize = sizes.find(size => size.id == value)

        if (selectedSize) {
            setInput(prev => {
                const updatedInput = {}
                Object.keys(prev).forEach(key => {
                    updatedInput[key] = selectedSize[key]
                });
                return updatedInput
            })
        }
    }


    const handleReset = () => {
        setAddToCart(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (errors === null) {
            const data = {
                dress_id: id,
                shoulder: input.shoulder || null,
                chest: input.chest || null,
                bust: input.bust || null,
                under_bust: input.under_bust || null,
                waist: input.waist || null,
                hip: input.hip || null,
                thigh: input.thigh || null,
                total_rise: input.total_rise || null,
                calf: input.calf || null,
                upper_arm: input.upper_arm || null,
                inseam: input.inseam || null,
                outseam: input.outseam || null,
                height: input.height || null
            }
            try {
                const response = await axiosInstance.post("/cart/create", data)
                if (response.data.status) {
                    alert(response.data.message)
                    setAddToCart(null)
                } else {
                    alert(response.data.message)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
    }

    return (
        <div className="addToCart">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Add To Cart Page</h1>
                <p>Enter  the Measures for {name} to add to Cart</p>
                <select className='addToCart-select-div' onChange={handleSelectChange}>
                    <option value="">Select a size</option>
                    {sizes.map((size, index) => (
                        <option key={index} value={size.id}>{size.name}</option>
                    ))}
                </select>
                <div className="addToCart-input-div">
                    <div className="addToCart-input-grid">
                        {input.shoulder !== undefined &&
                            <div>
                                <label htmlFor="shoulder">Shoulder</label>
                                <input type="number" name="shoulder" value={input.shoulder || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.chest !== undefined &&
                            <div>
                                <label htmlFor="chest">Chest</label>
                                <input type="number" name="chest" value={input.chest || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.bust !== undefined &&
                            <div>
                                <label htmlFor="bust">Bust</label>
                                <input type="number" name="bust" value={input.bust || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.under_bust !== undefined &&
                            <div>
                                <label htmlFor="under_bust">Under Bust</label>
                                <input type="number" name="under_bust" value={input.under_bust || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.waist !== undefined &&
                            <div>
                                <label htmlFor="waist">Waist</label>
                                <input type="number" name="waist" value={input.waist || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.hip !== undefined &&
                            <div>
                                <label htmlFor="hip">Hip</label>
                                <input type="number" name="hip" value={input.hip || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.thigh !== undefined &&
                            <div>
                                <label htmlFor="thigh">Thigh</label>
                                <input type="number" name="thigh" value={input.thigh || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.total_rise !== undefined &&
                            <div>
                                <label htmlFor="total_rise">Total Rise</label>
                                <input type="number" name="total_rise" value={input.total_rise || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.calf !== undefined &&
                            <div>
                                <label htmlFor="calf">Calf</label>
                                <input type="number" name="calf" value={input.calf || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.upper_arm !== undefined &&
                            <div>
                                <label htmlFor="upper_arm">Upper Arm</label>
                                <input type="number" name="upper_arm" value={input.upper_arm || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.inseam !== undefined &&
                            <div>
                                <label htmlFor="inseam">Inseam</label>
                                <input type="number" name="inseam" value={input.inseam || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.outseam !== undefined &&
                            <div>
                                <label htmlFor="outseam">Outseam</label>
                                <input type="number" name="outseam" value={input.outseam || ""} onChange={handleChange} />
                            </div>
                        }
                        {input.height !== undefined &&
                            <div>
                                <label htmlFor="height">Height</label>
                                <input type="number" name="height" value={input.height || ""} onChange={handleChange} />
                            </div>
                        }
                        {error && <p>{error}</p>}
                    </div>
                </div>
                <div className="addToCart-button-div">
                    <input type="submit" value="Add" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

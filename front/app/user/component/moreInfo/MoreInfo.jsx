import axiosInstance from '@/config/axiosConfig'
import React, { useEffect, useState } from 'react'
import "./MoreInfo.css"
import validate from './validation'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authContext'

export const MoreInfo = ({ id, type_id, setMoreInfo }) => {
    const router = useRouter()
    const { isUser } = useAuth()
    const [dress, setDress] = useState({})
    const [sizes, setSizes] = useState([])
    const [input, setInput] = useState({})
    const [error, setError] = useState(null)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const fetchDress = async () => {
            try {
                const response = await axiosInstance.get(`/dress/get/${id}`)
                if (response.data.status) {
                    setDress(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
                setMoreInfo(null)
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
                setMoreInfo(null)
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
                setMoreInfo(null)
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
        setMoreInfo(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isUser) {
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
                        setMoreInfo(null)
                    } else {
                        alert(response.data.message)
                    }
                } catch (err) {
                    alert(err.response?.data?.message || "Internal Server Error")
                }
            }
        } else {
            router.push("/auth/login")
        }
    }

    return (
        <div className="moreInfo-container">
            <div className="moreInfo-content">
                <h1>More Info Page</h1>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div className='moreInfo-align'>
                        <div className='moreInfo-left'>
                            <div className="image-div">
                                <img
                                    src={`http://localhost:3001/${dress.image}`}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "/assets/default-img.jpg"
                                    }}
                                    className="dress-image"
                                    alt="Dress"
                                />
                            </div>
                            <div className="dress-content">
                                <h2>{dress.name}</h2>
                                <p>{dress.description}</p>
                                <h3>{dress.price} LKR</h3>
                            </div>
                        </div>
                        <div className='moreInfo-right'>
                            <select className='moreInfo-select-div' onChange={handleSelectChange}>
                                <option value="">Select a size</option>
                                {sizes.map((size, index) => (
                                    <option key={index} value={size.id}>{size.name}</option>
                                ))}
                            </select>
                            <div className="moreInfo-input-div">
                                <div className="moreInfo-input-grid">
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
                            <div className="moreInfo-button-div">
                                <input type="submit" value="Add To Cart" />
                                <input type="reset" value="Cancel" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

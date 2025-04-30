"use client"
import React, { useEffect, useState } from 'react'
import "./CreateForm.css"
import validate from '../../validation'
import axiosInstance from '@/config/axiosConfig'

export const CreateForm = ({ setCreateForm }) => {
    const [input, setInput] = useState({
        name: "",
        shoulder: false,
        chest: false,
        bust: false,
        under_bust: false,
        waist: false,
        hip: false,
        thigh: false,
        total_rise: false,
        calf: false,
        upper_arm: false,
        inseam: false,
        outseam: false
    })
    const [error, setError] = useState({
        name: null,
        measure: null
    })

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }
    const handleReset = () => {
        setCreateForm(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(val => val === null)) {
            try {
                const data = {
                    name: input.name.trim(),
                    shoulder: input.shoulder,
                    chest: input.chest,
                    bust: input.bust,
                    under_bust: input.under_bust,
                    waist: input.waist,
                    hip: input.hip,
                    thigh: input.thigh,
                    total_rise: input.total_rise,
                    calf: input.calf,
                    upper_arm: input.upper_arm,
                    inseam: input.inseam,
                    outseam: input.outseam
                }
                const response = await axiosInstance.post("/dress_type/create", data)
                if (response.data.status) {
                    alert(response.data.message)
                    setCreateForm(false)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="dresstype-create">
            <h1>Dresstype Create Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="dresstype-create-input-div">
                    <div className="dresstype-create-input">
                        <label htmlFor="name">Dress Type Name</label>
                        <input type="text" name="name" value={input.name} placeholder="Enter The Dress Type Name" onChange={handleChange} />
                        {error.name && <p>{error.name}</p>}
                    </div>
                    <div className="dresstype-create-input dresstype-create-checkbox-div">
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="shoulder">Shoulder</label>
                            <input type="checkbox" name="shoulder" checked={input.shoulder} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="chest">Chest</label>
                            <input type="checkbox" name="chest" checked={input.chest} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="bust">Bust</label>
                            <input type="checkbox" name="bust" checked={input.bust} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="under_bust">Under Bust</label>
                            <input type="checkbox" name="under_bust" checked={input.under_bust} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="waist">Waist</label>
                            <input type="checkbox" name="waist" checked={input.waist} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="hip">Hip</label>
                            <input type="checkbox" name="hip" checked={input.hip} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="thigh">Thigh</label>
                            <input type="checkbox" name="thigh" checked={input.thigh} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="total_rise">Total Rise</label>
                            <input type="checkbox" name="total_rise" checked={input.total_rise} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="calf">Calf</label>
                            <input type="checkbox" name="calf" checked={input.calf} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="upper_arm">Upper Arm</label>
                            <input type="checkbox" name="upper_arm" checked={input.upper_arm} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="inseam">Inseam</label>
                            <input type="checkbox" name="inseam" checked={input.inseam} onChange={handleChange} />
                        </div>
                        <div className="dresstype-create-checkbox">
                            <label htmlFor="outseam">Outseam</label>
                            <input type="checkbox" name="outseam" checked={input.outseam} onChange={handleChange} />
                        </div>
                        {error.measure && <p>{error.measure}</p>}
                    </div>
                </div>
                <div className="dresstype-create-button-div">
                    <input type="submit" value="Create" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

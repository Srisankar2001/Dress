"use client"
import React, { useEffect, useState } from 'react'
import "./UpdateForm.css"
import validate from '../../validation'
import axiosInstance from '@/config/axiosConfig'

export const UpdateForm = ({ id, setUpdateForm }) => {
    const [input, setInput] = useState({
        name: "",
        shoulder: "",
        chest: "",
        bust: "",
        under_bust: "",
        waist: "",
        hip: "",
        thigh: "",
        total_rise: "",
        calf: "",
        upper_arm: "",
        inseam: "",
        outseam: "",
        height: ""
    })
    const [error, setError] = useState({
        name: null,
        measure: null
    })

    useEffect (() => {
        const fetchSize = async () => {
            try {
                const response = await axiosInstance.get(`/size/get/${id}`)
                if (response.data.status) {
                    setInput({
                        name: response.data.data.name,
                        shoulder: response.data.data.shoulder,
                        chest: response.data.data.chest,
                        bust: response.data.data.bust,
                        under_bust: response.data.data.under_bust,
                        waist: response.data.data.waist,
                        hip: response.data.data.hip,
                        thigh: response.data.data.thigh,
                        total_rise: response.data.data.total_rise,
                        calf: response.data.data.calf,
                        upper_arm: response.data.data.upper_arm,
                        inseam: response.data.data.inseam,
                        outseam: response.data.data.outseam,
                        height: response.data.data.height
                    })
                }
            }catch(err){
                alert(err.response?.data?.message || "Internal Server Error")
                setUpdateForm(false)
            }
        }
        fetchSize()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleReset = () => {
        setUpdateForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(val => val === null)) {
            try {
                const finalName = input.name.trim()
                const data = {
                    name: finalName.toUpperCase(),
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
                    outseam: input.outseam,
                    height: input.height
                }
                const response = await axiosInstance.put(`/size/update/${id}`, data)
                if (response.data.status) {
                    alert(response.data.message)
                    setUpdateForm(false)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="size-update">
        <h1>Size Update Page</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="size-update-input-div">
                <div className="size-update-input">
                    <label htmlFor="name">Size Name</label>
                    <input type="text" name="name" value={input.name} placeholder="Enter The Dress Type Name" onChange={handleChange} />
                    {error.name && <p>{error.name}</p>}
                </div>
                <div className="size-update-input-grid">
                    <div>
                        <label htmlFor="shoulder">Shoulder</label>
                        <input type="number" name="shoulder" value={input.shoulder} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="chest">Chest</label>
                        <input type="number" name="chest" value={input.chest} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="bust">Bust</label>
                        <input type="number" name="bust" value={input.bust} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="under_bust">Under Bust</label>
                        <input type="number" name="under_bust" value={input.under_bust} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="waist">Waist</label>
                        <input type="number" name="waist" value={input.waist} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="hip">Hip</label>
                        <input type="number" name="hip" value={input.hip} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="thigh">Thigh</label>
                        <input type="number" name="thigh" value={input.thigh} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="total_rise">Total Rise</label>
                        <input type="number" name="total_rise" value={input.total_rise} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="calf">Calf</label>
                        <input type="number" name="calf" value={input.calf} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="upper_arm">Upper Arm</label>
                        <input type="number" name="upper_arm" value={input.upper_arm} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="inseam">Inseam</label>
                        <input type="number" name="inseam" value={input.inseam} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="outseam">Outseam</label>
                        <input type="number" name="outseam" value={input.outseam} onChange={handleChange} />
                    </div>
                    <div className="full-width">
                        <label htmlFor="height">Height</label>
                        <input type="number" name="height" value={input.height} onChange={handleChange} />
                    </div>
                    {error.measure && <p>{error.measure}</p>}
                </div>
            </div>
            <div className="size-update-button-div">
                <input type="submit" value="Update" />
                <input type="reset" value="Cancel" />
            </div>
        </form>
    </div>
    )
}

"use client"
import React, { useEffect, useState } from 'react'
import "./UpdateForm.css"
import validate from '../../validation'
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const UpdateForm = ({ id, setUpdateForm }) => {
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

    useEffect(() => {
        const fetchDressType = async () => {
            try {
                const response = await axiosInstance.get(`/dress_type/get/${id}`)
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
                        outseam: response.data.data.outseam
                    })
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
               showToast(false,err.response?.data?.message || "Internal Server Error") 
                setUpdateForm(false)
            }
        }
        fetchDressType()
    }, [id])
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
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
                const response = await axiosInstance.put(`/dress_type/update/${id}`, data)
                if (response.data.status) {
                    // alert(response.data.message)
                    showToast(true,response.data.message)
                    setUpdateForm(false)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false,err.response?.data?.message || "Internal Server Error")
            }
        }
    }
    return (
        <div className="dresstype-update">
            <h1>Dresstype Update Page</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="dresstype-update-input-div">
                    <div className="dresstype-update-input">
                        <label htmlFor="name">Dress Type Name</label>
                        <input type="text" name="name" value={input.name} placeholder="Enter The Dress Type Name" onChange={handleChange} />
                        {error.name && <p>{error.name}</p>}
                    </div>
                    <div className="dresstype-update-input dresstype-update-checkbox-div">
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="shoulder">Shoulder</label>
                            <input type="checkbox" name="shoulder" checked={input.shoulder} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="chest">Chest</label>
                            <input type="checkbox" name="chest" checked={input.chest} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="bust">Bust</label>
                            <input type="checkbox" name="bust" checked={input.bust} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="under_bust">Under Bust</label>
                            <input type="checkbox" name="under_bust" checked={input.under_bust} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="waist">Waist</label>
                            <input type="checkbox" name="waist" checked={input.waist} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="hip">Hip</label>
                            <input type="checkbox" name="hip" checked={input.hip} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="thigh">Thigh</label>
                            <input type="checkbox" name="thigh" checked={input.thigh} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="total_rise">Total Rise</label>
                            <input type="checkbox" name="total_rise" checked={input.total_rise} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="calf">Calf</label>
                            <input type="checkbox" name="calf" checked={input.calf} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="upper_arm">Upper Arm</label>
                            <input type="checkbox" name="upper_arm" checked={input.upper_arm} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="inseam">Inseam</label>
                            <input type="checkbox" name="inseam" checked={input.inseam} onChange={handleChange} />
                        </div>
                        <div className="dresstype-update-checkbox">
                            <label htmlFor="outseam">Outseam</label>
                            <input type="checkbox" name="outseam" checked={input.outseam} onChange={handleChange} />
                        </div>
                        {error.measure && <p>{error.measure}</p>}
                    </div>
                </div>
                <div className="dresstype-update-button-div">
                    <input type="submit" value="Update" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

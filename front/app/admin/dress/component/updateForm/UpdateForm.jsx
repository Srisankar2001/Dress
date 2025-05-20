"use client"
import React, { useEffect, useState, useRef } from 'react'
import "./UpdateForm.css"
import validate from './validation'
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const UpdateForm = ({ id, setUpdateForm }) => {
    const [types, setTypes] = useState([])
    const [input, setInput] = useState({
        name: "",
        type_id: "",
        description: "",
        price: "",
        image: null
    })
    const [oldImageURL, setOldImageURL] = useState("")
    const [error, setError] = useState({
        name: null,
        type_id: null,
        description: null,
        price: null,
        image: null
    })

    const imageInputRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await axiosInstance.get("/dress_type/getAll")
                if (response.data.status) {
                    setTypes(response.data.data)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false,err.response?.data?.message || "Internal Server Error")
                setUpdateForm(false)
            }
        }
        const fetchDress = async () => {
            try {
                const response = await axiosInstance.get(`/dress/get/${id}`)
                if (response.data.status) {
                    setInput({
                        name: response.data.data.name,
                        type_id: response.data.data.type_id,
                        description: response.data.data.description,
                        price: response.data.data.price,
                        image: null
                    })
                    setOldImageURL(`http://localhost:3001/${response.data.data.image}`)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false,err.response?.data?.message || "Internal Server Error")
                setUpdateForm(false)
            }
        }
        fetchTypes()
        fetchDress()
    }, [id])

    const handleImageClick = () => {
        imageInputRef.current.click()
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0]
            if (file && file.type.startsWith("image/")) {
                setInput(prev => ({
                    ...prev,
                    image: file
                }))
                setError(prev => ({ ...prev, image: null }))
            } else {
                setError(prev => ({ ...prev, image: "Please select a valid image file" }))
            }
        } else {
            setInput(prev => ({
                ...prev,
                [name]: value
            }))
        }
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
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                const data = {
                    name: input.name.trim(),
                    description: input.description,
                    price: input.price,
                    type_id: input.type_id,
                    image: input.image
                }
                const response = input.image ? await axiosInstance.put(`/dress/updateWithImage/${id}`, data, config) : await axiosInstance.put(`/dress/updateWithoutImage/${id}`, data)
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
        <div className="dress-update">
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Dress Update Page</h1>
                <div className="dress-update-input-div">
                    <div className="dress-update-input">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={input.name} placeholder="Enter The Name" onChange={handleChange} />
                        {error.name && <p>{error.name}</p>}
                    </div>
                    <div className="dress-update-input">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" value={input.description} placeholder="Enter The Description" onChange={handleChange} />
                        {error.description && <p>{error.description}</p>}
                    </div>
                    <div className="dress-update-input">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" value={input.price} placeholder="Enter The Price" onChange={handleChange} />
                        {error.price && <p>{error.price}</p>}
                    </div>
                    <div className="dress-update-input">
                        <label htmlFor="type_id">Type</label>
                        <select name="type_id" value={input.type_id} onChange={handleChange}>
                            <option value="">Select Type</option>
                            {types.map((type, index) => (
                                <option key={index} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                        {error.type_id && <p>{error.type_id}</p>}
                    </div>

                    <div className="dress-update-input">
                        <label>Picture</label>
                        <img
                            src={
                                input.image
                                    ? URL.createObjectURL(input.image)
                                    : oldImageURL || "/assets/default-img.jpg"
                            }
                            alt="preview"
                            onClick={handleImageClick}
                            className="dress-preview-image"
                            onError={(e) => {
                                e.target.onerror = null
                                e.target.src = "/assets/default-img.jpg"
                            }}
                        />
                        <input
                            type="file"
                            name="image"
                            id="image"
                            hidden
                            ref={imageInputRef}
                            onChange={handleChange}
                            accept="image/*"
                        />
                        {error.image && <p>{error.image}</p>}
                    </div>
                </div>

                <div className="dress-update-button-div">
                    <input type="submit" value="Update" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

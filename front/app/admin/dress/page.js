"use client"

import { useEffect, useState } from "react"
import "./page.css"
import { CreateForm } from "./component/createFrom/CreateForm"
import { UpdateForm } from "./component/updateForm/UpdateForm"
import { DeleteForm } from "./component/deleteForm/DeleteForm"
import axiosInstance from "@/config/axiosConfig"

const page = () => {
    const [createForm, setCreateForm] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [deleteForm, setDeleteForm] = useState(false)
    const [dresses, setDresses] = useState([])

    useEffect(() => {
        const fetchAllDresses = async () => {
            try {
                const response = await axiosInstance.get('/dress/getAll')
                if (response.data.status) {
                    setDresses(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchAllDresses()
    }, [createForm, updateForm, deleteForm])

    const handleCreateForm = () => {
        setCreateForm(true)
    }

    const handleUpdateForm = (id) => {
        setUpdateForm(id)
    }

    const handleDeleteForm = (id) => {
        setDeleteForm(id)
    }

    const renderDresses = () => {
        if (dresses.length === 0) {
            return (
                <tr className="dress-empty">
                    <td colSpan="6">No Dresses Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {dresses.map((item, index) => (
                        <tr key={index}>
                            <td className="image-col">
                                <img
                                    src={`http://localhost:3001/${item.image}`}
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = "/assets/default-img.jpg"
                                    }}
                                    className="dress-image"
                                    alt="Dress"
                                />
                            </td>
                            <td className="small-col">{item.name}</td>
                            <td className="small-col">{item.type_name}</td>
                            <td className="description-col">{item.description}</td>
                            <td className="small-col">{item.price} LKR</td>
                            <td className="dress-action">
                                <input type="button" value="Update" onClick={() => handleUpdateForm(item.id)} />
                                <input type="button" value="Delete" onClick={() => handleDeleteForm(item.id)} />
                            </td>
                        </tr>
                    ))}
                </>
            )
        }
    }

    return (
        <div className="dress-container">
            <div className="dress-nav">
                <h1>Dress Page</h1>
                <input type="button" value="Create" onClick={handleCreateForm} />
            </div>

            {createForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <CreateForm setCreateForm={setCreateForm} />
                    </div>
                </div>
            )}

            {updateForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <UpdateForm id={updateForm} setUpdateForm={setUpdateForm} />
                    </div>
                </div>
            )}

            {deleteForm && (
                <div className="dress-modal-overlay">
                    <div className="dress-modal-content">
                        <DeleteForm id={deleteForm} setDeleteForm={setDeleteForm} />
                    </div>
                </div>
            )}

            <div className="dress-table-container">
                <table>
                    <thead>
                        <tr>
                            <th className="image-col">Image</th>
                            <th className="small-col">Name</th>
                            <th className="small-col">Type</th>
                            <th className="description-col">Description</th>
                            <th className="small-col">Price</th>
                            <th className="dress-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderDresses()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page

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
    const [sizes, setSizes] = useState([])

    useEffect(() => {
        const fetchAllSizes = async () => {
            try {
                const response = await axiosInstance.get('/size/getAll')
                if (response.data.status) {
                    setSizes(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchAllSizes()
    }, [createForm,updateForm,deleteForm])

    const handleCreateForm = () => {
        setCreateForm(true)
    }

    const handleUpdateForm = (id) => {
        setUpdateForm(id)
    }

    const handleDeleteForm = (id) => {
        setDeleteForm(id)
    }

    const renderSizes = () => {
        if (sizes.length === 0) {
            return (
                <tr className="size-empty">
                    <td>No Sizes Avalible</td>
                </tr>
            )
        } else {
            return (
                <>
                    {
                        sizes.map((size, index) => (
                            <tr key={index}>
                                <td>{size.name}</td>
                                <td>{size.shoulder}</td>
                                <td>{size.chest}</td>
                                <td>{size.bust}</td>
                                <td>{size.under_bust}</td>
                                <td>{size.waist}</td>
                                <td>{size.hip}</td>
                                <td>{size.thigh}</td>
                                <td>{size.total_rise}</td>
                                <td>{size.calf}</td>
                                <td>{size.upper_arm}</td>
                                <td>{size.inseam}</td>
                                <td>{size.outseam}</td>
                                <td>{size.height}</td>
                                <td className="size-button-div">
                                    <input type="button" value="Update" onClick={() => handleUpdateForm(size.id)} />
                                    <input type="button" value="Delete" onClick={() => handleDeleteForm(size.id)}/>
                                </td>
                            </tr>
                        ))
                    }
                </>
            )
        }
    }
    return (
        <div className="size-container">
            <div className="size-nav">
                <h1>Size Page</h1>
                <input type="button" value="Create" onClick={handleCreateForm} />
            </div>

            {createForm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <CreateForm setCreateForm={setCreateForm} />
                    </div>
                </div>
            )}

            {updateForm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <UpdateForm id={updateForm} setUpdateForm={setUpdateForm} />
                    </div>
                </div>
            )}

            {deleteForm && (
                <div className="size-modal-overlay">
                    <div className="size-modal-content">
                        <DeleteForm id={deleteForm} setDeleteForm={setDeleteForm} />
                    </div>
                </div>
            )}

            <div className="size-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Shoulder</th>
                            <th>Chest</th>
                            <th>Bust</th>
                            <th>Under Bust</th>
                            <th>Waist</th>
                            <th>Hip</th>
                            <th>Thigh</th>
                            <th>Total Rise</th>
                            <th>Calf</th>
                            <th>Upper Arm</th>
                            <th>Inseam</th>
                            <th>Outseam</th>
                            <th>Height</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderSizes()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page
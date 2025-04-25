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
    const [dressTypes, setDressTypes] = useState([])

    useEffect(() => {
        const fetchAllDressTypes = async () => {
            try {
                const response = await axiosInstance.get('/dress_type/getAll')
                if (response.data.status) {
                    setDressTypes(response.data.data)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchAllDressTypes()
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

    const renderDressTypes = () => {
        if (dressTypes.length === 0) {
            return (
                <tr className="dresstype-empty">
                    <td colSpan="14">No Dress Types Avalible</td>
                </tr>
            )
        } else {
            return (
                <>
                    {
                        dressTypes.map((dressType, index) => (
                            <tr key={index}>
                                <td>{dressType.name}</td>
                                <td><input type="checkbox" checked={dressType.shoulder} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.chest} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.bust} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.under_bust} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.waist} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.hip} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.thigh} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.total_rise} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.calf} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.upper_arm} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.inseam} readOnly /></td>
                                <td><input type="checkbox" checked={dressType.outseam} readOnly /></td>
                                <td className="dresstype-button-div">
                                    <input type="button" value="Update" onClick={() => handleUpdateForm(dressType.id)} />
                                    <input type="button" value="Delete" onClick={() => handleDeleteForm(dressType.id)}/>
                                </td>
                            </tr>
                        ))
                    }
                </>
            )
        }
    }
    return (
        <div className="dresstype-container">
            <div className="dresstype-nav">
                <h1>Dress Type Page</h1>
                <input type="button" value="Create" onClick={handleCreateForm} />
            </div>

            {createForm && (
                <div className="dresstype-modal-overlay">
                    <div className="dresstype-modal-content">
                        <CreateForm setCreateForm={setCreateForm} />
                    </div>
                </div>
            )}

            {updateForm && (
                <div className="dresstype-modal-overlay">
                    <div className="dresstype-modal-content">
                        <UpdateForm id={updateForm} setUpdateForm={setUpdateForm} />
                    </div>
                </div>
            )}

            {deleteForm && (
                <div className="dresstype-modal-overlay">
                    <div className="dresstype-modal-content">
                        <DeleteForm id={deleteForm} setDeleteForm={setDeleteForm} />
                    </div>
                </div>
            )}

            <div className="dresstype-container">
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderDressTypes()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page
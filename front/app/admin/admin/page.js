"use client"

import { useEffect, useState } from "react"
import "./page.css"
import { CreateForm } from "./component/createFrom/CreateForm"
import { UpdateForm } from "./component/updateForm/UpdateForm"
import { DeleteForm } from "./component/deleteForm/DeleteForm"
import axiosInstance from "@/config/axiosConfig"
import showToast from "@/utils/toast"

const page = () => {
    const [createForm, setCreateForm] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [deleteForm, setDeleteForm] = useState(false)
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        const fetchAllAdmins = async () => {
            try {
                const response = await axiosInstance.get('/admin/admin_all')
                if (response.data.status) {
                    setAdmins(response.data.data)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false, err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchAllAdmins()
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

    const renderAdmins = () => {
        if (admins.length === 0) {
            return (
                <tr className="admin-empty">
                    <td colSpan="7">No Admins Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {admins.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td className="admin-action">
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
        <div className="admin-container">
            <div className="admin-nav">
                <h1>Admin Page</h1>
                <input type="button" value="Create" onClick={handleCreateForm} />
            </div>

            {createForm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <CreateForm setCreateForm={setCreateForm} />
                    </div>
                </div>
            )}

            {updateForm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <UpdateForm id={updateForm} setUpdateForm={setUpdateForm} />
                    </div>
                </div>
            )}

            {deleteForm && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <DeleteForm id={deleteForm} setDeleteForm={setDeleteForm} />
                    </div>
                </div>
            )}

            <div className="admin-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th className="admin-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderAdmins()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page

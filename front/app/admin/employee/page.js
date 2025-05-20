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
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const response = await axiosInstance.get('/admin/employee_all')
                if (response.data.status) {
                    setEmployees(response.data.data)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                showToast(false,err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchAllEmployees()
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

    const renderEmployees = () => {
        if (employees.length === 0) {
            return (
                <tr className="employee-empty">
                    <td colSpan="7">No Employees Available</td>
                </tr>
            )
        } else {
            return (
                <>
                    {employees.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td className="employee-action">
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
        <div className="employee-container">
            <div className="employee-nav">
                <h1>Employee Page</h1>
                <input type="button" value="Create" onClick={handleCreateForm} />
            </div>

            {createForm && (
                <div className="employee-modal-overlay">
                    <div className="employee-modal-content">
                        <CreateForm setCreateForm={setCreateForm} />
                    </div>
                </div>
            )}

            {updateForm && (
                <div className="employee-modal-overlay">
                    <div className="employee-modal-content">
                        <UpdateForm id={updateForm} setUpdateForm={setUpdateForm} />
                    </div>
                </div>
            )}

            {deleteForm && (
                <div className="employee-modal-overlay">
                    <div className="employee-modal-content">
                        <DeleteForm id={deleteForm} setDeleteForm={setDeleteForm} />
                    </div>
                </div>
            )}

            <div className="employee-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th className="employee-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderEmployees()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default page

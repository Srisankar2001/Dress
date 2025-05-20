"use client"
import axiosInstance from '@/config/axiosConfig'
import React, { useEffect, useState } from 'react'
import "./AssignForm.css"
import showToast from '@/utils/toast'

export const AssignForm = ({ id, setAssignForm }) => {
    const [input, setInput] = useState("")
    const [error, setError] = useState(null)
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    useEffect(() => {
        const fetchOrderItem = async () => {
            try {
                const response = await axiosInstance.get(`/order_item/admin/${id}`)
                if (response.data.status) {
                    const employee_id = response.data.data.employee_id || ""
                    setInput(employee_id)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error") 
                showToast(false,err.response?.data?.message || "Internal Server Error")
                setAssignForm(false)
            }
        }
        const fetchEmployees = async () => {
            try {
                const response = await axiosInstance.get("/admin/employee_all")
                if (response.data.status) {
                    setEmployees(response.data.data)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                   showToast(false,err.response?.data?.message || "Internal Server Error")
                setAssignForm(false)
            }
        }
        fetchOrderItem()
        fetchEmployees()
    }, [])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleReset = () => {
        setAssignForm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (input) {
            setError(null)
            try {
                const data = {
                    employee_id: input
                }
                const response = await axiosInstance.put(`/order_item/admin/${id}`, data)
                if (response.data.status) {
                    // alert(response.data.message)
                    showToast(true,response.data.message)
                    setAssignForm(false)
                }
            } catch (err) {
                // alert(err.response?.data?.message || "Internal Server Error")
                   showToast(false,err.response?.data?.message || "Internal Server Error")
            }
        } else {
            setError("Please Select An Employee")
        }
    }

    return (
        <div className='assignForm-container'>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <h1>Employee Assignment</h1>
                <div className="assignForm-input">
                    <label htmlFor="input">Employee</label>
                    <select name="input" value={input} onChange={handleChange}>
                        <option value="">Select An Employee</option>
                        {employees.map((employee, index) => (
                            <option key={index} value={employee.id}>{employee.firstname} {employee.lastname}</option>
                        ))}
                    </select>
                    {error && <p>{error}</p>}
                </div>
                <div className="assignForm-button-div">
                    <input type="submit" value="Assign" />
                    <input type="reset" value="Cancel" />
                </div>
            </form>
        </div>
    )
}

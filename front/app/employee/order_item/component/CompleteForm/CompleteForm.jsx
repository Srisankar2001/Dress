"use client"
import React, { useEffect } from 'react'
import "./CompleteForm.css"
import axiosInstance from '@/config/axiosConfig'
import showToast from '@/utils/toast'

export const CompleteForm = ({ id, setCompleteForm }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleReset = () => {
    setCompleteForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.put(`/order_item/employee/complete/${id}`)
      if (response.data.status) {
        // alert(response.data.message)
        showToast(true,response.data.message)
        setCompleteForm(false)
      }
    } catch (err) {
      // alert(err.response?.data?.message || "Internal Server Error")
      showToast(false,err.response?.data?.message || "Internal Server Error")
      setCompleteForm(false)
    }
  }
  return (
    <div className="orderItem-complete-container">
      <div className="orderItem-complete-content">
        <h1>Complete Order</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="orderItem-complete-text">
            <p>Have you completed the order?</p>
          </div>
          <div className="orderItem-complete-button-div">
            <button type="submit">Confirm</button>
            <button type="reset">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

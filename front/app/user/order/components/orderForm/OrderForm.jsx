"use client"

import React, { useEffect, useState } from "react"
import "./OrderForm.css"
import axiosInstance from "@/config/axiosConfig"
import OrderItemStatus from "@/enums/OrderItemStatus"

export const OrderForm = ({ id, setOrderForm }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axiosInstance.get(`/order_item/user/order/${id}`)
        if (response.data.status) {
          setItems(response.data.data)
        }
      } catch (err) {
        // alert(err.response?.data?.message || "Internal Server Error")
         showToast(false,err.response?.data?.message || "Internal Server Error")
        setOrderForm(false)
      }
    }

    fetchOrderItems()
  }, [])

  const handleClose = () => {
    setOrderForm(false)
  }

  const renderOrderItems = () => {
    if (items.length === 0) {
      return (
        <tr className="orderForm-empty">
          <td colSpan="5">No Items Available</td>
        </tr>
      )
    } else {
      return (
        <>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="image-col">
                <img
                  src={`http://localhost:3001/${item.dress_image}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/assets/default-img.jpg"
                  }}
                  className="dress-image"
                  alt={`Dress ${item.dress_name}`}
                />
              </td>
              <td>{item.dress_name}</td>
              <td>{item.price} LKR</td>
              {item.status === OrderItemStatus.NOT_PAID && (
                <td className="orderForm-notPaid">{item.status}</td>
              )}
              {item.status === OrderItemStatus.NOT_ACCEPTED && (
                <td className="orderForm-notAccepted">{item.status}</td>
              )}
              {item.status === OrderItemStatus.ACCEPTED && (
                <td className="orderForm-accepted">{item.status}</td>
              )}
              {item.status === OrderItemStatus.COMPLETED && (
                <td className="orderForm-completed">{item.status}</td>
              )}
              {item.status === OrderItemStatus.CANCELLED && (
                <td className="orderForm-cancelled">{item.status}</td>
              )}
            </tr>
          ))}
        </>
      )
    }
  }

  return (
    <div className="orderForm-container">
      <div className="orderForm-content">
        <h1>Order Items</h1>
        <div className="orderForm-table-container">
          <table aria-label="Order Items List">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{renderOrderItems()}</tbody>
          </table>
        </div>
        <div className="orderForm-btn">
          <input type="button" value="Close" onClick={handleClose} />
        </div>
      </div>
    </div>
  )
}
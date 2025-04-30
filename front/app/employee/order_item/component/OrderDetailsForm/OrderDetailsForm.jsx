"use client"
import React, { useEffect, useState } from 'react'
import "./OrderDetailsForm.css"
import axiosInstance from '@/config/axiosConfig'

export const OrderDetailsForm = ({ id, setOrderDetailsForm }) => {
  const [detail, setDetail] = useState({})

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axiosInstance.get(`/order_item/employee/${id}`)
        if (response.data.status) {
          setDetail(response.data.data)
        }
      } catch (err) {
        alert(err.response?.data?.message || "Internal Server Error")
        setOrderDetailsForm(false)
      }
    }
    fetchDetail()
  }, [])

  const handleReset = () => {
    setOrderDetailsForm(false)
  }

  return (
    <div className="orderItem-details-container">
      <div className="orderItem-details-content">
        <h1>Order Item Details Page</h1>
        <form onReset={handleReset}>
          <div className='orderItem-details-align'>
            <div className='orderItem-details-left'>
              <div className="image-div">
                <img
                  src={`http://localhost:3001/${detail.dress_image}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/assets/default-img.jpg"
                  }}
                  className="dress-image"
                  alt="Dress"
                />
              </div>
              <div className="dress-content">
                <h2>{detail.dress_name}</h2>
                <p>{detail.dress_description}</p>
              </div>
            </div>
            <div className='orderItem-details-right'>
              {detail.shoulder !== null &&
                <div>
                  <label htmlFor="shoulder">Shoulder</label>
                  <input type="number" name="shoulder" value={detail.shoulder || ""} readOnly />
                </div>
              }
              {detail.chest !== null &&
                <div>
                  <label htmlFor="chest">Chest</label>
                  <input type="number" name="chest" value={detail.chest || ""} readOnly />
                </div>
              }
              {detail.bust !== null &&
                <div>
                  <label htmlFor="bust">Bust</label>
                  <input type="number" name="bust" value={detail.bust || ""} readOnly />
                </div>
              }
              {detail.under_bust !== null &&
                <div>
                  <label htmlFor="under_bust">Under Bust</label>
                  <input type="number" name="under_bust" value={detail.under_bust || ""} readOnly />
                </div>
              }
              {detail.waist !== null &&
                <div>
                  <label htmlFor="waist">Waist</label>
                  <input type="number" name="waist" value={detail.waist || ""} readOnly />
                </div>
              }
              {detail.hip !== null &&
                <div>
                  <label htmlFor="hip">Hip</label>
                  <input type="number" name="hip" value={detail.hip || ""} readOnly />
                </div>
              }
              {detail.thigh !== null &&
                <div>
                  <label htmlFor="thigh">Thigh</label>
                  <input type="number" name="thigh" value={detail.thigh || ""} readOnly />
                </div>
              }
              {detail.total_rise !== null &&
                <div>
                  <label htmlFor="total_rise">Total Rise</label>
                  <input type="number" name="total_rise" value={detail.total_rise || ""} readOnly />
                </div>
              }
              {detail.calf !== null &&
                <div>
                  <label htmlFor="calf">Calf</label>
                  <input type="number" name="calf" value={detail.calf || ""} readOnly />
                </div>
              }
              {detail.upper_arm !== null &&
                <div>
                  <label htmlFor="upper_arm">Upper Arm</label>
                  <input type="number" name="upper_arm" value={detail.upper_arm || ""} readOnly />
                </div>
              }
              {detail.inseam !== null &&
                <div>
                  <label htmlFor="inseam">Inseam</label>
                  <input type="number" name="inseam" value={detail.inseam || ""} readOnly />
                </div>
              }
              {detail.outseam !== null &&
                <div>
                  <label htmlFor="outseam">Outseam</label>
                  <input type="number" name="outseam" value={detail.outseam || ""} readOnly />
                </div>
              }
              {detail.height !== null &&
                <div>
                  <label htmlFor="height">Height</label>
                  <input type="number" name="height" value={detail.height || ""} readOnly />
                </div>
              }
            </div>
          </div>
          <div className="orderItem-details-button-div">
            <button type="reset">Close</button>
          </div>
        </form>
      </div>
    </div>
  )
}

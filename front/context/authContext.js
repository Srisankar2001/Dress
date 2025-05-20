"use client"

import axiosInstance from '@/config/axiosConfig';
import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import showToast from '@/utils/toast';

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const router = useRouter()
  const [details, setDetails] = useState([])
  const [isUser, setIsUser] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEmployee, setIsEmployee] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchContext = async () => {
    try {
      const response = await axiosInstance.get("/auth/get")
      if (response.data.status) {
        setDetails(response.data.data)
        const role = response.data.data.role
        setIsAdmin(role === "ADMIN")
        setIsEmployee(role === "EMPLOYEE")
        setIsUser(role === "USER")
      }
    } catch (err) {
      setDetails([])
      setIsAdmin(false)
      setIsEmployee(false)
      setIsUser(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContext()
  }, [])

  const refreshAuth = async () => {
    setLoading(true)
    await fetchContext()
  }

  const logoutFunction = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout")
      if (response.data.status) {
        // alert(response.data.message)
showToast(true,response.data.message)
        setDetails([])
        setIsAdmin(false)
        setIsEmployee(false)
        setIsUser(false)
        router.push("/auth/login")
      }
    } catch (error) {
      // alert(error.response?.data?.message || "Internal Server Error")
      showToast(false,error.response?.data?.message || "Internal Server Error")
    }
  }

  return (
    <AuthContext.Provider value={{ details, isUser, isAdmin, isEmployee, loading, logoutFunction, refreshAuth }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

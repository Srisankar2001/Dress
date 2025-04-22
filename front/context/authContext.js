"use client"

import axiosInstance from '@/config/axiosConfig';
import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [details, setDetails] = useState([])
  const [isUser, setIsUser] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEmployee, setIsEmployee] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  
    fetchContext()
  }, [])
  


  return (
    <AuthContext.Provider value={{ details, isUser, isAdmin, isEmployee, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

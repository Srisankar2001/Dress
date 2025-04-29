"use client"
import axiosInstance from "@/config/axiosConfig"
import { useEffect, useState } from "react"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; import "./page.css"

const page = () => {
    const [total, setTotal] = useState({
        complete: 0,
        cancel: 0
    })
    const [graphData, setGraphData] = useState([])

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await axiosInstance.get('/dashboard/employee')
                if (response.data.status) {
                    const data = response.data.data
                    setTotal({
                        complete: data.totalDetail.complete_sum || 0,
                        cancel: data.totalDetail.cancel_sum || 0
                    })

                    const arr = data.graphData.map(item => ({
                        date: item.date,
                        complete: item.complete,
                        cancel: item.cancel
                    }))

                    setGraphData(arr)
                }
            } catch (err) {
                alert(err.response?.data?.message || "Internal Server Error")
            }
        }
        fetchDashboard()
    }, [])

    return (
        <div className="employee-dashboard-container">
            <div className="employee-dashboard-title">
                <h1>Employee Dashboard</h1>
            </div>
            <div className="employee-dashboard-total">
                <div>
                    <h2>Completed Orders</h2>
                    <h1>{total.complete}</h1>
                </div>
                <div>
                    <h2>Cancelled Orders</h2>
                    <h1>{total.cancel}</h1>
                </div>
            </div>
            <div className="employee-dashboard-graph" style={{ height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={graphData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="complete" fill="#28a745" activeBar={<Rectangle fill="#34d058" stroke="#1e7e34" />} />
                        <Bar dataKey="cancel" fill="#dc3545" activeBar={<Rectangle fill="#ff6b6b" stroke="#bd2130" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default page
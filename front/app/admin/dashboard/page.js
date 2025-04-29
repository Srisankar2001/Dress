"use client"
import axiosInstance from "@/config/axiosConfig"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import "./page.css"

const page = () => {
  const [totalDetail, setTotalDetail] = useState({
    total_orders: 0,
    cancelled_orders: 0,
    total_price: 0,
    cancelled_price: 0,
    total_dresses: 0,
    cancelled_dresses: 0
  })
  const [employeeData, setEmployeeData] = useState([])
  const [user, setUser] = useState(0)
  const [employee, setEmployee] = useState(0)
  const [admin, setAdmin] = useState(0)
  const [graphData, setGraphData] = useState([])

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axiosInstance.get('/dashboard/admin')
        if (response.data.status) {
          const data = response.data.data
          setTotalDetail({
            total_orders: data.totalDetail.total_orders_sum || 0,
            cancelled_orders: data.totalDetail.cancelled_orders_sum || 0,
            total_dresses: data.totalDetail.total_dresses_sum || 0,
            cancelled_dresses: data.totalDetail.cancelled_dresses_sum || 0,
            total_price: data.totalDetail.total_price_sum || 0,
            cancelled_price: data.totalDetail.cancelled_price_sum || 0
          })
          setEmployeeData(data.employeeData || [])

          const roleCount = data.roleCount
          roleCount.forEach(({ role, count }) => {
            if (role === 'USER') setUser(count);
            else if (role === 'ADMIN') setAdmin(count);
            else if (role === 'EMPLOYEE') setEmployee(count);
          })

          const arr = data.graphData.map(item => ({
            date: item.date,
            order: item.total_orders,
            cancel: item.cancelled_orders
          }))

          console.log(arr)

          setGraphData(arr)
        }
      } catch (err) {
        alert(err.response?.data?.message || "Internal Server Error")
      }
    }
    fetchDashboard()
  }, [])

  const renderEmployee = () => {
    if (employeeData.length === 0) {
      return (
        <tr className="admin-dashboard-employee-empty">
          <td colSpan="5">No Data Avalible</td>
        </tr>
      )
    } else {
      return employeeData.map((employee, index) => (
        <tr key={index} className="admin-dashboard-employee-div">
          <td>{employee.employee_id}</td>
          <td>{employee.employee_firstname}</td>
          <td>{employee.employee_lastname}</td>
          <td>{employee.complete_sum}</td>
          <td>{employee.cancel_sum}</td>
        </tr>
      ))
    }
  }
  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-title">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="admin-dashboard-total">
        <div>
          <h2>Orders</h2>
          <h1>{Number(totalDetail.total_orders) - Number(totalDetail.cancelled_dresses)}</h1>
        </div>
        <div>
          <h2>Income</h2>
          <h1>{(Number(totalDetail.total_price) - Number(totalDetail.cancelled_price)).toFixed(2)} LKR</h1>
        </div>
        <div>
          <h2>Dresses Sold</h2>
          <h1>{Number(totalDetail.total_dresses) - Number(totalDetail.cancelled_dresses)}</h1>
        </div>
      </div>
      <div className="admin-dashboard-role">
        <div>
          <h2>Admin</h2>
          <h1>{admin}</h1>
        </div>
        <div>
          <h2>Employee</h2>
          <h1>{employee}</h1>
        </div>
        <div>
          <h2>User</h2>
          <h1>{user}</h1>
        </div>
      </div>
      <div className="admin-dashboard-graphAndEmployee">
        <div className="admin-dashboard-graph" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
              <Line type="monotone" dataKey="order" stroke="#28a745" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="cancel" stroke="#dc3545" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <table className="admin-dashboard-employee">
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Completed</th>
              <th>Cancelled</th>
            </tr>
          </thead>
          <tbody>
            {renderEmployee()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
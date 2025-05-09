const db = require("../DB/db")

const getAdminDashboard = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const [rowTotalOrders] = await db.promise().execute("SELECT SUM(total_orders) AS total_orders_sum, SUM(cancelled_orders) AS cancelled_orders_sum, SUM(total_price) AS total_price_sum, SUM(cancelled_price) AS cancelled_price_sum, SUM(total_dresses) AS total_dresses_sum, SUM(cancelled_dresses) AS cancelled_dresses_sum FROM `order_stats`")
        const [rowTotalUsers] = await db.promise().execute("SELECT role, COUNT(*) as count FROM `user` WHERE is_deleted = 0 GROUP BY role")

        const today = new Date()
        const formattedToday = today.toISOString().split('T')[0]
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(today.getDate() - 8)
        const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0]
        // const [rowOrderGraph] = await db.promise().execute("SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date, total_orders, cancelled_orders FROM order_stats WHERE date >= ? AND date < ? ORDER BY date ASC", [formattedSevenDaysAgo, formattedToday])

        const [rowOrderGraph] = await db.promise().execute(
            ` WITH RECURSIVE date_series AS (
              SELECT DATE(?) AS date
              UNION ALL
              SELECT DATE_ADD(date, INTERVAL 1 DAY)
              FROM date_series
              WHERE date < DATE_SUB(?, INTERVAL 1 DAY)
            )
            SELECT 
              DATE_FORMAT(ds.date, '%Y-%m-%d') AS date,
              IFNULL(os.total_orders, 0) AS total_orders,
              IFNULL(os.cancelled_orders, 0) AS cancelled_orders
            FROM date_series ds
            LEFT JOIN order_stats os ON os.date = ds.date
            ORDER BY ds.date ASC `, [formattedSevenDaysAgo, formattedToday])

        const [rowTopEmployees] = await db.promise().execute("SELECT e.id AS employee_id , e.firstname AS employee_firstname, e.lastname AS employee_lastname, SUM(o.complete) AS complete_sum, SUM(o.cancel) AS cancel_sum FROM `employee_stats` o JOIN `user` e ON o.employee_id = e.id WHERE e.role = 'EMPLOYEE' GROUP BY e.id ORDER BY complete_sum DESC LIMIT 5")

        const data = {
            totalDetail: rowTotalOrders[0],
            roleCount: rowTotalUsers,
            graphData: rowOrderGraph,
            employeeData: rowTopEmployees
        }

        return res.status(200).json({ status: true, message: "All Data Fetched Successfully", data: data })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getEmployeeDashboard = async (req, res) => {
    const user_id = req.user_id

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'EMPLOYEE' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Employee Not Found" })
        }

        const [rowTotal] = await db.promise().execute("SELECT SUM(complete) AS complete_sum, SUM(cancel) AS cancel_sum FROM `employee_stats` WHERE employee_id = ?", [user_id])

        const today = new Date()
        const formattedToday = today.toISOString().split('T')[0]
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(today.getDate() - 8)
        const formattedSevenDaysAgo = sevenDaysAgo.toISOString().split('T')[0]
        // const [rowGraph] = await db.promise().execute("SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date, complete, cancel FROM `employee_stats` WHERE employee_id = ? AND date >= ? AND date < ? ORDER BY date ASC", [user_id,formattedSevenDaysAgo, formattedToday])

        const [rowGraph] = await db.promise().execute(
            ` WITH RECURSIVE date_series AS (
              SELECT DATE(?) AS date
              UNION ALL
              SELECT DATE_ADD(date, INTERVAL 1 DAY)
              FROM date_series
              WHERE date < DATE_SUB(?, INTERVAL 1 DAY)
            )
            SELECT 
              DATE_FORMAT(ds.date, '%Y-%m-%d') AS date,
              IFNULL(es.complete, 0) AS complete,
              IFNULL(es.cancel, 0) AS cancel
            FROM date_series ds
            LEFT JOIN employee_stats es 
              ON es.date = ds.date AND es.employee_id = ?
            ORDER BY ds.date ASC `, [formattedSevenDaysAgo, formattedToday, user_id])

        const data = {
            totalDetail: rowTotal[0],
            graphData: rowGraph
        }

        return res.status(200).json({ status: true, message: "All Data Fetched Successfully", data: data })
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getReport = async (req, res) => {
    const { startDate, endDate } = req.body
    const user_id = req.user_id

    if (!startDate || !endDate) {
        return res.status(400).json({ status: false, message: "Input All Necessary Data" })
    }

    if (!user_id) {
        return res.status(400).json({ status: false, message: "ID is required" })
    }

    try {
        const [rowIsUserExist] = await db.promise().execute("SELECT * FROM user WHERE id = ? AND role = 'ADMIN' AND is_deleted = 0", [user_id])
        if (rowIsUserExist.length === 0) {
            return res.status(400).json({ status: false, message: "Admin Not Found" })
        }

        const query = ` SELECT 
        d.id AS dress_id, d.name, d.price, COUNT(oi.dress_id) AS total_sold
        FROM dress d JOIN order_item oi ON d.id = oi.dress_id JOIN \`order\` o ON oi.order_id = o.id JOIN payment p ON p.order_id = o.id
        WHERE p.created_at BETWEEN ? AND ? AND p.refund = 0
        GROUP BY d.id, d.name, d.image, d.description, d.price
        ORDER BY total_sold DESC; `
        const [row] = await db.promise().execute(query,[startDate,endDate])
        return res.status(200).json({ status: true, message: "All Data Fetched Successfully", data: row })

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}


const dashboardController = {
    getAdminDashboard,
    getEmployeeDashboard,
    getReport
}

module.exports = dashboardController
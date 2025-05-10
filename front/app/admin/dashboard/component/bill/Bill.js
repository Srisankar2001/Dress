import React, { useEffect } from "react";
import "./Bill.css";

const Bill = ({ startDate, endDate, data, setBill }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    const handlePrint = () => {
        window.print()
    }

    const getCurrentTime = () => new Date().toTimeString().split(' ')[0];

    const total = Array.isArray(data) ? data.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const totalSold = Number(item.total_sold) || 0;
        return sum + price * totalSold;
    }, 0) : 0;

    const renderData = () => {
        if (!Array.isArray(data) || data.length === 0) {
            return (
                <tr className="bill_table_data_row">
                    <td className="bill_table_data" colSpan="5">No Data Available</td>
                </tr>
            );
        }
        return data.map(item => {
            const price = Number(item.price) || 0;
            const totalSold = Number(item.total_sold) || 0;
            return (
                <tr className="bill_table_data_row" key={item.dress_id}>
                    <td className="bill_table_data">{item.dress_id}</td>
                    <td className="bill_table_data">{item.name}</td>
                    <td className="bill_table_data">{price.toFixed(2)} LKR</td>
                    <td className="bill_table_data">{totalSold}</td>
                    <td className="bill_table_data">{(price * totalSold).toFixed(2)} LKR</td>
                </tr>
            );
        });
    };

    return (
        <div className="bill_container">
            <div className="bill_content">
                <div className="bill_heading">
                    <span className="bill_heading_name">ERMINE</span>
                    <span className="bill_heading_address">No 87, Main street, Kinniya, Trincomalee</span>
                    <span className="bill_heading_phone">Tel No : +94 77 307 4612</span>
                </div>
                <div className="bill_detail">
                    <span className="bill_detail_date">Date: {new Date().toISOString().split('T')[0]}</span>
                    <span className="bill_detail_time">Time: {getCurrentTime()}</span>
                </div>
                <table className="bill_table">
                    <thead>
                        <tr className="bill_table_head_row">
                            <th className="bill_table_head">ID</th>
                            <th className="bill_table_head">Name</th>
                            <th className="bill_table_head">Price</th>
                            <th className="bill_table_head">Qty</th>
                            <th className="bill_table_head">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderData()}
                    </tbody>
                </table>
                <div className="bill_data_main_div">
                    <div className="bill_data_div">
                        <span className="bill_data_label">Start Date:</span>
                        <span className="bill_data_value">{startDate}</span>
                    </div>
                    <div className="bill_data_div">
                        <span className="bill_data_label">End Date:</span>
                        <span className="bill_data_value">{endDate}</span>
                    </div>
                    <div className="bill_data_div">
                        <span className="bill_data_label">Total:</span>
                        <span className="bill_data_value">{total.toFixed(2)} LKR</span>
                    </div>
                </div>
                <div className="bill_footer">
                    <span className="bill_footer_line">&#169; All Rights Reserved To ERMINE</span>
                </div>
            </div>
            <div className="bill_button_div">
                <button onClick={handlePrint} className="bill_btn">Print</button>
                <button onClick={() => setBill(null)} className="bill_btn bill_btn_cancel">Close</button>
            </div>
        </div>
    );
};

export default Bill;
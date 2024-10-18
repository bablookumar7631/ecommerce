import React, { useState, useEffect } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import StatePieChart from "./charts/pieCharts/StatePieChart";
import CategoryPieChart from "./charts/pieCharts/CategoryPieChart";
import MonthlySale from "./charts/lineCharts/MonthlySale";
import axios from 'axios';

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);


  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/users/total-customers', {
      headers: {
        'Content-Type': 'application/json'
        },
        withCredentials: true,
    })
    .then(res => setTotalCustomers(res.data.totalCustomers));

    axios.get('http://localhost:8000/api/v1/payments/total-orders', {
      headers: {
        'Content-Type': 'application/json'
        },
        withCredentials: true,
    })
    .then(res => setTotalOrders(res.data.totalOrders));

    axios.get('http://localhost:8000/api/v1/products/total-products', {
      headers: {
        'Content-Type': 'application/json'
        },
        withCredentials: true,
    })
    .then(res => setTotalProducts(res.data.totalProducts));

    axios.get('http://localhost:8000/api/v1/payments/total-revenue', {
      headers: {
        'Content-Type': 'application/json'
        },
        withCredentials: true,
    })
    .then(res => setTotalRevenue(res.data.totalRevenue));
  },[]);

  return (
    <div className="flex flex-col justify-center items-center mt-8 mb-10">
      <div className="w-8/12 flex justify-between">
        <div className="bg-green-100 px-5 py-2 rounded">
          <div className="flex gap-1">
            <StackedLineChartIcon />
            <h1>Total Revenue</h1>
          </div>
          <p className="font-bold text-lg">₹{totalRevenue}</p>
        </div>

        <div className="bg-pink-100 px-5 py-2 rounded">
          <div className="flex gap-1">
            <GroupIcon />
            <h1>Total Customers</h1>
          </div>
          <p className="font-bold text-lg">{totalCustomers}</p>
        </div>

        <div className="bg-blue-100 px-5 py-2 rounded">
          <div className="flex gap-1">
            <ShoppingCartOutlinedIcon />
            <h1>Total Orders</h1>
          </div>
          <p className="font-bold text-lg">{totalOrders}</p>
        </div>

        <div className="bg-yellow-100 px-5 py-2 rounded">
          <div className="flex gap-1">
            <StorefrontIcon />
            <h1>Total Products</h1>
          </div>
          <p className="font-bold text-lg">{totalProducts}</p>
        </div>
      </div>

      <div className="w-8/12 flex justify-between mt-8 p-5 border border-black rounded">
        <StatePieChart />
        <CategoryPieChart />
      </div>

      <div className="w-8/12 border border-black rounded mt-8">
        <MonthlySale/>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import api from "../api/axios.js";
import StatCard from "../components/StatCard.jsx";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [weekly, setWeekly] = useState([]);

  // Component load hote hi teeno APIs ek saath call karte hain
  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, salesRes, weeklyRes] = await Promise.all([
        api.get("/products"),
        api.get("/sales"),
        api.get("/sales/weekly"),
      ]);
      setProducts(productsRes.data);
      setSales(salesRes.data);
      setWeekly(weeklyRes.data);
    };
    fetchData();
  }, []);

  // Aaj ki sale nikalna (front-end par simple calculation)
  const today = new Date().toISOString().split("T")[0];
  const todaySales = sales
    .filter((s) => s.createdAt.startsWith(today))
    .reduce((sum, s) => sum + s.total, 0);

  const lowStockCount = products.filter((p) => p.quantity <= p.lowStockLimit).length;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Today's Sales" value={`₹${todaySales}`} icon="💰" />
        <StatCard label="Total Orders" value={sales.length} icon="🧾" />
        <StatCard label="Products" value={products.length} icon="📦" />
        <StatCard label="Low Stock" value={lowStockCount} icon="⚠️" color="red" />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h3 className="font-medium mb-4">Sales - Last 7 Days</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={weekly}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

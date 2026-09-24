import React from "react";
import { NavLink } from "react-router-dom";

// Ye component sirf navigation links dikhata hai. NavLink automatically
// "active" class laga deta hai jis page par hum currently hain.
const linkClass = ({ isActive }) =>
  `block px-4 py-2 rounded-lg mb-1 ${
    isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-50"
  }`;

const Sidebar = () => {
  return (
    <aside className="w-56 bg-white border-r min-h-screen p-4">
      <h1 className="text-xl font-bold text-indigo-600 mb-6">🤖 Business OS</h1>
      <nav>
        <NavLink to="/" end className={linkClass}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          📦 Products
        </NavLink>
        <NavLink to="/sales" className={linkClass}>
          🧾 Sales
        </NavLink>
        <NavLink to="/customers" className={linkClass}>
          👥 Customers
        </NavLink>
        <NavLink to="/ai" className={linkClass}>
          💬 AI Assistant
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

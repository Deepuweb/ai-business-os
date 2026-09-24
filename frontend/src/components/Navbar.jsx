import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white border-b px-6 py-3">
      <p className="text-gray-600">
        👋 Hello, <span className="font-semibold">{user?.name}</span> ({user?.businessName})
      </p>
      <button
        onClick={handleLogout}
        className="text-sm bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

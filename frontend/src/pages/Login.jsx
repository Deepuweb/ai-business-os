import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload rokne ke liye (default form behaviour)
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data); // AuthContext mein user save karo
      navigate("/"); // Dashboard par bhej do
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm w-96">
        <h1 className="text-2xl font-bold text-indigo-600 mb-1">🤖 AI Business OS</h1>
        <p className="text-gray-500 text-sm mb-6">Login to your business dashboard</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-4"
          required
        />

        <label className="text-sm text-gray-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mt-1 mb-6"
          required
        />

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          Login
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          New business?{" "}
          <Link to="/register" className="text-indigo-600 font-medium">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

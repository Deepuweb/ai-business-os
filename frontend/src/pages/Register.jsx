import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const [form, setForm] = useState({ businessName: "", name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Ek hi function saare inputs handle kar leta hai - "name" attribute
  // ke through pata chalta hai kaunsa field update karna hai
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm w-96">
        <h1 className="text-2xl font-bold text-indigo-600 mb-1">🤖 AI Business OS</h1>
        <p className="text-gray-500 text-sm mb-6">Create your business account</p>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {[
          { label: "Business Name", name: "businessName", type: "text" },
          { label: "Your Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label className="text-sm text-gray-600">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1"
              required
            />
          </div>
        ))}

        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 mt-2">
          Register
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

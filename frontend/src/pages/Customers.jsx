import React, { useEffect, useState } from "react";
import api from "../api/axios.js";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "" });

  const loadCustomers = async () => {
    const { data } = await api.get("/customers");
    setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post("/customers", form);
    setForm({ name: "", phone: "" });
    loadCustomers();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Customers</h2>

      <form onSubmit={handleAdd} className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-3">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Customer name"
          className="border rounded-lg px-3 py-2 flex-1"
          required
        />
        <input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone number"
          className="border rounded-lg px-3 py-2 flex-1"
        />
        <button className="bg-indigo-600 text-white rounded-lg px-4 py-2">Add Customer</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {customers.map((c) => (
          <div key={c._id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <p className="font-medium">{c.name}</p>
            <p className="text-gray-500 text-sm">{c.phone || "No phone number"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;

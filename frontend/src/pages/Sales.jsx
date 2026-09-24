import React, { useEffect, useState } from "react";
import api from "../api/axios.js";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [form, setForm] = useState({ productId: "", customerId: "", quantity: 1 });
  const [error, setError] = useState("");

  const loadAll = async () => {
    const [productsRes, customersRes, salesRes] = await Promise.all([
      api.get("/products"),
      api.get("/customers"),
      api.get("/sales"),
    ]);
    setProducts(productsRes.data);
    setCustomers(customersRes.data);
    setSales(salesRes.data);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreateSale = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/sales", form);
      setForm({ productId: "", customerId: "", quantity: 1 });
      loadAll(); // sale list + product stock dono refresh honge
    } catch (err) {
      setError(err.response?.data?.message || "Could not create sale");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Sales</h2>

      <form onSubmit={handleCreateSale} className="bg-white p-4 rounded-xl shadow-sm mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <select name="productId" value={form.productId} onChange={handleChange} className="border rounded-lg px-3 py-2" required>
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.quantity} {p.unit} left)
            </option>
          ))}
        </select>

        <select name="customerId" value={form.customerId} onChange={handleChange} className="border rounded-lg px-3 py-2">
          <option value="">Walk-in Customer</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} className="border rounded-lg px-3 py-2" required />

        <button className="bg-indigo-600 text-white rounded-lg px-4 py-2">Create Sale</button>
      </form>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-3 font-medium">{s.productName}</td>
                <td className="p-3">{s.quantity}</td>
                <td className="p-3">₹{s.total}</td>
                <td className="p-3">{s.paymentStatus}</td>
                <td className="p-3">{new Date(s.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;

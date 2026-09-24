import React, { useEffect, useState } from "react";
import api from "../api/axios.js";

const emptyForm = { name: "", category: "", price: "", quantity: "", unit: "pcs", lowStockLimit: "" };

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const loadProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post("/products", form);
    setForm(emptyForm);
    loadProducts(); // list refresh karo
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  // Stock ke hisaab se status badge decide karta hai
  const getStatus = (p) => {
    if (p.quantity <= 0) return { label: "🔴 Out of Stock", color: "text-red-600" };
    if (p.quantity <= p.lowStockLimit) return { label: "🟡 Low", color: "text-yellow-600" };
    return { label: "🟢 Available", color: "text-green-600" };
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Products & Inventory</h2>

      {/* Add product form */}
      <form onSubmit={handleAdd} className="bg-white p-4 rounded-xl shadow-sm mb-6 grid grid-cols-2 md:grid-cols-6 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" className="border rounded-lg px-3 py-2 col-span-2" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border rounded-lg px-3 py-2" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price ₹" type="number" className="border rounded-lg px-3 py-2" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" className="border rounded-lg px-3 py-2" required />
        <input name="lowStockLimit" value={form.lowStockLimit} onChange={handleChange} placeholder="Low stock limit" type="number" className="border rounded-lg px-3 py-2" />
        <button className="bg-indigo-600 text-white rounded-lg px-4 py-2 col-span-2 md:col-span-1">
          Add Product
        </button>
      </form>

      {/* Products table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const status = getStatus(p);
              return (
                <tr key={p._id} className="border-t">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">
                    {p.quantity} {p.unit}
                  </td>
                  <td className={`p-3 ${status.color}`}>{status.label}</td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

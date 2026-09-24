import express from "express";
import Product from "../models/Product.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// Har route ke aage "protect" middleware laga hai - matlab bina login
// (bina valid token ke) koi bhi ye routes use nahi kar sakta.

// @route  GET /api/products
// @desc   Sirf isi owner ke saare products list karo
router.get("/", protect, async (req, res) => {
  const products = await Product.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(products);
});

// @route  POST /api/products
// @desc   Naya product add karo
router.post("/", protect, async (req, res) => {
  try {
    const { name, category, price, quantity, unit, lowStockLimit } = req.body;
    const product = await Product.create({
      owner: req.userId,
      name,
      category,
      price,
      quantity,
      unit,
      lowStockLimit,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  PUT /api/products/:id
// @desc   Product update karo (jaise price ya quantity change karna)
router.put("/:id", protect, async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    req.body,
    { new: true }
  );
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// @route  DELETE /api/products/:id
router.delete("/:id", protect, async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
});

export default router;

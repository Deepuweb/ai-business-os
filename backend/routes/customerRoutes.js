import express from "express";
import Customer from "../models/Customer.js";
import Sale from "../models/Sale.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// @route  GET /api/customers
router.get("/", protect, async (req, res) => {
  const customers = await Customer.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(customers);
});

// @route  POST /api/customers
router.post("/", protect, async (req, res) => {
  const { name, phone } = req.body;
  const customer = await Customer.create({ owner: req.userId, name, phone });
  res.status(201).json(customer);
});

// @route  GET /api/customers/:id/orders
// @desc   Ek customer ke saare purchase orders dikhao
router.get("/:id/orders", protect, async (req, res) => {
  const orders = await Sale.find({ owner: req.userId, customer: req.params.id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

export default router;

import express from "express";
import Sale from "../models/Sale.js";
import Product from "../models/Product.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// @route  POST /api/sales
// @desc   Nayi sale banao. Ye sabse important part hai:
//         1. Product dhoondo
//         2. Check karo enough stock hai ya nahi
//         3. Sale record save karo
//         4. Product ki quantity kam kardo (inventory auto-update)
router.post("/", protect, async (req, res) => {
  try {
    const { productId, customerId, quantity, paymentStatus } = req.body;

    const product = await Product.findOne({ _id: productId, owner: req.userId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const total = product.price * quantity;

    const sale = await Sale.create({
      owner: req.userId,
      customer: customerId || undefined,
      product: product._id,
      productName: product.name,
      quantity,
      price: product.price,
      total,
      paymentStatus: paymentStatus || "Paid",
    });

    // Yahi hai woh "automatic inventory update" jiska document mein zikr tha
    product.quantity -= quantity;
    await product.save();

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route  GET /api/sales
router.get("/", protect, async (req, res) => {
  const sales = await Sale.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(sales);
});

// @route  GET /api/sales/weekly
// @desc   Pichle 7 din ki daily sales - Recharts graph ke liye
router.get("/weekly", protect, async (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const sales = await Sale.find({ owner: req.userId, createdAt: { $gte: sevenDaysAgo } });

  // Date ke hisaab se group karke total nikalna
  const grouped = {};
  sales.forEach((sale) => {
    const day = sale.createdAt.toISOString().split("T")[0];
    grouped[day] = (grouped[day] || 0) + sale.total;
  });

  const result = Object.keys(grouped)
    .sort()
    .map((day) => ({ date: day, sales: grouped[day] }));

  res.json(result);
});

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config(); // .env file se variables load karo (MONGO_URI, JWT_SECRET etc)

const app = express();

app.use(cors()); // frontend (alag port/domain) se request accept karne ke liye
app.use(express.json()); // incoming JSON body ko parse karne ke liye

connectDB(); // MongoDB se connect karo

// Saare routes yahan register hote hain
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("AI Business OS backend is running ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

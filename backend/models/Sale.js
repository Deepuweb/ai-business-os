import mongoose from "mongoose";

// Ek Sale = ek transaction. Jab owner "Create Sale" karega, ek entry yahan
// save hogi aur us product ka stock automatically kam ho jayega
// (ye logic routes/saleRoutes.js mein hai).
const saleSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true }, // history ke liye copy rakha
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // per unit price at sale time
    total: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Paid", "Pending"], default: "Paid" },
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);

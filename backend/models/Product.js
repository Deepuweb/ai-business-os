import mongoose from "mongoose";

// Har product ek business (owner) ke andar aata hai, isliye "owner" field
// rakha hai - taaki alag-alag businesses ka data mix na ho.
const productSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String, default: "General" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    unit: { type: String, default: "pcs" }, // kg, packet, pcs, litre etc
    lowStockLimit: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

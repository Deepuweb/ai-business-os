import mongoose from "mongoose";

// Ye "User" business owner hai (jaise Ramesh ji), jo login karke apna
// dashboard access karega.
const userSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // bcrypt se hashed store hoga
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);

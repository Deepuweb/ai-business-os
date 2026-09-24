import mongoose from "mongoose";

// Ye function MongoDB se connection banata hai.
// server.js isse call karega jab app start hoga.
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // agar DB connect na ho to server band kar do
  }
};

export default connectDB;

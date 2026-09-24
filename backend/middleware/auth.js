import jwt from "jsonwebtoken";

// Ye middleware har protected route se pehle chalta hai.
// Frontend request ke header mein "Authorization: Bearer <token>" bhejta hai.
// Hum us token ko verify karte hain aur owner ki id req.userId mein daal dete hain.
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next(); // sab sahi hai, aage badho
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export default protect;

import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

import express from "express";
import { checkIn, getEmployeeHistory } from "../controllers/history.js ";

const router = express.Router();

// Check-in route
router.post("/:id", checkIn);
// Get employee history route
router.get("/:id", getEmployeeHistory);

export default router;
import express from "express";
import {checkIn, getEmployeeHistory , getAllEmployeeHistory, getAllHistory } from "../controllers/history.js";

const router = express.Router();

// Check-in route
router.post("/employee/:id", checkIn);
// Get employee history route
router.get("/employee/:id", getEmployeeHistory);
// Get all employee history route (add the new route)
router.get("/history", getAllEmployeeHistory);
// Get all histories
router.get("/history/all", getAllHistory);
export default router;
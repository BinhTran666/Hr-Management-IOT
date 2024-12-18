import { History } from "../models/history.js";
import { Employee } from "../models/employee.js";

// Employee Check-in
export const checkIn = async (req, res) => {
  try {
    const employeeId = req.params.id; // Get employee ID from route parameter

    // Check if the employee exists using employee_id
    const employee = await Employee.findOne({ employee_id: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Create a new check-in record (always create a new one)
    const historyEntry = new History({
      employeeId: employee.employee_id, // Use employee_id
      checkInTime: Date.now(), // Set check-in time explicitly
    });
    await historyEntry.save();

    res
      .status(200)
      .json({ message: "Check-in successful", history: historyEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get history for an employee
export const getEmployeeHistory = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Find history using employee_id
    const history = await History.find({ employeeId: employeeId }).sort({
      checkInTime: -1,
    }); // Sort by check-in time descending

    if (!history || history.length === 0) {
      return res
        .status(404)
        .json({ message: "No history found for this employee" });
    }

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
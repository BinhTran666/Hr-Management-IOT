import { History } from "../models/history.js";
import { Employee } from "../models/employee.js";
import { sendCheckInEmail } from "../mailtrap/emails.js";
import { dateFormat } from "../utils/dateFormat.js";
import { sendTelegramMessage } from "../mobilephone/mobilephone.js";

// Employee Check-in
export const checkIn = async (req, res) => {
  try {
    const employeeId = req.params.id; // Get employee ID from route parameter

    // Check if the employee exists using employee_id
    const employee = await Employee.findOne({ employee_id: employeeId });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const checkInTime = Date.now(); // Set check-in time explicitly
    // Create a new check-in record (always create a new one)
    const historyEntry = new History({
      employeeId: employee.employee_id, // Use employee_id
      checkInTime: checkInTime, // Set check-in time explicitly
    });
    await historyEntry.save();

    // Send check-in email to employee
    await sendCheckInEmail("tranducbinh2004@gmail.com", dateFormat(checkInTime));// use my own email for testing purpose for mailtrap only
    await sendTelegramMessage(`${employee.name} checked in at ${dateFormat(checkInTime)}`);

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

// Get history and employee of that history for all employees
export const getAllEmployeeHistory = async (req, res) => {
  try {
    const history = await History.find({}).sort({ checkInTime: -1 }).lean(); // Use lean() for plain JavaScript objects

    // Get unique employee IDs from history
    const uniqueEmployeeIds = [
      ...new Set(history.map((entry) => entry.employeeId.toString())),
    ]; // Extract and ensure unique IDs

    // Find corresponding employees
    const employees = await Employee.find({
      employee_id: { $in: uniqueEmployeeIds },
    });

    // Create a map of employee_id to employee object for efficient lookup
    const employeeMap = {};
    employees.forEach((employee) => {
      employeeMap[employee.employee_id] = employee;
    });

    // Join history with employee data
    const joinedHistory = history.map((entry) => ({
      ...entry,
      employee: employeeMap[entry.employeeId], // Add employee details to each entry
    }));

    res.status(200).json(joinedHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllHistory = async (req, res) => {
  try {
    const history = await History.find({}).sort({ checkInTime: -1 }).lean();
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

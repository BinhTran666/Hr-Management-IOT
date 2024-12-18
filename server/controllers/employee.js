import { Employee } from "../models/employee.js";
import bcryptjs from "bcryptjs";

// Create a new employee
export const createEmployee = async (req, res) => {
  try {
    // Extract specific fields from req.body
    const { email, password, name, gender, role } = req.body;

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    const lastEmployee = await Employee.findOne({}, { employee_id: 1 })
      .sort({ employee_id: -1 })
      .exec();

    let nextId;
    if (lastEmployee && !isNaN(lastEmployee.employee_id)) {
      nextId = lastEmployee.employee_id + 1;
    } else {
      nextId = 22127000; // Start from the beginning of the range
    }

    if (nextId > 22127999) {
      return res
        .status(400)
        .json({ error: "Maximum employee ID limit reached." });
    }
    // Create a new employee object with the extracted fields
    const employee = new Employee({
      employee_id: nextId, 
      email,
      password: hashedPassword,
      name,
      gender,
      role,
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all employees (no change needed)
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).select("-password");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employee by ID (no change needed)
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select("-password");
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee
export const updateEmployee = async (req, res) => {
  try {
    // Extract specific fields from req.body for update
    const { email, password, name, role } = req.body;

    // Find and update the employee with the extracted fields
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        email,
        password,
        ID_Employee,
        name,
        role,
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the updated data
      }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an employee (no change needed)
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

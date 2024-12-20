import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Employee = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "", // Remember: Hash on the backend!
    gender: "Other",
    role: "Fresher",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form fields when closing
    setNewEmployee({
      employee_id: "",
      name: "",
      email: "",
      password: "",
      gender: "Other",
      role: "Fresher",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEmployee = async () => {
    try {
      // Add validation here if needed

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/employee`,
        newEmployee
      );

      // Assuming successful creation, close the dialog and update the employee list
      handleCloseDialog();
      // You might want to fetch the updated employee list here or add the new employee to the existing list
      console.log("Employee created:", response.data);
    } catch (error) {
      console.error("Error creating employee:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  //for columns in data grid
  const columns = [
    { field: "employee_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.charAt(0).toUpperCase() + params.value.slice(1);
      },
    },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/employee`
        ); // Send to endpoint to fetch employees
        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle the error appropriately, e.g., display an error message to the user
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between">
        <Header title="EMPLOYEES" subtitle="List of Eployees" />
        <Button
          sx={{
            backgroundColor: theme.palette.secondary[300],
            height: "40px",
            mt: "40px",
          }}
          onClick={handleOpenDialog}
        >
          New Employee
        </Button>
      </Box>
      <Box
        mt="40px"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-scrollbarFiller": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={loading}
          rows={employees}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
      {/* Dialog for adding a new employee */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          {/* Form fields */}
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={newEmployee.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={newEmployee.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={newEmployee.password}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="gender-label" sx={{ml:0}}>Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={newEmployee.gender}
              onChange={handleInputChange}
              sx={{mt: "10px"}}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              value={newEmployee.role}
              onChange={handleInputChange}
              sx={{mt: "10px"}}
            >
              <MenuItem value="Engineer">Engineer</MenuItem>
              <MenuItem value="Tester">Tester</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
              <MenuItem value="Quality Control">Quality Control</MenuItem>
              <MenuItem value="Fresher">Fresher</MenuItem>
              <MenuItem value="Intern">Intern</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateEmployee}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Employee;

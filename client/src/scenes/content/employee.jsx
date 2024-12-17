import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Employee = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  //for columns in data grid
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
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
        ); // Assuming your API endpoint
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
    </Box>
  );
};

export default Employee;

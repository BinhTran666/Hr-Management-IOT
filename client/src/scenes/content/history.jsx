import React, { useEffect, useState } from "react";
import { Box, Button, useTheme } from "@mui/material";
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const History = () => {
  const theme = useTheme();
  const [historyData, setHistoryData] = useState([]); // State for history data
  const [loading, setLoading] = useState(false);

  // Columns definition (updated for joined data)
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
    {
      field: "checkInTime",
      headerName: "Check-in Time",
      flex: 1,
      valueFormatter: (params) => {
        const date = new Date(params);
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true, // Use 12-hour format
        };
        return date.toLocaleString("en-US", options); // Specify locale (e.g., "en-US")
      },
    },
  ];

  useEffect(() => {
    const fetchHistoryAndEmployees = async () => {
      setLoading(true);
      try {
        // Fetch history data
        const historyResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/checkin/history`
        );

        // Add an id field to each row to be used as the unique identifier by DataGrid
        const historyDataWithId = historyResponse.data.map((item, index) => ({
          ...item,
          id: index, // Use the index as a unique ID (or item._id if _id is unique in your History model)
          employee_id: item.employeeId, // Get employee_id from nested object
          name: item.employee.name, // Get name from nested object
          email: item.employee.email, // Get email from nested object
          role: item.employee.role, // Get role from nested object
          gender: item.employee.gender, // Get gender from nested object
          checkInTime: item.checkInTime,
        }));

        setHistoryData(historyDataWithId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryAndEmployees();
  }, []);
  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="CHECKIN OVERVIEW"
          subtitle="Latest checkin of each employee"
        />
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
          rows={historyData}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default History;

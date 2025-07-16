// src/components/dashboard/AdminDashboard.js
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        🛠 Admin Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>Manage job listings, review resumes, and control system settings.</Typography>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;

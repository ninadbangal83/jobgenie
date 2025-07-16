// src/components/layout/Header.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get current route
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    handleMenuClose();
    navigate("/login");
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  const handleBackToDashboard = () => {
    handleMenuClose();
    navigate("/home");
  };

  const isOnProfile = location.pathname === "/profile";
  const isOnDashboard = location.pathname === "/home";

  return (
    <AppBar position="static" sx={{ background: "#0d47a1", px: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          JobGenie
        </Typography>

        {token && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 1 }}>
              Welcome, {username}
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {isOnProfile && (
                <MenuItem onClick={handleBackToDashboard}>Dashboard</MenuItem>
              )}
              {isOnDashboard && (
                <MenuItem onClick={handleProfile}>Update Profile</MenuItem>
              )}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

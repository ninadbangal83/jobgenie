import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const ProfileCard = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [feedback, setFeedback] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error("Profile fetch error", err);
        setFeedback({
          open: true,
          type: "error",
          message: "Failed to load profile.",
        });
      });
  }, []);

  const handleSave = () => {
    axios
      .put("http://localhost:5000/api/profile", profile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setEditMode(false);
        setFeedback({
          open: true,
          type: "success",
          message: "Profile updated successfully.",
        });
      })
      .catch((err) => {
        console.error("Profile update error", err);
        setFeedback({ open: true, type: "error", message: "Update failed." });
      });
  };

  const handleCloseSnackbar = () => {
    setFeedback({ ...feedback, open: false });
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          👤 Profile Information
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Full Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            disabled={!editMode}
            fullWidth
          />

          <TextField
            label="Email Address"
            value={profile.email}
            disabled
            fullWidth
          />

          <Box display="flex" gap={2}>
            {editMode ? (
              <>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outlined" onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={feedback.type}
          onClose={handleCloseSnackbar}
          variant="filled"
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileCard;

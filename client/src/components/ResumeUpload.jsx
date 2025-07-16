import React from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { CloudUpload, InsertDriveFile } from "@mui/icons-material";

const ResumeUpload = ({ file, setFile, loading, handleUpload }) => {
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        📄 Upload Resume
      </Typography>
      <Box display="flex" alignItems="center" gap={2} mt={2} flexWrap="wrap">
        <Button
          variant="outlined"
          component="label"
          startIcon={<InsertDriveFile />}
        >
          Choose File
          <input
            type="file"
            hidden
            onChange={handleChange}
          />
        </Button>

        {file && (
          <Typography variant="body2" color="text.secondary">
            {file.name}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUpload />}
          onClick={handleUpload}
          disabled={loading}
        >
          Upload & Match Jobs
        </Button>

        {loading && <CircularProgress size={24} />}
      </Box>
    </Box>
  );
};

export default ResumeUpload;

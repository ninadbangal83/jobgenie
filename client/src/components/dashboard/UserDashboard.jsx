import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  useTheme,
} from "@mui/material";
import axios from "axios";
import JobMatches from "../JobMatches";
import JobDetailModal from "../user/JobDetailModal";
import ResumeUpload from "../ResumeUpload";

const UserDashboard = () => {
  const theme = useTheme();

  const [file, setFile] = useState(null);
  const [parsed, setParsed] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setParsed(response.data.parsed);
      setMatches(response.data.matches);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Resume upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} maxWidth="lg" mx="auto">
      {/* Banner Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.grey[100],
          borderRadius: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Empower Your Career
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Upload your resume and discover jobs tailored to your skills — powered by AI.
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: "primary.main" }}>
            JG
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            AI Job Matcher by <strong>JobGenie</strong>
          </Typography>
        </Box>
      </Paper>

      {/* Upload Resume */}
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <ResumeUpload
          file={file}
          setFile={setFile}
          loading={loading}
          handleUpload={handleUpload}
        />
      </Paper>

      {/* Matched Jobs */}
      {matches.length > 0 && (
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <JobMatches
            parsed={parsed}
            matches={matches}
            onJobClick={handleJobClick}
          />
        </Paper>
      )}

      {/* Job Detail Modal */}
      <JobDetailModal
        open={isModalOpen}
        handleClose={handleModalClose}
        job={selectedJob}
      />
    </Box>
  );
};

export default UserDashboard;

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  Box,
  DialogActions,
  Button,
  Avatar,
  Divider,
} from "@mui/material";

const JobDetailModal = ({ open, handleClose, job }) => {
  if (!job) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          {job.title}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        {/* Company Info */}
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar>{job.company.charAt(0)}</Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              {job.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Match Score: {(job.match_score * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Required Skills */}
        <Typography variant="subtitle2" gutterBottom>
          Required Skills
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          {job.skills_required.map((skill, idx) => (
            <Chip key={idx} label={skill} variant="outlined" size="small" />
          ))}
        </Box>

        {/* Description */}
        {job.description && (
          <>
            <Typography variant="subtitle2" gutterBottom>
              Description
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.description}
            </Typography>
          </>
        )}
      </DialogContent>

      {/* Footer Buttons */}
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Close
        </Button>
        <Button variant="contained" color="primary">
          Apply Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetailModal;

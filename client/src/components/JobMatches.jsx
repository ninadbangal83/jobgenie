import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Divider,
} from "@mui/material";

const JobMatches = ({ parsed, matches, onJobClick }) => {
  return (
    <Box p={3}>
      {/* Extracted Skills */}
      <Typography variant="h6" gutterBottom>
        Extracted Skills
      </Typography>
      <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
        {parsed.skills.map((skill, index) => (
          <Chip key={index} label={skill} color="primary" variant="outlined" />
        ))}
      </Box>

      {/* Matched Jobs List */}
      <Typography variant="h6" gutterBottom>
        Matched Jobs
      </Typography>

      <Box
        sx={{
          maxHeight: 500,
          overflowY: "auto",
          pr: 1,
          border: "1px solid #e0e0e0",
          borderRadius: 2,
        }}
      >
        <List disablePadding>
          {matches.map((job, index) => (
            <ListItem
              key={index}
              sx={{
                mb: 1,
                px: 0,
                cursor: "pointer",
              }}
              onClick={() => onJobClick(job)}
            >
              <Card
                sx={{
                  width: "100%",
                  boxShadow: 1,
                  transition: "0.2s",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {job.title} @ {job.company}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Required Skills: {job.skills_required.join(", ")}
                  </Typography>

                  <Typography variant="body2">
                    Match Score: {(job.match_score * 100).toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={job.match_score * 100}
                    sx={{ height: 8, borderRadius: 4, mt: 0.5 }}
                  />
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default JobMatches;

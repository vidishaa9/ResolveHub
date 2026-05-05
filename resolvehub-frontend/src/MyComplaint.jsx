import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress
} from "@mui/material";

import { useEffect, useState } from "react";
import axios from "axios";

export default function MyComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8081/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComplaints(res.data);
    } catch (err) {
      console.log("Error fetching complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        background: `
          radial-gradient(ellipse at 80% 90%, rgba(99,102,241,0.25), transparent 60%),
          radial-gradient(ellipse at 20% 10%, rgba(191,219,254,0.8), transparent 60%),
          linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)
        `
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        All Complaints
      </Typography>

      <Paper
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          p: 2
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#0f172a" }}>
                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>Description</TableCell>
                <TableCell sx={{ color: "white" }}>Category</TableCell>
                <TableCell sx={{ color: "white" }}>Priority</TableCell>
                <TableCell sx={{ color: "white" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {complaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No complaints found
                  </TableCell>
                </TableRow>
              ) : (
                complaints.map((c) => (
                  <TableRow key={c.id} hover>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.description}</TableCell>
                    <TableCell>{c.category}</TableCell>

                    <TableCell>
                      <Chip
                        label={c.priority}
                        color={
                          c.priority === "HIGH"
                            ? "error"
                            : c.priority === "MEDIUM"
                            ? "warning"
                            : "success"
                        }
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={c.status}
                        color={
                          c.status === "OPEN"
                            ? "error"
                            : c.status === "IN_PROGRESS"
                            ? "warning"
                            : "success"
                        }
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}
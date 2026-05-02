import {
  Box, Paper, Typography, Button,
  Table, TableHead, TableRow,
  TableCell, TableBody, Chip
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8081/api/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
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
        position: "relative",
        overflow: "hidden",

        // 🔥 SAME GRADIENT SYSTEM
        background: `
          radial-gradient(ellipse at 80% 90%, rgba(99,102,241,0.25), transparent 60%),
          radial-gradient(ellipse at 20% 10%, rgba(191,219,254,0.8), transparent 60%),
          linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)
        `
      }}
    >

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="700" color="#0F172A">
            Complaints Dashboard
          </Typography>
          <Typography color="#64748B" fontSize="14px">
            Manage and track all submitted complaints
          </Typography>
        </Box>

        <Button
          onClick={fetchComplaints}
          sx={{
            px: 3,
            py: 1.2,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: "600",
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
            color: "white",
            boxShadow: "0 10px 25px rgba(37,99,235,0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 15px 30px rgba(37,99,235,0.4)"
            }
          }}
        >
          Refresh
        </Button>
      </Box>

      {/* TABLE CARD */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          overflow: "hidden"
        }}
      >
        {loading ? (
          <Box sx={{ p: 4 }}>
            <Typography>Loading complaints...</Typography>
          </Box>
        ) : (
          <Table>

            {/* TABLE HEAD */}
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(135deg, #0F172A, #1E293B)"
                }}
              >
                <TableCell sx={headStyle}>ID</TableCell>
                <TableCell sx={headStyle}>Description</TableCell>
                <TableCell sx={headStyle}>Category</TableCell>
                <TableCell sx={headStyle}>Priority</TableCell>
                <TableCell sx={headStyle}>Status</TableCell>
              </TableRow>
            </TableHead>

            {/* TABLE BODY */}
            <TableBody>
              {complaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No complaints found
                  </TableCell>
                </TableRow>
              ) : (
                complaints.map((c) => (
                  <TableRow
                    key={c.id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(37,99,235,0.05)"
                      }
                    }}
                  >
                    <TableCell>{c.id}</TableCell>

                    <TableCell sx={{ maxWidth: "300px" }}>
                      {c.description}
                    </TableCell>

                    <TableCell>{c.category}</TableCell>

                    <TableCell>
                      <Chip
                        label={c.priority}
                        sx={priorityStyle(c.priority)}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={c.status}
                        sx={statusStyle(c.status)}
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

// 🎨 HEAD STYLE
const headStyle = {
  color: "white",
  fontWeight: "600"
};

// 🎨 CUSTOM CHIP STYLES (more premium than default MUI colors)
const priorityStyle = (priority) => {
  if (priority === "High")
    return {
      background: "#fee2e2",
      color: "#dc2626",
      fontWeight: "600"
    };

  if (priority === "Medium")
    return {
      background: "#fef3c7",
      color: "#d97706",
      fontWeight: "600"
    };

  return {
    background: "#dcfce7",
    color: "#16a34a",
    fontWeight: "600"
  };
};

const statusStyle = (status) => {
  if (status === "OPEN")
    return {
      background: "#fee2e2",
      color: "#dc2626",
      fontWeight: "600"
    };

  if (status === "IN_PROGRESS")
    return {
      background: "#e0f2fe",
      color: "#0284c7",
      fontWeight: "600"
    };

  return {
    background: "#dcfce7",
    color: "#16a34a",
    fontWeight: "600"
  };
};
import {Box,Paper,Typography,Button,Table,TableHead,TableRow,TableCell,TableBody,Chip} from "@mui/material";
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
    <Box sx={{ minHeight: "100vh", background: "#EEF3FB", p: 4 }}>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#0F172A">
          Complaints
        </Typography>

        <Button
          onClick={fetchComplaints}
          sx={{
            backgroundColor: "#0F172A",
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            px: 3,
            "&:hover": { backgroundColor: "#1E293B" }
          }}
        >
          Refresh
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          borderRadius: "12px",
          overflow: "hidden",
          mt:10
        }}
      >
        {loading ? (
          <Box sx={{ p: 4 }}>
            <Typography>Loading complaints...</Typography>
          </Box>
        ) : (
          <Table>

            <TableHead sx={{ backgroundColor: "#0F172A" }}>
              <TableRow>
                <TableCell sx={headStyle}>ID</TableCell>
                <TableCell sx={headStyle}>Description</TableCell>
                <TableCell sx={headStyle}>Category</TableCell>
                <TableCell sx={headStyle}>Priority</TableCell>
                <TableCell sx={headStyle}>Status</TableCell>
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
                        color={getPriorityColor(c.priority)}
                        size="small"
                      />
                    </TableCell>

                    {/* Status Chip */}
                    <TableCell>
                      <Chip
                        label={c.status}
                        color={getStatusColor(c.status)}
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

// styles
const headStyle = {
  color: "white",
  fontWeight: "bold"
};

// helpers
const getPriorityColor = (priority) => {
  if (priority === "High") return "error";
  if (priority === "Medium") return "warning";
  return "success";
};

const getStatusColor = (status) => {
  if (status === "OPEN") return "error";
  if (status === "IN_PROGRESS") return "warning";
  return "success";
};
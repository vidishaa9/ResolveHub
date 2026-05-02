import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ComplaintForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    navigate("/");

    try {
      await axios.post("http://localhost:8081/api/complaints", formData);
      setMessage("Complaint submitted successfully!");
      setFormData({ name: "", phone: "", description: "" });
    } catch (error) {
      setMessage("Error submitting complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",

       
        background: `
          radial-gradient(ellipse at 70% 80%, rgba(99,102,241,0.25) 0%, transparent 55%),
          radial-gradient(ellipse at 30% 20%, rgba(191,219,254,0.7) 0%, transparent 60%),
          linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)
        `
      }}
    >

   
      <Box
        sx={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, #bfdbfe, transparent)",
          borderRadius: "50%",
          opacity: 0.5
        }}
      />

     
      <Paper
        elevation={0}
        sx={{
          padding: "40px",
          width: "420px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
          zIndex: 2
        }}
      >
    
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{ color: "#0F172A" }}
        >
          Register Complaint
        </Typography>

        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <TextField
            label="Your Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <TextField
            label="Contact Number"
            name="phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <TextField
            label="Complaint Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={handleChange}
            required
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
              color: "white",
              boxShadow: "0 15px 30px rgba(37,99,235,0.3)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 20px 40px rgba(37,99,235,0.4)"
              }
            }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </Button>

          {message && (
            <Typography
              textAlign="center"
              sx={{ mt: 2, color: "#0F172A" }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
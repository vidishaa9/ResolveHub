import {Box,Typography,TextField,Button,Paper} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ComplaintForm() {

const navigate=useNavigate();
  const [formData, setFormData] = useState({
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
      await axios.post(
        "http://localhost:8081/api/complaints",
        formData
      );

      setMessage("Complaint submitted successfully!");
      setFormData({ description: "" });

    } catch (error) {
      console.error(error);
      setMessage("Error submitting complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#EEF3FB",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          width: "400px",
          borderRadius: "12px",
          backgroundColor: "white"
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          sx={{color:"#0F172A"}}
        >
          Register Complaint
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <TextField
            label="Your Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
                />

          <TextField
            label="Contact Number"
            name="phone"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
            required
           
          />

       <TextField
        label="Complaint Description"
        name="description"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={formData.description}
        onChange={handleChange}
        required
  sx={{
    "& .MuiInputLabel-root": {
      color: "#0F172A", // label color
    },
    "& .MuiOutlinedInput-root": {
      color: "#0F172A", // input text
      "& fieldset": {
        borderColor: "white", // default border
      },
      "&:hover fieldset": {
        borderColor: "#0F172A", // hover border
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0F172A", // focused border
      },
    },
  }}
/>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              backgroundColor: "#0F172A",
              textTransform: "none",
              borderRadius: "8px",
              color:"white",
              "&:hover": {
                backgroundColor: "#EEF3FB"
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
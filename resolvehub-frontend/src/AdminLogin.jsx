import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login clicked", email, password);
    // later → connect backend
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0F172A",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          width: "350px",
          borderRadius: "12px",
          backgroundColor:"#EEF3FB"
        }}
      >

        {/* Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
        >
          Admin Login
        </Typography>

        {/* Form */}
        <Box sx={{ mt: 3 }}>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.2,
              backgroundColor: "#0F172A",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#1E293B"
              }
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

        </Box>
      </Paper>

    </Box>
  );
}
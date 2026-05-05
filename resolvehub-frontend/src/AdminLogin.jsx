import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMsg("Please fill all fields");
      setError(true);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          username: username,
          password: password
        }
      );

      const token = res.data.token;

      if (!token) {
        throw new Error("Token missing from response");
      }

      // store token
      localStorage.setItem("token", token);

      // decode role from JWT
      let role = null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        role = payload.role;
      } catch (e) {
        console.log("JWT decode failed:", e);
      }

      // fallback safety
      if (!role) role = "ROLE_USER";

      localStorage.setItem("role", role);

      // trigger navbar update
      window.dispatchEvent(new Event("authChange"));

      // redirect based on role
      if (role === "ROLE_ADMIN") {
        navigate("/admindashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setErrorMsg("Invalid credentials");
      setError(true);
      setPassword("");
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
          radial-gradient(ellipse at 80% 90%, rgba(99,102,241,0.35), transparent 60%),
          radial-gradient(ellipse at 20% 10%, rgba(191,219,254,0.8), transparent 60%),
          linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)
        `
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #bfdbfe, transparent)",
          borderRadius: "50%",
          top: "-120px",
          left: "-120px",
          opacity: 0.5,
          filter: "blur(40px)"
        }}
      />

      <Paper
        elevation={0}
        sx={{
          width: "380px",
          p: 4,
          borderRadius: "22px",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: `
            0 20px 50px rgba(0,0,0,0.08),
            0 8px 20px rgba(0,0,0,0.05)
          `,
          position: "relative",
          zIndex: 2
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="700" color="#0F172A">
            Admin Login
          </Typography>
        </Box>

        {/* USERNAME FIELD (UI unchanged, only logic changed) */}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px"
            }
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px"
            }
          }}
        />

        <Button
          fullWidth
          onClick={handleLogin}
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "14px",
            fontWeight: "600",
            textTransform: "none",
            fontSize: "15px",
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
            color: "white",
            boxShadow: "0 15px 30px rgba(37,99,235,0.35)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 20px 40px rgba(37,99,235,0.45)"
            }
          }}
        >
          Login
        </Button>

        <Snackbar
          open={error}
          autoHideDuration={3000}
          onClose={() => setError(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error" variant="filled">
            {errorMsg}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
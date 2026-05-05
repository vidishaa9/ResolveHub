import {Box,Typography,TextField,Button,Paper,Snackbar,Alert} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"

export default function UserLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async() => {
    if (!username || !password) {
      setErrorMsg("Please fill all fields");
      setError(true);
      return;
    }

    // if (!emailRegex.test(email)) {
    //   setErrorMsg("Invalid email format");
    //   setError(true);
    //   return;
    // }

        try {
      const res = await axios.post(
        "http://localhost:8081/api/auth/login",
        {
          username: username,
          password: password
        }
      );

      // store JWT token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "ROLE_USER");
      
      window.dispatchEvent(new Event("authChange"));
      // redirect to dashboard
      navigate("/");

    } catch (err) {
      setErrorMsg("Invalid credentials");
      setError(true);
      setPassword("");
    }
  };

  return (
    <Box sx={{
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
      }}>
      <Paper sx={{ width: "380px", p: 4, borderRadius: "20px" }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          User Login
        </Typography>

        <TextField
          label="username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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


        

        <Button
          fullWidth
          sx={{ mt: 1 


            , "&:hover":{
            color:"darkblue"}
          }}
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </Button>

        <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
          <Alert severity="error">{errorMsg}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}




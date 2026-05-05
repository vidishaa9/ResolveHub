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
import { useNavigate } from "react-router";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleRegister = async() => {
    if (!username || !password) {
      setMsg("Fill all fields");
      setError(true);
      return;
    }

    try {

    await axios.post(

      "http://localhost:8081/api/auth/register",

      {
        username: username,
        password: password,
        role: "ROLE_USER" 
      }

    );

    setMsg("Registered successfully!");

    setError(true);

    setTimeout(() => {

      navigate("/userlogin");

    }, 1000);

  } catch (err) {

    setMsg("Error occured");

    setError(true);

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
      <Paper sx={{ width: "380px", p: 4, borderRadius: "20px" }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          Register
        </Typography>

        <TextField
          label="Username"
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
          onClick={handleRegister}
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
          Register
        </Button>

       

        <Button
          fullWidth
          sx={{ mt: 1 , "&:hover":{
            color:"darkblue"
          } }}
          onClick={() => navigate("/userlogin")}
        >
          Already have an account? Login
        </Button>

        <Snackbar open={error} autoHideDuration={3000} onClose={() => setError(false)}>
          <Alert severity="info">{msg}</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}









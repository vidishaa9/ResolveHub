import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(15,23,42,0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "none"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Resolve<span style={{ color: "#3B82F6" }}>Hub</span>
        </Typography>

        <Button
          onClick={() => navigate("/admin")}
          sx={{
            border: "1px solid rgba(255,255,255,0.4)",
            color: "white",
            borderRadius: "10px",
            textTransform: "none"
          }}
        >
          Admin Login
        </Button>

      </Toolbar>
    </AppBar>
  );
}
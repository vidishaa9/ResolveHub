import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";
export default function Navbar() {

    const navigate=useNavigate();
    let handleClick=()=>
    {
       navigate("/admin");
    }
    let handleClickHome=()=>
    {
      navigate("/");
    }
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#0F172A",
        borderBottom: "1px solid #E6EAF0"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "white",
            cursor: "pointer"
          }}
          onClick={handleClickHome}
        >
          ResolveHub
        </Typography>

        <Button
          variant="outlined"
          sx={{
            borderColor: "beige",
            color: "beige",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(37,99,235,0.08)",
              borderColor: "#2563EB"
            }
          }}
          onClick={handleClick}
        >
          Admin Login
        </Button>

      </Toolbar>
    </AppBar>
  );
}
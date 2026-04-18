import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function HeroLP() {

    let navigate=useNavigate();
    let handleClick=()=>
    {
        navigate("/registercomplaint");
    }
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(180deg, #EEF3FB 0%, #EEF3FB 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center"
      }}
    >

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ color: "#1F2A37" }}
      >
        Got an issue? We’ll help you get it resolved.
      </Typography>

      <Typography
        sx={{
          mt: 2,
          color: "#6B7280",
          maxWidth: "600px"
        }}
      >
        Raise complaints in seconds. Track progress in real-time. Every issue gets proper attention and a clear resolution timeline.
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 5,
          px: 4,
          py: 1.5,
          backgroundColor: "#0F172A",
          borderRadius: "10px",
          fontSize: "16px",
          boxShadow: "0px 4px 12px rgba(37,99,235,0.2)",
          "&:hover": {
            backgroundColor: "#1D4ED8"
          }
        }}
        onClick={handleClick}
      >
        Register a Complaint
      </Button>

    </Box>
  );
}
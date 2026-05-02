import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function HeroLP() {
  const navigate = useNavigate();

  return (
    
   <Box
  sx={{
    minHeight: "calc(100vh - 64px)", 
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    background: `
  radial-gradient(ellipse at 70% 80%, rgba(99,102,241,0.25) 0%, transparent 55%),
  radial-gradient(ellipse at 30% 20%, rgba(191,219,254,0.6) 0%, transparent 60%),
  linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)
`
  }}
>

      {/* LEFT DOT PATTERN */}
      <Box
        sx={{
          position: "absolute",
          left: "80px",
          top: "180px",
          width: "120px",
          height: "120px",
          backgroundImage:
            "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "12px 12px",
          opacity: 0.5
        }}
      />

      {/* RIGHT SOFT BLOB */}
      <Box
        sx={{
          position: "absolute",
          right: "-150px",
          bottom: "-150px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, #c7d2fe, transparent)",
          borderRadius: "50%",
          opacity: 0.4
        }}
      />

      {/* CARD */}
      <Box
        sx={{
          background: "rgba(255,255,255,0.95)",
          border: "1px solid rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          borderRadius: "24px",
          padding: "60px 50px",
          textAlign: "center",
          maxWidth: "750px",
          width: "100%",
          boxShadow: "0 40px 80px rgba(0,0,0,0.08)",
          position: "relative",
          zIndex: 2
        }}
      >

        {/* ICON */}
        <Box
          sx={{
            width: "70px",
            height: "70px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "#EFF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px"
          }}
        >
          ⚡
        </Box>

        {/* HEADING */}
        <Typography
          sx={{
            fontSize: "34px",
            fontWeight: "700",
            color: "#0F172A",
            lineHeight: 1.3
          }}
        >
          Got an{" "}
          <span style={{ color: "#2563EB" }}>issue?</span>{" "}
          We’ll help you get it resolved.
        </Typography>

        {/* SUBTEXT */}
        <Typography
          sx={{
            mt: 2,
            color: "#64748B",
            fontSize: "16px",
            maxWidth: "520px",
            margin: "15px auto"
          }}
        >
          Raise complaints in seconds. Track progress in real-time.
          Every issue gets proper attention and a clear resolution timeline.
        </Typography>

        {/* BUTTON */}
        <Button
          sx={{
            mt: 4,
            px: 5,
            py: 1.5,
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: "600",
            fontSize: "15px",
            background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
            color:"white",
            boxShadow: "0 15px 30px rgba(37,99,235,0.35)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 20px 40px rgba(37,99,235,0.4)"
            }
          }}
          onClick={() => navigate("/registercomplaint")}
        >
           Register a Complaint
        </Button>

        {/* FEATURES */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5,
            gap: 3,
            flexWrap: "wrap"
          }}
        >
          {[
            ["⚡", "Fast Resolution", "Quick response & updates"],
            ["📊", "Real-time Tracking", "Track every step"],
            ["🔒", "Secure & Reliable", "Your data is safe"]
          ].map((item, i) => (
            <Box key={i} sx={{ flex: 1, minWidth: "180px" }}>
              <Typography fontSize="22px">{item[0]}</Typography>
              <Typography fontWeight="600" mt={1}>
                {item[1]}
              </Typography>
              <Typography fontSize="14px" color="#64748B">
                {item[2]}
              </Typography>
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
}
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem
} from "@mui/material";

import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { isLoggedIn, getRole, logout } from "./auth";

export default function Navbar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [role, setRole] = useState(getRole());

  const handleLoginClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event("authChange")); 
    setLoggedIn(false);
    setRole(null);
    handleClose();
    navigate("/");
  };

  
  useEffect(() => {
    const syncAuth = () => {
      console.log("syncAuth running");
      setLoggedIn(isLoggedIn());
      setRole(getRole());

      console.log("loggedIn:", isLoggedIn());
      console.log("role:", getRole());
    };

    // listens for login/logout in same or other tabs
    window.addEventListener("storage", syncAuth);
    window.addEventListener("authChange", syncAuth);

    // also run once on mount
    syncAuth();

    return () => {
      window.removeEventListener("storage", syncAuth);
      window.removeEventListener("authChange", syncAuth);
    };
  }, []);

  window.addEventListener("authChange", () => {
  console.log("🔥 authChange event fired");
});

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

        {/* LOGO */}
        <Typography
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Resolve<span style={{ color: "#3B82F6" }}>Hub</span>
        </Typography>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

          {/* NOT LOGGED IN */}
          {!loggedIn && (
            <>
              <Button
                onClick={handleLoginClick}
                sx={{
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "white",
                  borderRadius: "10px",
                  textTransform: "none"
                }}
              >
                Login
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/userlogin");
                    handleClose();
                  }}
                >
                  User Login
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/admin");
                    handleClose();
                  }}
                >
                  Admin Login
                </MenuItem>
              </Menu>
            </>
          )}

          {/* USER */}
          {loggedIn && role === "ROLE_USER" && (
            <>
              <Button
                onClick={() => navigate("/mycomplaints")}
                sx={{ color: "white", textTransform: "none" }}
              >
                My Complaints
              </Button>

              <Button
                onClick={handleLogout}
                sx={{
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "white",
                  borderRadius: "10px",
                  textTransform: "none"
                }}
              >
                Logout
              </Button>
            </>
          )}

          {/* ADMIN */}
          {loggedIn && role === "ROLE_ADMIN" && (
            <>
              <Button
                onClick={() => navigate("/admindashboard")}
                sx={{ color: "white", textTransform: "none" }}
              >
                Dashboard
              </Button>

              <Button
                onClick={handleLogout}
                sx={{
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "white",
                  borderRadius: "10px",
                  textTransform: "none"
                }}
              >
                Logout
              </Button>
            </>
          )}

        </div>
      </Toolbar>
    </AppBar>
  );
}



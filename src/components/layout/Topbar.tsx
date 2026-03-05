import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip } from "@mui/material";
import { DarkMode, LightMode, Logout, Notifications } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toggleDarkMode } from "../../store/slices/uiSlice";
import { logout } from "../../store/slices/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/resumes": "My Resumes",
  "/resumes/new": "New Resume",
  "/profile": "Profile",
};

export default function Topbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const { saving, lastSaved } = useAppSelector((state) => state.resume);

  const title = pageTitles[location.pathname] || "Resume Builder";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ gap: 1 }}>
        <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {saving && (
          <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
            Saving...
          </Typography>
        )}
        {lastSaved && !saving && (
          <Typography variant="caption" color="success.main" sx={{ mr: 1 }}>
            ✓ Saved
          </Typography>
        )}

        <Tooltip title="Notifications">
          <IconButton color="inherit"><Notifications /></IconButton>
        </Tooltip>
        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
          <IconButton onClick={() => dispatch(toggleDarkMode())} color="inherit">
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton onClick={handleLogout} color="inherit"><Logout /></IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useAppSelector } from "../../hooks/useAppSelector";

export default function Layout() {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const SIDEBAR_WIDTH = 260;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar width={SIDEBAR_WIDTH} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: sidebarOpen ? `${SIDEBAR_WIDTH}px` : "80px",
          transition: "margin 0.3s ease",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Topbar />
        <Box sx={{ p: 3, pt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
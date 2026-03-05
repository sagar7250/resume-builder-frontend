import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Box, Typography, Avatar, Divider, Tooltip, IconButton
} from "@mui/material";
import {
  Dashboard, Description, Add, Person, ChevronLeft, ChevronRight
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { toggleSidebar } from "../../store/slices/uiSlice";

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { label: "My Resumes", icon: <Description />, path: "/resumes" },
  { label: "New Resume", icon: <Add />, path: "/resumes/new" },
  { label: "Profile", icon: <Person />, path: "/profile" },
];

export default function Sidebar({ width }: { width: number }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? width : 80,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? width : 80,
          boxSizing: "border-box",
          transition: "width 0.3s ease",
          overflow: "hidden",
          background: (theme) => theme.palette.mode === "dark"
            ? "linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)"
            : "linear-gradient(180deg, #6C63FF 0%, #8F88FF 100%)",
          color: "#fff",
          border: "none",
          boxShadow: "4px 0 24px rgba(108, 99, 255, 0.15)",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%", pt: 2 }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", px: 2, mb: 3, justifyContent: sidebarOpen ? "space-between" : "center" }}>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff", fontFamily: '"DM Serif Display", serif' }}>
                ResumeForge
              </Typography>
            </motion.div>
          )}
          <IconButton onClick={() => dispatch(toggleSidebar())} sx={{ color: "rgba(255,255,255,0.8)" }}>
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>

        {/* User Avatar */}
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <Box sx={{ mx: 2, mb: 3, p: 2, borderRadius: 3, bgcolor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: "rgba(255,255,255,0.3)", color: "#fff", fontWeight: 700 }}>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 700, lineHeight: 1.2 }}>
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
                    {user?.resumeCount || 0} Resumes
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}

        <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mx: 2, mb: 1 }} />

        {/* Nav Items */}
        <List sx={{ px: 1, flexGrow: 1 }}>
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Tooltip title={!sidebarOpen ? item.label : ""} placement="right">
                  <ListItem disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      onClick={() => navigate(item.path)}
                      sx={{
                        borderRadius: 3,
                        minHeight: 48,
                        justifyContent: sidebarOpen ? "initial" : "center",
                        bgcolor: isActive ? "rgba(255,255,255,0.2)" : "transparent",
                        backdropFilter: isActive ? "blur(10px)" : "none",
                        "&:hover": { bgcolor: "rgba(255,255,255,0.15)" },
                        transition: "all 0.2s",
                      }}
                    >
                      <ListItemIcon sx={{ color: "#fff", minWidth: sidebarOpen ? 40 : "auto" }}>
                        {item.icon}
                      </ListItemIcon>
                      {sidebarOpen && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: "0.9rem" }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </motion.div>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
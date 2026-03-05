import React, { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "./theme";
import { useAppSelector } from "./hooks/useAppSelector";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ResumesPage from "./pages/ResumesPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationSnackbar from "./components/common/NotificationSnackbar";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  const darkMode = useAppSelector((state) => state.ui.darkMode);
  const theme = useMemo(() => createAppTheme(darkMode), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="resumes" element={<ResumesPage />} />
            <Route path="resumes/new" element={<ResumeBuilderPage />} />
            <Route path="resumes/:id" element={<ResumeBuilderPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        <NotificationSnackbar />
      </BrowserRouter>
    </ThemeProvider>
  );
}
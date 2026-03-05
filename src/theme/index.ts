import { createTheme, ThemeOptions } from "@mui/material/styles";

const commonTypography = {
  fontFamily: '"Plus Jakarta Sans", sans-serif',
  h1: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
  h2: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
  h3: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
  h4: { fontWeight: 700 },
  h5: { fontWeight: 700 },
  h6: { fontWeight: 600 },
  button: { fontWeight: 600, textTransform: "none" as const, letterSpacing: 0.3 },
};

const lightPalette = {
  mode: "light" as const,
  primary: { main: "#6C63FF", light: "#8F88FF", dark: "#4B44CC", contrastText: "#fff" },
  secondary: { main: "#FF6584", light: "#FF8FA3", dark: "#CC4366", contrastText: "#fff" },
  background: { default: "#F4F6FB", paper: "#FFFFFF" },
  text: { primary: "#1A1A2E", secondary: "#6B7280" },
  success: { main: "#10B981" },
  warning: { main: "#F59E0B" },
  error: { main: "#EF4444" },
};

const darkPalette = {
  mode: "dark" as const,
  primary: { main: "#818CF8", light: "#A5B4FC", dark: "#6366F1", contrastText: "#fff" },
  secondary: { main: "#F472B6", light: "#FBCFE8", dark: "#EC4899", contrastText: "#fff" },
  background: { default: "#0F0F1A", paper: "#1A1A2E" },
  text: { primary: "#F9FAFB", secondary: "#9CA3AF" },
  success: { main: "#34D399" },
  warning: { main: "#FBBF24" },
  error: { main: "#F87171" },
};

const commonComponents: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        padding: "10px 24px",
        fontSize: "0.9rem",
        boxShadow: "none",
        "&:hover": { boxShadow: "0 4px 20px rgba(108, 99, 255, 0.3)" },
      },
      containedPrimary: {
        background: "linear-gradient(135deg, #6C63FF 0%, #8F88FF 100%)",
        "&:hover": { background: "linear-gradient(135deg, #5B54EE 0%, #7E77FF 100%)" },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 24px rgba(0,0,0,0.07)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": { boxShadow: "0 8px 40px rgba(0,0,0,0.12)" },
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 12,
          "& fieldset": { borderColor: "rgba(108, 99, 255, 0.2)" },
          "&:hover fieldset": { borderColor: "#6C63FF" },
          "&.Mui-focused fieldset": { borderColor: "#6C63FF", borderWidth: 2 },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 8, fontWeight: 600, fontSize: "0.75rem" },
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: { borderRadius: 10, height: 6 },
      bar: { borderRadius: 10 },
    },
  },
};

export const createAppTheme = (darkMode: boolean) =>
  createTheme({
    palette: darkMode ? darkPalette : lightPalette,
    typography: commonTypography,
    shape: { borderRadius: 12 },
    components: commonComponents,
  });
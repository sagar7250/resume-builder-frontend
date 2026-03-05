import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Card, TextField, Button, Typography, InputAdornment, IconButton, Alert } from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { loginUser, clearError } from "../store/slices/authSlice";

interface LoginForm { email: string; password: string; }

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = (data: LoginForm) => {
    dispatch(loginUser({ email: data.email, password: data.password }));
  };

  return (
    <Box sx={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #6C63FF 0%, #8F88FF 50%, #FF6584 100%)",
      p: 2,
    }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <Card sx={{ p: 4, width: { xs: "100%", sm: 420 }, borderRadius: 4, boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ fontFamily: '"DM Serif Display", serif', mb: 0.5 }}>
              Welcome Back
            </Typography>
            <Typography color="text.secondary">Sign in to your ResumeForge account</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <TextField
              label="Email Address" type="email" fullWidth
              error={!!errors.email} helperText={errors.email?.message}
              InputProps={{ startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment> }}
              {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } })}
            />
            <TextField
              label="Password" type={showPassword ? "text" : "password"} fullWidth
              error={!!errors.password} helperText={errors.password?.message}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 characters" } })}
            />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}
              sx={{ py: 1.5, fontSize: "1rem", mt: 1 }}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don&apos;t have an account?{" "}
            <Link to="/register" style={{ color: "#6C63FF", fontWeight: 700, textDecoration: "none" }}>
              Create one
            </Link>
          </Typography>
        </Card>
      </motion.div>
    </Box>
  );
}
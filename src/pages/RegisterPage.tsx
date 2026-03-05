import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Card, TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { registerUser, clearError } from "../store/slices/authSlice";

interface RegisterForm { firstName: string; lastName: string; email: string; password: string; confirmPassword: string; }

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>();
  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
    return () => { dispatch(clearError()); };
  }, [isAuthenticated, navigate, dispatch]);

  const onSubmit = (data: RegisterForm) => {
    dispatch(registerUser({ firstName: data.firstName, lastName: data.lastName, email: data.email, password: data.password }));
  };

  return (
    <Box sx={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #6C63FF 0%, #8F88FF 50%, #FF6584 100%)",
      p: 2,
    }}>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card sx={{ p: 4, width: { xs: "100%", sm: 480 }, borderRadius: 4, boxShadow: "0 25px 60px rgba(0,0,0,0.2)" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ fontFamily: '"DM Serif Display", serif', mb: 0.5 }}>Join ResumeForge</Typography>
            <Typography color="text.secondary">Create your professional resume today</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField label="First Name" fullWidth error={!!errors.firstName} helperText={errors.firstName?.message}
                  {...register("firstName", { required: "Required", minLength: { value: 2, message: "Min 2 chars" } })} />
              </Grid>
              <Grid item xs={6}>
                <TextField label="Last Name" fullWidth error={!!errors.lastName} helperText={errors.lastName?.message}
                  {...register("lastName", { required: "Required", minLength: { value: 2, message: "Min 2 chars" } })} />
              </Grid>
            </Grid>
            <TextField label="Email Address" type="email" fullWidth error={!!errors.email} helperText={errors.email?.message}
              {...register("email", { required: "Email required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" } })} />
            <TextField label="Password" type="password" fullWidth error={!!errors.password} helperText={errors.password?.message}
              {...register("password", { required: "Password required", minLength: { value: 8, message: "Min 8 characters" } })} />
            <TextField label="Confirm Password" type="password" fullWidth error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message}
              {...register("confirmPassword", { required: "Please confirm", validate: value => value === password || "Passwords don't match" })} />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5, mt: 1 }}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>

          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#6C63FF", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
          </Typography>
        </Card>
      </motion.div>
    </Box>
  );
}
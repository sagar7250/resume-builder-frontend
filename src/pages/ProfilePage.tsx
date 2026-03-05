import React, { useState } from "react";
import {
  Box, Card, CardContent, Typography, TextField, Button, Grid,
  Avatar, Divider, Alert
} from "@mui/material";
import { Save, Person } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { showNotification } from "../store/slices/uiSlice";
import api from "../services/api";
import { setUser } from "../store/slices/authSlice";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: {
    firstName: user?.firstName || "", lastName: user?.lastName || "",
    phone: user?.phone || "", location: user?.location || "", jobTitle: user?.jobTitle || "",
  }});

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await api.put("/users/me", data);
      dispatch(setUser(res.data.data));
      dispatch(showNotification({ message: "Profile updated successfully!", type: "success" }));
    } catch {
      dispatch(showNotification({ message: "Failed to update profile", type: "error" }));
    } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4, textAlign: "center" }}>
            <CardContent sx={{ py: 4 }}>
              <Avatar sx={{ width: 96, height: 96, bgcolor: "primary.main", fontSize: "2.5rem",
                fontWeight: 700, mx: "auto", mb: 2 }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
              <Typography variant="h5" fontWeight={700}>{user?.firstName} {user?.lastName}</Typography>
              <Typography color="text.secondary" gutterBottom>{user?.email}</Typography>
              <Typography variant="caption" color="primary.main" fontWeight={700}>
                {user?.role} ACCOUNT
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h5" fontWeight={800} color="primary">{user?.resumeCount || 0}</Typography>
                  <Typography variant="caption" color="text.secondary">Resumes</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                <Person color="primary" />
                <Typography variant="h5" fontWeight={700}>Personal Information</Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="First Name" fullWidth {...register("firstName")} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Last Name" fullWidth {...register("lastName")} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Email" fullWidth value={user?.email} disabled
                      helperText="Email cannot be changed" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Phone" fullWidth {...register("phone")} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Location" fullWidth {...register("location")} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Job Title" fullWidth {...register("jobTitle")} />
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" startIcon={<Save />}
                  disabled={loading} sx={{ mt: 3 }}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </motion.div>
  );
}
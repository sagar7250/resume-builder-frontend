import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Grid, Card, CardContent, Typography, Button, Avatar,
  LinearProgress, Chip, Stack
} from "@mui/material";
import { Add, Description, TrendingUp, Star, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchResumes } from "../store/slices/resumeSlice";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { resumes } = useAppSelector((state) => state.resume);

  useEffect(() => { dispatch(fetchResumes()); }, [dispatch]);

  const avgScore = resumes.length > 0
    ? Math.round(resumes.reduce((acc, r) => acc + (r.atsScore || 0), 0) / resumes.length)
    : 0;

  const statCards = [
    { title: "Total Resumes", value: resumes.length, icon: <Description />, color: "#6C63FF", bg: "#EEF2FF" },
    { title: "Avg ATS Score", value: `${avgScore}%`, icon: <TrendingUp />, color: "#10B981", bg: "#ECFDF5" },
    { title: "Top Score", value: `${Math.max(0, ...resumes.map(r => r.atsScore || 0))}%`, icon: <Star />, color: "#F59E0B", bg: "#FFFBEB" },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {/* Welcome Banner */}
      <motion.div variants={itemVariants}>
        <Card sx={{
          mb: 3, p: 1,
          background: "linear-gradient(135deg, #6C63FF 0%, #8F88FF 60%, #FF6584 100%)",
          color: "#fff", borderRadius: 4, overflow: "hidden", position: "relative"
        }}>
          <CardContent sx={{ position: "relative", zIndex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
              <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Welcome back, {user?.firstName}! 👋
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                  {resumes.length === 0
                    ? "Create your first resume and land your dream job."
                    : `You have ${resumes.length} resume${resumes.length > 1 ? "s" : ""}. Keep building!`}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate("/resumes/new")}
                  startIcon={<Add />}
                  sx={{ bgcolor: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.35)", boxShadow: "none" } }}
                >
                  Create New Resume
                </Button>
              </Box>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "rgba(255,255,255,0.2)", fontSize: "2rem", fontWeight: 700 }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
            </Box>
          </CardContent>
          {/* Decorative circles */}
          <Box sx={{ position: "absolute", top: -30, right: -30, width: 150, height: 150,
            borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />
          <Box sx={{ position: "absolute", bottom: -40, right: 80, width: 100, height: 100,
            borderRadius: "50%", bgcolor: "rgba(255,255,255,0.06)" }} />
        </Card>
      </motion.div>

      {/* Stats */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        {statCards.map((card, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <motion.div variants={itemVariants}>
              <Card sx={{ p: 0.5, borderRadius: 3 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: card.bg, color: card.color }}>
                      {card.icon}
                    </Box>
                    <Box>
                      <Typography variant="h4" fontWeight={800} sx={{ color: card.color }}>{card.value}</Typography>
                      <Typography variant="body2" color="text.secondary">{card.title}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Recent Resumes */}
      <motion.div variants={itemVariants}>
        <Card sx={{ borderRadius: 4 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h5" fontWeight={700}>Recent Resumes</Typography>
              <Button endIcon={<ArrowForward />} onClick={() => navigate("/resumes")} size="small">
                View All
              </Button>
            </Box>

            {resumes.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Description sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>No resumes yet</Typography>
                <Typography variant="body2" color="text.disabled" gutterBottom>
                  Create your first resume to get started
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => navigate("/resumes/new")} sx={{ mt: 2 }}>
                  Create Resume
                </Button>
              </Box>
            ) : (
              <Stack spacing={2}>
                {resumes.slice(0, 5).map((resume, i) => (
                  <motion.div key={resume.id} initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <Box
                      sx={{
                        p: 2, borderRadius: 3, border: "1px solid", borderColor: "divider",
                        display: "flex", alignItems: "center", gap: 2, cursor: "pointer",
                        transition: "all 0.2s", "&:hover": { borderColor: "primary.main", bgcolor: "primary.50", transform: "translateX(4px)" }
                      }}
                      onClick={() => navigate(`/resumes/${resume.id}`)}
                    >
                      <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "primary.main", color: "#fff" }}>
                        <Description fontSize="small" />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography fontWeight={600}>{resume.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {resume.template} • Updated {new Date(resume.updatedAt || "").toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption" color="text.secondary" display="block">ATS Score</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <LinearProgress
                            variant="determinate" value={resume.atsScore || 0}
                            sx={{ width: 60, color: (resume.atsScore || 0) > 70 ? "success.main" : "warning.main" }}
                          />
                          <Typography variant="caption" fontWeight={700}>{resume.atsScore || 0}%</Typography>
                        </Box>
                      </Box>
                      <Chip label={resume.template} size="small" variant="outlined" color="primary" />
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Grid, Card, CardContent, CardActions, Typography, Button, IconButton,
  LinearProgress, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Menu, MenuItem, Skeleton, Chip, Avatar
} from "@mui/material";
import { Add, Delete, Edit, FileCopy, MoreVert, Description } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchResumes, deleteResume, duplicateResume, createResume } from "../store/slices/resumeSlice";
import { showNotification } from "../store/slices/uiSlice";
import { ResumeTemplate } from "../types";
import TemplatePicker, { TEMPLATES } from "../components/resume/TemplatePicker";

const templateColorMap: Record<ResumeTemplate, string> = {
  FRESHER: "#06B6D4", MODERN: "#6C63FF", EXECUTIVE: "#F59E0B",
  CREATIVE: "#F97316", TECH: "#10B981", MINIMAL: "#64748B",
  ACADEMIC: "#7C3AED", CORPORATE: "#B45309",
};

export default function ResumesPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { resumes, loading } = useAppSelector((state) => state.resume);
  const [anchorEl, setAnchorEl] = useState<{ el: HTMLElement; id: string } | null>(null);
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null);
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("My Resume");
  const [newTemplate, setNewTemplate] = useState<ResumeTemplate>("MODERN");

  useEffect(() => { dispatch(fetchResumes()); }, [dispatch]);

  const handleDelete = async () => {
    if (!deleteDialogId) return;
    await dispatch(deleteResume(deleteDialogId));
    dispatch(showNotification({ message: "Resume deleted", type: "success" }));
    setDeleteDialogId(null);
  };

  const handleDuplicate = async (id: string) => {
    await dispatch(duplicateResume(id));
    dispatch(showNotification({ message: "Resume duplicated!", type: "success" }));
    setAnchorEl(null);
  };

  const handleCreate = async () => {
    const result = await dispatch(createResume({ title: newTitle, template: newTemplate }));
    if (createResume.fulfilled.match(result)) {
      navigate(`/resumes/${result.payload.id}`);
    }
    setNewDialogOpen(false);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>My Resumes</Typography>
          <Typography color="text.secondary">{resumes.length} resume{resumes.length !== 1 ? "s" : ""}</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setNewDialogOpen(true)} size="large" sx={{ borderRadius: 3 }}>
          New Resume
        </Button>
      </Box>

      {loading ? (
        <Grid container spacing={3}>
          {[1,2,3].map(i => <Grid item xs={12} sm={6} md={4} key={i}><Skeleton variant="rounded" height={240} sx={{ borderRadius: 4 }} /></Grid>)}
        </Grid>
      ) : resumes.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <Description sx={{ fontSize: 80, color: "text.disabled", mb: 3 }} />
          <Typography variant="h5" fontWeight={700} gutterBottom>No resumes yet</Typography>
          <Typography color="text.secondary" gutterBottom>Pick a template and build your first resume</Typography>
          <Button variant="contained" size="large" startIcon={<Add />} onClick={() => setNewDialogOpen(true)} sx={{ mt: 2, borderRadius: 3 }}>
            Create Your First Resume
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          <AnimatePresence>
            {resumes.map((resume, i) => {
              const color = templateColorMap[resume.template as ResumeTemplate] || "#6C63FF";
              const tmpl = TEMPLATES.find(t => t.id === resume.template);
              return (
                <Grid item xs={12} sm={6} md={4} key={resume.id}>
                  <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -5 }}>
                    <Card sx={{ borderRadius: 4, height: "100%", display: "flex", flexDirection: "column",
                      border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
                      {/* Gradient Header */}
                      <Box sx={{ height: 100, position: "relative", overflow: "hidden",
                        background: `linear-gradient(135deg, ${color}dd 0%, ${color}88 100%)` }}>
                        <Box sx={{ position: "absolute", top: -20, right: -20, width: 100, height: 100,
                          borderRadius: "50%", bgcolor: "rgba(255,255,255,0.12)" }} />
                        <Box sx={{ position: "absolute", bottom: -10, left: -10, width: 60, height: 60,
                          borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />
                        <Box sx={{ p: 2, position: "relative", zIndex: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.25)", color: "#fff", fontWeight: 900, width: 42, height: 42, fontSize: "1.1rem" }}>
                              {(resume.title || "R")[0].toUpperCase()}
                            </Avatar>
                            <IconButton size="small" sx={{ color: "rgba(255,255,255,0.9)" }}
                              onClick={(e) => setAnchorEl({ el: e.currentTarget, id: resume.id! })}>
                              <MoreVert />
                            </IconButton>
                          </Box>
                          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1rem", mt: 1, textShadow: "0 1px 4px rgba(0,0,0,0.2)" }} noWrap>
                            {resume.title}
                          </Typography>
                        </Box>
                      </Box>

                      <CardContent sx={{ flexGrow: 1, pt: 1.5 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
                          <Chip label={tmpl?.label || resume.template} size="small"
                            sx={{ bgcolor: `${color}15`, color, fontWeight: 700, fontSize: "0.7rem", border: "none" }} />
                          <Chip label={tmpl?.tag || ""} size="small" variant="outlined"
                            sx={{ fontSize: "0.65rem", borderColor: `${color}50`, color: "text.secondary" }} />
                        </Box>
                        <Box sx={{ mb: 0.5 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary" fontWeight={600}>ATS Score</Typography>
                            <Typography variant="caption" fontWeight={800}
                              sx={{ color: (resume.atsScore || 0) > 70 ? "success.main" : "warning.main" }}>
                              {resume.atsScore || 0}%
                            </Typography>
                          </Box>
                          <LinearProgress variant="determinate" value={resume.atsScore || 0}
                            color={(resume.atsScore || 0) > 70 ? "success" : "warning"}
                            sx={{ height: 5, borderRadius: 3 }} />
                        </Box>
                        <Typography variant="caption" color="text.disabled">
                          Updated {new Date(resume.updatedAt || "").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{ px: 2, pb: 2, gap: 1 }}>
                        <Button variant="contained" size="small" startIcon={<Edit />} fullWidth
                          onClick={() => navigate(`/resumes/${resume.id}`)}
                          sx={{ borderRadius: 3, background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              );
            })}
          </AnimatePresence>
        </Grid>
      )}

      {/* Context Menu */}
      <Menu anchorEl={anchorEl?.el} open={!!anchorEl} onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { borderRadius: 3, boxShadow: "0 8px 32px rgba(0,0,0,0.12)" } }}>
        <MenuItem onClick={() => { navigate(`/resumes/${anchorEl?.id}`); setAnchorEl(null); }}>
          <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDuplicate(anchorEl?.id!)}>
          <FileCopy fontSize="small" sx={{ mr: 1 }} /> Duplicate
        </MenuItem>
        <MenuItem onClick={() => { setDeleteDialogId(anchorEl?.id!); setAnchorEl(null); }} sx={{ color: "error.main" }}>
          <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirm */}
      <Dialog open={!!deleteDialogId} onClose={() => setDeleteDialogId(null)} PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle fontWeight={700}>Delete Resume?</DialogTitle>
        <DialogContent>This action cannot be undone.</DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogId(null)} variant="outlined" sx={{ borderRadius: 3 }}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error" sx={{ borderRadius: 3 }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* New Resume Dialog */}
      <Dialog open={newDialogOpen} onClose={() => setNewDialogOpen(false)} maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}>
        <DialogTitle fontWeight={700} sx={{ pb: 1 }}>
          Create New Resume
          <Typography variant="body2" color="text.secondary">Choose a template designed for your career stage</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField label="Resume Title" fullWidth value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
            sx={{ mb: 3 }} />
          <TemplatePicker selected={newTemplate} onSelect={setNewTemplate} />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setNewDialogOpen(false)} variant="outlined" sx={{ borderRadius: 3 }}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained" sx={{ borderRadius: 3 }}>
            Create with {TEMPLATES.find(t => t.id === newTemplate)?.label} Template
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

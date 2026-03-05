import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Grid, Button, Typography, Card, CardContent, TextField, IconButton,
  CircularProgress, Tabs, Tab, Chip, LinearProgress, Stack, Tooltip
} from "@mui/material";
import {
  Save, Preview, ArrowBack, ArrowForward, Add, Delete, Check,
  WorkOutline, SchoolOutlined, Code, EmojiEvents, Assignment, Person, Palette
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchResumeById, updateResume, createResume } from "../store/slices/resumeSlice";
import { setBuilderStep, showNotification, togglePreviewMode } from "../store/slices/uiSlice";
import { Resume, Experience, Education, Skill, Project, Certification, ResumeTemplate } from "../types";
import ResumePreview from "../components/resume/ResumePreview";
import TemplatePicker, { TEMPLATES } from "../components/resume/TemplatePicker";

const STEPS = [
  { label: "Template",    icon: <Palette /> },
  { label: "Personal",    icon: <Person /> },
  { label: "Experience",  icon: <WorkOutline /> },
  { label: "Education",   icon: <SchoolOutlined /> },
  { label: "Skills",      icon: <Code /> },
  { label: "Projects",    icon: <Assignment /> },
  { label: "Certs",       icon: <EmojiEvents /> },
];

function PersonalInfoStep({ resume, onChange }: { resume: Resume; onChange: (d: Partial<Resume>) => void }) {
  return (
    <Grid container spacing={2.5}>
      {[
        { field: "fullName", label: "Full Name", xs: 12, sm: 6 },
        { field: "email", label: "Email Address", xs: 12, sm: 6 },
        { field: "phone", label: "Phone Number", xs: 12, sm: 6 },
        { field: "location", label: "Location / City", xs: 12, sm: 6 },
        { field: "website", label: "Portfolio Website", xs: 12, sm: 4 },
        { field: "linkedin", label: "LinkedIn URL", xs: 12, sm: 4 },
        { field: "github", label: "GitHub URL", xs: 12, sm: 4 },
      ].map(({ field, label, xs, sm }) => (
        <Grid item xs={xs} sm={sm} key={field}>
          <TextField label={label} fullWidth value={(resume as any)[field] || ""}
            onChange={(e) => onChange({ [field]: e.target.value })} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <TextField label="Professional Summary / Objective" fullWidth multiline rows={4}
          value={resume.summary || ""}
          placeholder="Write 2-4 sentences about your background, key skills, and career goals..."
          onChange={(e) => onChange({ summary: e.target.value })}
          helperText={`${(resume.summary || "").length}/600 characters`}
          inputProps={{ maxLength: 600 }} />
      </Grid>
    </Grid>
  );
}

function ExperienceStep({ resume, onChange }: { resume: Resume; onChange: (d: Partial<Resume>) => void }) {
  const experiences = resume.experiences || [];
  const add = () => onChange({ experiences: [...experiences, { company: "", position: "", current: false, description: "", displayOrder: experiences.length }] });
  const update = (i: number, data: Partial<Experience>) => onChange({ experiences: experiences.map((e, idx) => idx === i ? { ...e, ...data } : e) });
  const remove = (i: number) => onChange({ experiences: experiences.filter((_, idx) => idx !== i) });
  return (
    <Box>
      <AnimatePresence>
        {experiences.map((exp, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card sx={{ mb: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography fontWeight={700}>Experience #{i + 1}</Typography>
                  <IconButton onClick={() => remove(i)} color="error" size="small"><Delete /></IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField label="Company" fullWidth value={exp.company} onChange={(e) => update(i, { company: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Job Title" fullWidth value={exp.position} onChange={(e) => update(i, { position: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={4}><TextField label="Location" fullWidth value={exp.location || ""} onChange={(e) => update(i, { location: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={4}><TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={exp.startDate || ""} onChange={(e) => update(i, { startDate: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={4}><TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={exp.endDate || ""} disabled={exp.current} onChange={(e) => update(i, { endDate: e.target.value })} /></Grid>
                  <Grid item xs={12}><TextField label="Achievements & Responsibilities" fullWidth multiline rows={3} value={exp.description || ""} placeholder="• Led a team of 5 engineers&#10;• Increased performance by 40%" onChange={(e) => update(i, { description: e.target.value })} /></Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outlined" startIcon={<Add />} onClick={add} fullWidth sx={{ borderRadius: 3, py: 1.5, borderStyle: "dashed" }}>Add Experience</Button>
    </Box>
  );
}

function EducationStep({ resume, onChange }: { resume: Resume; onChange: (d: Partial<Resume>) => void }) {
  const educations = resume.educations || [];
  const add = () => onChange({ educations: [...educations, { institution: "", degree: "", current: false, displayOrder: educations.length }] });
  const update = (i: number, data: Partial<Education>) => onChange({ educations: educations.map((e, idx) => idx === i ? { ...e, ...data } : e) });
  const remove = (i: number) => onChange({ educations: educations.filter((_, idx) => idx !== i) });
  return (
    <Box>
      <AnimatePresence>
        {educations.map((edu, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card sx={{ mb: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography fontWeight={700}>Education #{i + 1}</Typography>
                  <IconButton onClick={() => remove(i)} color="error" size="small"><Delete /></IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField label="Institution" fullWidth value={edu.institution} onChange={(e) => update(i, { institution: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Degree" fullWidth value={edu.degree} onChange={(e) => update(i, { degree: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Field of Study" fullWidth value={edu.fieldOfStudy || ""} onChange={(e) => update(i, { fieldOfStudy: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Grade / GPA / Percentage" fullWidth value={edu.grade || ""} onChange={(e) => update(i, { grade: e.target.value })} /></Grid>
                  <Grid item xs={6}><TextField label="Start Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={edu.startDate || ""} onChange={(e) => update(i, { startDate: e.target.value })} /></Grid>
                  <Grid item xs={6}><TextField label="End Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={edu.endDate || ""} onChange={(e) => update(i, { endDate: e.target.value })} /></Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outlined" startIcon={<Add />} onClick={add} fullWidth sx={{ borderRadius: 3, py: 1.5, borderStyle: "dashed" }}>Add Education</Button>
    </Box>
  );
}

function SkillsStep({ resume, onChange }: { resume: Resume; onChange: (d: Partial<Resume>) => void }) {
  const skills = resume.skills || [];
  const levels = ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const;
  const levelColors: Record<string, string> = { BEGINNER: "#6B7280", INTERMEDIATE: "#3B82F6", ADVANCED: "#10B981", EXPERT: "#6C63FF" };
  const add = () => onChange({ skills: [...skills, { name: "", level: "INTERMEDIATE" }] });
  const update = (i: number, data: Partial<Skill>) => onChange({ skills: skills.map((s, idx) => idx === i ? { ...s, ...data } : s) });
  const remove = (i: number) => onChange({ skills: skills.filter((_, idx) => idx !== i) });
  return (
    <Box>
      <Grid container spacing={2}>
        {skills.map((skill, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ pb: "12px !important" }}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <TextField label="Skill Name" size="small" sx={{ flexGrow: 1 }} value={skill.name} onChange={(e) => update(i, { name: e.target.value })} />
                    <IconButton onClick={() => remove(i)} color="error" size="small" sx={{ mt: 0.5 }}><Delete /></IconButton>
                  </Box>
                  <Stack direction="row" spacing={0.5} sx={{ mt: 1.5, flexWrap: "wrap", gap: 0.5 }}>
                    {levels.map((level) => (
                      <Chip key={level} label={level} size="small" onClick={() => update(i, { level })} sx={{
                        cursor: "pointer",
                        bgcolor: skill.level === level ? levelColors[level] : "transparent",
                        color: skill.level === level ? "#fff" : "text.secondary",
                        border: "1px solid", borderColor: skill.level === level ? levelColors[level] : "divider",
                        fontWeight: skill.level === level ? 700 : 400,
                      }} />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" startIcon={<Add />} onClick={add} fullWidth sx={{ mt: 2, borderRadius: 3, py: 1.5, borderStyle: "dashed" }}>Add Skill</Button>
    </Box>
  );
}

function ProjectsStep({ resume, onChange }: { resume: Resume; onChange: (d: Partial<Resume>) => void }) {
  const projects = resume.projects || [];
  const add = () => onChange({ projects: [...projects, { name: "" }] });
  const update = (i: number, data: Partial<Project>) => onChange({ projects: projects.map((p, idx) => idx === i ? { ...p, ...data } : p) });
  const remove = (i: number) => onChange({ projects: projects.filter((_, idx) => idx !== i) });
  return (
    <Box>
      <AnimatePresence>
        {projects.map((proj, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card sx={{ mb: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography fontWeight={700}>Project #{i + 1}</Typography>
                  <IconButton onClick={() => remove(i)} color="error" size="small"><Delete /></IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12}><TextField label="Project Name" fullWidth value={proj.name} onChange={(e) => update(i, { name: e.target.value })} /></Grid>
                  <Grid item xs={12}><TextField label="Technologies Used" fullWidth value={proj.technologies || ""} placeholder="React, Node.js, PostgreSQL..." onChange={(e) => update(i, { technologies: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Live URL" fullWidth value={proj.liveUrl || ""} onChange={(e) => update(i, { liveUrl: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="GitHub URL" fullWidth value={proj.githubUrl || ""} onChange={(e) => update(i, { githubUrl: e.target.value })} /></Grid>
                  <Grid item xs={12}><TextField label="Description" fullWidth multiline rows={3} value={proj.description || ""} onChange={(e) => update(i, { description: e.target.value })} /></Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outlined" startIcon={<Add />} onClick={add} fullWidth sx={{ borderRadius: 3, py: 1.5, borderStyle: "dashed" }}>Add Project</Button>
    </Box>
  );
}

function CertificationsStep({ resume, onChange }: { resume: Resume; onChange: (d: Partial<Resume>) => void }) {
  const certs = resume.certifications || [];
  const add = () => onChange({ certifications: [...certs, { name: "" }] });
  const update = (i: number, data: Partial<Certification>) => onChange({ certifications: certs.map((c, idx) => idx === i ? { ...c, ...data } : c) });
  const remove = (i: number) => onChange({ certifications: certs.filter((_, idx) => idx !== i) });
  return (
    <Box>
      <AnimatePresence>
        {certs.map((cert, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <Card sx={{ mb: 2, borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Typography fontWeight={700}>Certification #{i + 1}</Typography>
                  <IconButton onClick={() => remove(i)} color="error" size="small"><Delete /></IconButton>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField label="Certification Name" fullWidth value={cert.name} onChange={(e) => update(i, { name: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Issuing Organization" fullWidth value={cert.issuer || ""} onChange={(e) => update(i, { issuer: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Issue Date" type="date" fullWidth InputLabelProps={{ shrink: true }} value={cert.issueDate || ""} onChange={(e) => update(i, { issueDate: e.target.value })} /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Credential URL" fullWidth value={cert.credentialUrl || ""} onChange={(e) => update(i, { credentialUrl: e.target.value })} /></Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      <Button variant="outlined" startIcon={<Add />} onClick={add} fullWidth sx={{ borderRadius: 3, py: 1.5, borderStyle: "dashed" }}>Add Certification</Button>
    </Box>
  );
}

export default function ResumeBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentResume, loading, saving } = useAppSelector((state) => state.resume);
  const { builderStep, previewMode } = useAppSelector((state) => state.ui);
  const [localResume, setLocalResume] = useState<Resume | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (id) { dispatch(fetchResumeById(id)); }
    else {
      setLocalResume({ title: "New Resume", template: "MODERN", published: false,
        experiences: [], educations: [], skills: [], projects: [], certifications: [] });
    }
    return () => { dispatch(setBuilderStep(0)); };
  }, [id, dispatch]);

  useEffect(() => { if (currentResume && id) setLocalResume(currentResume); }, [currentResume, id]);

  const handleChange = useCallback((data: Partial<Resume>) => {
    setLocalResume((prev) => prev ? { ...prev, ...data } : null);
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    if (id) {
      saveTimerRef.current = setTimeout(() => {
        setLocalResume(prev => { if (prev && id) dispatch(updateResume({ id, resume: { ...prev, ...data } })); return prev; });
      }, 1500);
    }
  }, [id, dispatch]);

  const handleSave = async () => {
    if (!localResume) return;
    if (id) {
      await dispatch(updateResume({ id, resume: localResume }));
      dispatch(showNotification({ message: "Resume saved!", type: "success" }));
    } else {
      const result = await dispatch(createResume(localResume));
      if (createResume.fulfilled.match(result)) {
        navigate(`/resumes/${result.payload.id}`, { replace: true });
        dispatch(showNotification({ message: "Resume created!", type: "success" }));
      }
    }
  };

  if (loading || !localResume) return <Box sx={{ display: "flex", justifyContent: "center", pt: 10 }}><CircularProgress size={60} /></Box>;

  const currentTmpl = TEMPLATES.find(t => t.id === localResume.template);
  const accentColor = currentTmpl?.color || "#6C63FF";

  const stepComponents = [
    <Box>
      <Typography variant="h6" fontWeight={700} gutterBottom>Choose Your Template</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Select a template designed for your career level and industry</Typography>
      <TemplatePicker selected={localResume.template as ResumeTemplate} onSelect={(t) => handleChange({ template: t })} />
    </Box>,
    <PersonalInfoStep resume={localResume} onChange={handleChange} />,
    <ExperienceStep resume={localResume} onChange={handleChange} />,
    <EducationStep resume={localResume} onChange={handleChange} />,
    <SkillsStep resume={localResume} onChange={handleChange} />,
    <ProjectsStep resume={localResume} onChange={handleChange} />,
    <CertificationsStep resume={localResume} onChange={handleChange} />,
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="h4" fontWeight={800}>{localResume.title}</Typography>
            {currentTmpl && <Chip label={currentTmpl.label} size="small" sx={{ bgcolor: `${accentColor}20`, color: accentColor, fontWeight: 700 }} />}
          </Box>
          <Typography color="text.secondary">Step {builderStep + 1} of {STEPS.length} — {STEPS[builderStep].label}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {saving && <Chip label="Auto-saving..." size="small" color="info" />}
          <Button variant="outlined" startIcon={<Preview />} onClick={() => dispatch(togglePreviewMode())} sx={{ borderRadius: 3 }}>
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave} sx={{ borderRadius: 3 }}>Save</Button>
        </Box>
      </Box>

      {previewMode ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ResumePreview resume={localResume} />
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="caption" color="text.secondary">Completion</Typography>
                <Typography variant="caption" fontWeight={700} sx={{ color: accentColor }}>
                  {Math.round(((builderStep + 1) / STEPS.length) * 100)}%
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={((builderStep + 1) / STEPS.length) * 100}
                sx={{ height: 6, borderRadius: 3, "& .MuiLinearProgress-bar": { bgcolor: accentColor } }} />
            </Box>

            <Tabs value={builderStep} onChange={(_, v) => dispatch(setBuilderStep(v))}
              variant="scrollable" scrollButtons="auto"
              sx={{ mb: 3, "& .MuiTabs-indicator": { height: 3, borderRadius: 2, bgcolor: accentColor } }}>
              {STEPS.map((step, i) => (
                <Tab key={i} icon={step.icon} label={step.label} iconPosition="start"
                  sx={{ minHeight: 48, fontSize: "0.78rem", fontWeight: builderStep === i ? 700 : 400 }} />
              ))}
            </Tabs>

            <Card sx={{ borderRadius: 4, minHeight: 400 }}>
              <CardContent sx={{ p: 3 }}>
                <AnimatePresence mode="wait">
                  <motion.div key={builderStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                    {stepComponents[builderStep]}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button variant="outlined" startIcon={<ArrowBack />} disabled={builderStep === 0}
                onClick={() => dispatch(setBuilderStep(builderStep - 1))} sx={{ borderRadius: 3 }}>Previous</Button>
              {builderStep < STEPS.length - 1 ? (
                <Button variant="contained" endIcon={<ArrowForward />}
                  onClick={() => dispatch(setBuilderStep(builderStep + 1))}
                  sx={{ borderRadius: 3, bgcolor: accentColor, "&:hover": { bgcolor: accentColor } }}>Next</Button>
              ) : (
                <Button variant="contained" color="success" startIcon={<Check />} onClick={handleSave} sx={{ borderRadius: 3 }}>
                  Save & Finish
                </Button>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} lg={5} sx={{ display: { xs: "none", lg: "block" } }}>
            <Box sx={{ position: "sticky", top: 80 }}>
              <Typography variant="caption" fontWeight={700} color="text.secondary" gutterBottom display="block">
                LIVE PREVIEW — {currentTmpl?.label?.toUpperCase()}
              </Typography>
              <Box sx={{ transform: "scale(0.68)", transformOrigin: "top left", width: "147%",
                border: "1px solid", borderColor: "divider", borderRadius: 3, overflow: "hidden",
                boxShadow: `0 4px 32px ${accentColor}20` }}>
                <ResumePreview resume={localResume} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

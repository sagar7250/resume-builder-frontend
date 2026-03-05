import React from "react";
import { Box, Typography, Grid, Chip } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";
import { ResumeTemplate } from "../../types";

export const TEMPLATES: {
  id: ResumeTemplate; label: string; tag: string; color: string; desc: string; dark?: boolean;
}[] = [
  { id: "FRESHER",   label: "Fresh Start",   tag: "New Grads",        color: "#06B6D4", desc: "Clean & welcoming, education-first layout" },
  { id: "MODERN",    label: "Modern Pro",    tag: "2–5 yrs exp",      color: "#6C63FF", desc: "Polished sidebar with skill bars" },
  { id: "EXECUTIVE", label: "Executive",     tag: "Senior / CXO",     color: "#F59E0B", desc: "Authoritative dark header, two-column" },
  { id: "CREATIVE",  label: "Creative",      tag: "Designers / Art",  color: "#F97316", desc: "Bold orange with card-based layout" },
  { id: "TECH",      label: "Tech Stack",    tag: "Engineers / Dev",  color: "#10B981", desc: "Dark theme, terminal-style, GitHub-inspired", dark: true },
  { id: "MINIMAL",   label: "Minimal",       tag: "All levels",       color: "#64748B", desc: "Elegant typography, nothing extra" },
  { id: "ACADEMIC",  label: "Academic",      tag: "Research / PhD",   color: "#7C3AED", desc: "Publication-style, GPA & research focus" },
  { id: "CORPORATE", label: "Corporate",     tag: "Finance / Law",    color: "#B45309", desc: "Traditional & trustworthy, amber accents" },
];

interface Props {
  selected: ResumeTemplate;
  onSelect: (t: ResumeTemplate) => void;
}

export default function TemplatePicker({ selected, onSelect }: Props) {
  return (
    <Grid container spacing={1.5}>
      {TEMPLATES.map((t, i) => {
        const isSelected = selected === t.id;
        return (
          <Grid item xs={6} sm={4} md={3} key={t.id}>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Box
                onClick={() => onSelect(t.id)}
                sx={{
                  p: 1.5, borderRadius: 3, cursor: "pointer", position: "relative",
                  border: "2px solid",
                  borderColor: isSelected ? t.color : "divider",
                  bgcolor: isSelected ? `${t.color}10` : t.dark ? "#0D1117" : "background.paper",
                  transition: "all 0.2s",
                  "&:hover": { borderColor: t.color, boxShadow: `0 4px 20px ${t.color}30` },
                }}
              >
                {isSelected && (
                  <CheckCircle sx={{ position: "absolute", top: 8, right: 8, fontSize: 18, color: t.color }} />
                )}
                {/* Mini template preview */}
                <Box sx={{ height: 70, bgcolor: t.dark ? "#161B22" : `${t.color}15`, borderRadius: 2,
                  mb: 1, overflow: "hidden", position: "relative" }}>
                  <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 22, bgcolor: t.color, opacity: 0.85 }} />
                  {t.id === "MODERN" && (
                    <Box sx={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "38%", bgcolor: `${t.color}40` }} />
                  )}
                  {(t.id === "EXECUTIVE" || t.id === "CORPORATE") && (
                    <Box sx={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "35%", bgcolor: `${t.color}20` }} />
                  )}
                  {[28, 36, 44, 52].map((top, li) => (
                    <Box key={li} sx={{
                      position: "absolute", top, left: t.id === "MODERN" ? "42%" : 10,
                      right: (t.id === "EXECUTIVE" || t.id === "CORPORATE") ? "38%" : 10,
                      height: 3, bgcolor: t.dark ? "#30363D" : `${t.color}30`,
                      borderRadius: 1, width: `${70 - li * 10}%`,
                    }} />
                  ))}
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", color: t.dark ? "#E6EDF3" : "text.primary" }}>
                  {t.label}
                </Typography>
                <Chip label={t.tag} size="small" sx={{
                  mt: 0.4, height: 18, fontSize: "0.6rem", fontWeight: 700,
                  bgcolor: `${t.color}20`, color: t.color, border: "none",
                }} />
                <Typography sx={{ fontSize: "0.65rem", color: "text.secondary", mt: 0.5, lineHeight: 1.4 }}>
                  {t.desc}
                </Typography>
              </Box>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
}

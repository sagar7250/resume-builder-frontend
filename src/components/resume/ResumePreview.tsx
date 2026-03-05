import React, { useRef } from "react";
import { Box, Typography, Chip, Button, Divider, LinearProgress } from "@mui/material";
import { Print, Email, Phone, LocationOn, LinkedIn, GitHub, Language, Circle } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { Resume } from "../../types";

export type TemplateId =
  | "FRESHER"
  | "MODERN"
  | "EXECUTIVE"
  | "CREATIVE"
  | "TECH"
  | "MINIMAL"
  | "ACADEMIC"
  | "CORPORATE";

export const TEMPLATES: { id: TemplateId; label: string; tag: string; color: string; desc: string }[] = [
  { id: "FRESHER",   label: "Fresh Start",   tag: "Freshers",       color: "#06B6D4", desc: "Clean & welcoming for new grads" },
  { id: "MODERN",    label: "Modern Pro",    tag: "2-5 yrs exp",    color: "#6C63FF", desc: "Polished two-column layout" },
  { id: "EXECUTIVE", label: "Executive",     tag: "Senior / CXO",   color: "#1E293B", desc: "Authoritative & refined" },
  { id: "CREATIVE",  label: "Creative",      tag: "Designers / Art", color: "#F97316", desc: "Bold & expressive" },
  { id: "TECH",      label: "Tech Stack",    tag: "Engineers / Dev", color: "#10B981", desc: "Code-inspired, skills-first" },
  { id: "MINIMAL",   label: "Minimal",       tag: "All levels",     color: "#64748B", desc: "Elegant typographic focus" },
  { id: "ACADEMIC",  label: "Academic",      tag: "Research / PhD",  color: "#7C3AED", desc: "Publication-style layout" },
  { id: "CORPORATE", label: "Corporate",     tag: "Finance / Law",   color: "#B45309", desc: "Traditional & trustworthy" },
];

// ─── Shared helpers ────────────────────────────────────────────────────────────
const ContactItem = ({ icon, text }: { icon: React.ReactNode; text?: string }) =>
  text ? <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>{icon}<Typography variant="caption">{text}</Typography></Box> : null;

const SectionHead = ({ title, color, underline = true }: { title: string; color: string; underline?: boolean }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography sx={{ fontWeight: 800, fontSize: "0.65rem", letterSpacing: 3, color, textTransform: "uppercase" }}>{title}</Typography>
    {underline && <Box sx={{ mt: 0.4, height: 2, width: 36, bgcolor: color, borderRadius: 1 }} />}
  </Box>
);

// ─── FRESHER TEMPLATE ─────────────────────────────────────────────────────────
function FresherTemplate({ resume }: { resume: Resume }) {
  return (
    <Box sx={{ fontFamily: '"Nunito", "Plus Jakarta Sans", sans-serif', bgcolor: "#fff", minHeight: "297mm" }}>
      {/* Teal header with wave */}
      <Box sx={{ bgcolor: "#06B6D4", p: 4, pb: 5, position: "relative", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", bottom: -20, left: 0, right: 0, height: 40,
          bgcolor: "#fff", borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />
        <Box sx={{ position: "absolute", top: -60, right: -60, width: 200, height: 200,
          borderRadius: "50%", bgcolor: "rgba(255,255,255,0.08)" }} />
        <Typography sx={{ fontWeight: 900, fontSize: "2rem", color: "#fff", lineHeight: 1.1 }}>
          {resume.fullName || "Your Name"}
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", mt: 0.5, mb: 2 }}>
          {resume.summary?.split(".")[0] || "Aspiring Professional"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, color: "rgba(255,255,255,0.9)" }}>
          <ContactItem icon={<Email sx={{ fontSize: 13 }} />} text={resume.email} />
          <ContactItem icon={<Phone sx={{ fontSize: 13 }} />} text={resume.phone} />
          <ContactItem icon={<LocationOn sx={{ fontSize: 13 }} />} text={resume.location} />
          <ContactItem icon={<LinkedIn sx={{ fontSize: 13 }} />} text={resume.linkedin} />
          <ContactItem icon={<GitHub sx={{ fontSize: 13 }} />} text={resume.github} />
        </Box>
      </Box>

      <Box sx={{ px: 4, pt: 3, pb: 4 }}>
        {/* Objective */}
        {resume.summary && (
          <Box sx={{ mb: 3, p: 2.5, bgcolor: "#F0FDFE", borderRadius: 3, borderLeft: "4px solid #06B6D4" }}>
            <Typography sx={{ fontWeight: 700, fontSize: "0.7rem", letterSpacing: 2, color: "#06B6D4", mb: 1 }}>CAREER OBJECTIVE</Typography>
            <Typography variant="body2" sx={{ color: "#334155", lineHeight: 1.8 }}>{resume.summary}</Typography>
          </Box>
        )}

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          <Box>
            {/* Education first for freshers */}
            {resume.educations?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <SectionHead title="Education" color="#06B6D4" />
                {resume.educations.map((edu, i) => (
                  <Box key={i} sx={{ mb: 2, p: 1.5, bgcolor: "#F8FAFC", borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{edu.degree}</Typography>
                    <Typography sx={{ color: "#06B6D4", fontSize: "0.8rem", fontWeight: 600 }}>{edu.institution}</Typography>
                    <Typography variant="caption" color="text.secondary">{edu.startDate} — {edu.current ? "Present" : edu.endDate}</Typography>
                    {edu.grade && <Typography variant="caption" sx={{ display: "block", color: "#10B981", fontWeight: 700 }}>GPA/Grade: {edu.grade}</Typography>}
                  </Box>
                ))}
              </Box>
            )}

            {/* Skills */}
            {resume.skills?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <SectionHead title="Skills" color="#06B6D4" />
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                  {resume.skills.map((s, i) => (
                    <Chip key={i} label={s.name} size="small" sx={{
                      bgcolor: "#E0F7FA", color: "#0E7490", fontWeight: 600, fontSize: "0.72rem",
                      border: "1px solid #A5F3FC"
                    }} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <Box>
            {/* Projects */}
            {resume.projects?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <SectionHead title="Projects" color="#06B6D4" />
                {resume.projects.map((p, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{p.name}</Typography>
                    {p.technologies && <Typography variant="caption" sx={{ color: "#06B6D4", fontWeight: 600 }}>{p.technologies}</Typography>}
                    {p.description && <Typography variant="caption" sx={{ display: "block", color: "#475569", mt: 0.3 }}>{p.description}</Typography>}
                  </Box>
                ))}
              </Box>
            )}

            {/* Certifications */}
            {resume.certifications?.length > 0 && (
              <Box>
                <SectionHead title="Certifications" color="#06B6D4" />
                {resume.certifications.map((c, i) => (
                  <Box key={i} sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                    <Circle sx={{ fontSize: 6, color: "#06B6D4" }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.8rem" }}>{c.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{c.issuer}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Experience if any */}
        {resume.experiences?.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <SectionHead title="Internships & Experience" color="#06B6D4" />
            {resume.experiences.map((exp, i) => (
              <Box key={i} sx={{ mb: 2, pl: 2, borderLeft: "2px solid #A5F3FC" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{exp.position}</Typography>
                <Typography sx={{ color: "#06B6D4", fontSize: "0.8rem", fontWeight: 600 }}>{exp.company}</Typography>
                <Typography variant="caption" color="text.secondary">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</Typography>
                {exp.description && <Typography variant="body2" sx={{ mt: 0.5, color: "#475569", whiteSpace: "pre-line" }}>{exp.description}</Typography>}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── MODERN PRO TEMPLATE ──────────────────────────────────────────────────────
function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <Box sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', bgcolor: "#fff", minHeight: "297mm", display: "grid", gridTemplateColumns: "260px 1fr" }}>
      {/* Left sidebar */}
      <Box sx={{ bgcolor: "#1E1B4B", color: "#fff", p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ width: 80, height: 80, borderRadius: "50%", bgcolor: "#6C63FF",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2rem", fontWeight: 900, color: "#fff", mx: "auto" }}>
          {(resume.fullName || "?")[0]}
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", lineHeight: 1.2 }}>{resume.fullName || "Your Name"}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
          {[
            { icon: <Email sx={{ fontSize: 13 }} />, text: resume.email },
            { icon: <Phone sx={{ fontSize: 13 }} />, text: resume.phone },
            { icon: <LocationOn sx={{ fontSize: 13 }} />, text: resume.location },
            { icon: <LinkedIn sx={{ fontSize: 13 }} />, text: resume.linkedin },
            { icon: <GitHub sx={{ fontSize: 13 }} />, text: resume.github },
            { icon: <Language sx={{ fontSize: 13 }} />, text: resume.website },
          ].map(({ icon, text }, i) => text ? (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, color: "rgba(255,255,255,0.8)" }}>
              {icon}<Typography sx={{ fontSize: "0.72rem" }}>{text}</Typography>
            </Box>
          ) : null)}
        </Box>

        {resume.skills?.length > 0 && (
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "0.6rem", letterSpacing: 3, color: "#A5B4FC", mb: 1.5, textTransform: "uppercase" }}>Skills</Typography>
            {resume.skills.map((s, i) => (
              <Box key={i} sx={{ mb: 1.2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.3 }}>
                  <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.9)" }}>{s.name}</Typography>
                  <Typography sx={{ fontSize: "0.65rem", color: "#A5B4FC" }}>{s.level}</Typography>
                </Box>
                <LinearProgress variant="determinate"
                  value={s.level === "EXPERT" ? 95 : s.level === "ADVANCED" ? 80 : s.level === "INTERMEDIATE" ? 60 : 35}
                  sx={{ height: 3, borderRadius: 2, bgcolor: "rgba(255,255,255,0.1)",
                    "& .MuiLinearProgress-bar": { bgcolor: "#6C63FF", borderRadius: 2 } }} />
              </Box>
            ))}
          </Box>
        )}

        {resume.certifications?.length > 0 && (
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "0.6rem", letterSpacing: 3, color: "#A5B4FC", mb: 1.5, textTransform: "uppercase" }}>Certifications</Typography>
            {resume.certifications.map((c, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>{c.name}</Typography>
                <Typography sx={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>{c.issuer}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Right content */}
      <Box sx={{ p: 3.5, display: "flex", flexDirection: "column", gap: 2.5 }}>
        {resume.summary && (
          <Box>
            <SectionHead title="Professional Summary" color="#6C63FF" />
            <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.8 }}>{resume.summary}</Typography>
          </Box>
        )}
        {resume.experiences?.length > 0 && (
          <Box>
            <SectionHead title="Work Experience" color="#6C63FF" />
            {resume.experiences.map((exp, i) => (
              <Box key={i} sx={{ mb: 2.5, position: "relative", pl: 2,
                "&::before": { content: '""', position: "absolute", left: 0, top: 6, bottom: 0, width: 2, bgcolor: "#EEF2FF" } }}>
                <Box sx={{ position: "absolute", left: -4, top: 6, width: 10, height: 10, borderRadius: "50%", bgcolor: "#6C63FF" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.9rem" }}>{exp.position}</Typography>
                    <Typography sx={{ color: "#6C63FF", fontWeight: 700, fontSize: "0.8rem" }}>{exp.company}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" color="text.secondary">{exp.startDate} — {exp.current ? "Present" : exp.endDate}</Typography>
                    {exp.location && <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>{exp.location}</Typography>}
                  </Box>
                </Box>
                {exp.description && <Typography variant="body2" sx={{ mt: 1, color: "#4B5563", lineHeight: 1.75, whiteSpace: "pre-line" }}>{exp.description}</Typography>}
              </Box>
            ))}
          </Box>
        )}
        {resume.educations?.length > 0 && (
          <Box>
            <SectionHead title="Education" color="#6C63FF" />
            {resume.educations.map((edu, i) => (
              <Box key={i} sx={{ mb: 1.5, display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{edu.degree}{edu.fieldOfStudy ? ` — ${edu.fieldOfStudy}` : ""}</Typography>
                  <Typography sx={{ color: "#6C63FF", fontSize: "0.78rem" }}>{edu.institution}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: "right" }}>{edu.startDate} — {edu.current ? "Present" : edu.endDate}</Typography>
              </Box>
            ))}
          </Box>
        )}
        {resume.projects?.length > 0 && (
          <Box>
            <SectionHead title="Projects" color="#6C63FF" />
            {resume.projects.map((p, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{p.name}</Typography>
                {p.technologies && <Chip label={p.technologies} size="small" sx={{ mt: 0.3, bgcolor: "#EEF2FF", color: "#6C63FF", fontWeight: 600, fontSize: "0.68rem" }} />}
                {p.description && <Typography variant="caption" sx={{ display: "block", mt: 0.5, color: "#4B5563" }}>{p.description}</Typography>}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── EXECUTIVE TEMPLATE ───────────────────────────────────────────────────────
function ExecutiveTemplate({ resume }: { resume: Resume }) {
  return (
    <Box sx={{ fontFamily: '"Playfair Display", "DM Serif Display", serif', bgcolor: "#fff", minHeight: "297mm" }}>
      <Box sx={{ bgcolor: "#0F172A", p: "40px 48px 32px", color: "#fff" }}>
        <Typography sx={{ fontSize: "2.2rem", fontWeight: 700, letterSpacing: 1, lineHeight: 1.1 }}>
          {resume.fullName || "Your Name"}
        </Typography>
        <Box sx={{ width: 60, height: 3, bgcolor: "#F59E0B", my: 1.5 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, color: "rgba(255,255,255,0.75)", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          <ContactItem icon={<Email sx={{ fontSize: 13 }} />} text={resume.email} />
          <ContactItem icon={<Phone sx={{ fontSize: 13 }} />} text={resume.phone} />
          <ContactItem icon={<LocationOn sx={{ fontSize: 13 }} />} text={resume.location} />
          <ContactItem icon={<LinkedIn sx={{ fontSize: 13 }} />} text={resume.linkedin} />
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 0 }}>
        <Box sx={{ p: "32px 40px", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          {resume.summary && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, letterSpacing: 2, fontSize: "0.65rem", color: "#F59E0B", mb: 1, textTransform: "uppercase", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Executive Profile</Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "#1E293B", lineHeight: 1.9, fontStyle: "italic" }}>{resume.summary}</Typography>
            </Box>
          )}
          {resume.experiences?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, letterSpacing: 2, fontSize: "0.65rem", color: "#F59E0B", mb: 2, textTransform: "uppercase" }}>Career History</Typography>
              {resume.experiences.map((exp, i) => (
                <Box key={i} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2E8F0", pb: 0.5, mb: 1 }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#0F172A" }}>{exp.position}</Typography>
                      <Typography sx={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.85rem" }}>{exp.company}</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 600, mt: 0.5 }}>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</Typography>
                  </Box>
                  {exp.description && <Typography sx={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.8, whiteSpace: "pre-line" }}>{exp.description}</Typography>}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ bgcolor: "#F8FAFC", p: "32px 24px", borderLeft: "1px solid #E2E8F0", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
          {resume.skills?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, letterSpacing: 2, fontSize: "0.65rem", color: "#F59E0B", mb: 1.5, textTransform: "uppercase" }}>Core Competencies</Typography>
              {resume.skills.map((s, i) => (
                <Box key={i} sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 6, height: 6, bgcolor: "#F59E0B", borderRadius: "50%" }} />
                  <Typography sx={{ fontSize: "0.82rem", color: "#1E293B" }}>{s.name}</Typography>
                </Box>
              ))}
            </Box>
          )}
          {resume.educations?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, letterSpacing: 2, fontSize: "0.65rem", color: "#F59E0B", mb: 1.5, textTransform: "uppercase" }}>Education</Typography>
              {resume.educations.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.82rem" }}>{edu.degree}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#F59E0B" }}>{edu.institution}</Typography>
                  <Typography variant="caption" color="text.secondary">{edu.endDate}</Typography>
                </Box>
              ))}
            </Box>
          )}
          {resume.certifications?.length > 0 && (
            <Box>
              <Typography sx={{ fontWeight: 700, letterSpacing: 2, fontSize: "0.65rem", color: "#F59E0B", mb: 1.5, textTransform: "uppercase" }}>Certifications</Typography>
              {resume.certifications.map((c, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 700 }}>{c.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{c.issuer} · {c.issueDate}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// ─── CREATIVE TEMPLATE ────────────────────────────────────────────────────────
function CreativeTemplate({ resume }: { resume: Resume }) {
  return (
    <Box sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', bgcolor: "#fff", minHeight: "297mm" }}>
      {/* Diagonal header */}
      <Box sx={{ position: "relative", bgcolor: "#F97316", p: "48px 48px 64px", overflow: "hidden" }}>
        <Box sx={{ position: "absolute", bottom: -30, right: -30, width: 200, height: 200,
          borderRadius: "50%", bgcolor: "rgba(255,255,255,0.12)" }} />
        <Box sx={{ position: "absolute", top: -40, left: "40%", width: 150, height: 150,
          borderRadius: "50%", bgcolor: "rgba(0,0,0,0.08)" }} />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography sx={{ fontSize: "2.6rem", fontWeight: 900, color: "#fff", lineHeight: 1, mb: 1, textTransform: "uppercase", letterSpacing: -1 }}>
            {resume.fullName || "Your Name"}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: "1rem", mb: 2 }}>
            {resume.experiences?.[0]?.position || "Creative Professional"}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, color: "rgba(255,255,255,0.85)" }}>
            <ContactItem icon={<Email sx={{ fontSize: 12 }} />} text={resume.email} />
            <ContactItem icon={<Phone sx={{ fontSize: 12 }} />} text={resume.phone} />
            <ContactItem icon={<Language sx={{ fontSize: 12 }} />} text={resume.website} />
            <ContactItem icon={<LinkedIn sx={{ fontSize: 12 }} />} text={resume.linkedin} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 220px", mt: -4, position: "relative", zIndex: 2 }}>
        <Box sx={{ bgcolor: "#fff", mx: 2, borderRadius: "12px 12px 0 0", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)", p: "28px 32px" }}>
          {resume.summary && (
            <Box sx={{ mb: 3 }}>
              <SectionHead title="About Me" color="#F97316" />
              <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.85 }}>{resume.summary}</Typography>
            </Box>
          )}
          {resume.experiences?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <SectionHead title="Experience" color="#F97316" />
              {resume.experiences.map((exp, i) => (
                <Box key={i} sx={{ mb: 2.5, p: 2, bgcolor: "#FFF7ED", borderRadius: 2, borderLeft: "3px solid #F97316" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 800, fontSize: "0.88rem" }}>{exp.position}</Typography>
                      <Typography sx={{ color: "#F97316", fontWeight: 700, fontSize: "0.78rem" }}>{exp.company}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">{exp.startDate} – {exp.current ? "Now" : exp.endDate}</Typography>
                  </Box>
                  {exp.description && <Typography variant="body2" sx={{ mt: 1, color: "#4B5563", whiteSpace: "pre-line" }}>{exp.description}</Typography>}
                </Box>
              ))}
            </Box>
          )}
          {resume.projects?.length > 0 && (
            <Box>
              <SectionHead title="Featured Projects" color="#F97316" />
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                {resume.projects.map((p, i) => (
                  <Box key={i} sx={{ p: 1.5, border: "2px solid #FED7AA", borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: "0.82rem" }}>{p.name}</Typography>
                    {p.technologies && <Typography sx={{ fontSize: "0.68rem", color: "#F97316", fontWeight: 600 }}>{p.technologies}</Typography>}
                    {p.description && <Typography variant="caption" sx={{ color: "#6B7280" }}>{p.description}</Typography>}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={{ p: "28px 20px", display: "flex", flexDirection: "column", gap: 3 }}>
          {resume.skills?.length > 0 && (
            <Box>
              <SectionHead title="Skills" color="#F97316" />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                {resume.skills.map((s, i) => (
                  <Box key={i} sx={{ px: 1.2, py: 0.4, bgcolor: "#FFF7ED", border: "1.5px solid #FED7AA",
                    borderRadius: 2, fontSize: "0.72rem", fontWeight: 700, color: "#C2410C" }}>{s.name}</Box>
                ))}
              </Box>
            </Box>
          )}
          {resume.educations?.length > 0 && (
            <Box>
              <SectionHead title="Education" color="#F97316" />
              {resume.educations.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.82rem" }}>{edu.degree}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "#F97316" }}>{edu.institution}</Typography>
                  <Typography variant="caption" color="text.secondary">{edu.endDate}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// ─── TECH TEMPLATE ─────────────────────────────────────────────────────────────
function TechTemplate({ resume }: { resume: Resume }) {
  const skillLevels: Record<string, number> = { BEGINNER: 25, INTERMEDIATE: 55, ADVANCED: 80, EXPERT: 96 };
  return (
    <Box sx={{ fontFamily: '"JetBrains Mono", "Courier New", monospace', bgcolor: "#0D1117", color: "#E6EDF3", minHeight: "297mm" }}>
      {/* Terminal-style header */}
      <Box sx={{ p: 3, borderBottom: "1px solid #30363D" }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          {["#FF5F56","#FFBD2E","#27C93F"].map((c, i) => (
            <Box key={i} sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: c }} />
          ))}
        </Box>
        <Typography sx={{ color: "#58A6FF", fontSize: "0.75rem", mb: 1 }}>$ cat profile.json</Typography>
        <Typography sx={{ fontWeight: 900, fontSize: "1.8rem", color: "#E6EDF3", letterSpacing: -0.5 }}>
          {resume.fullName || "Your Name"}
        </Typography>
        <Typography sx={{ color: "#10B981", fontSize: "0.85rem", mt: 0.5 }}>
          {resume.experiences?.[0]?.position || "Software Engineer"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2.5, mt: 2, color: "#8B949E", fontSize: "0.72rem" }}>
          {resume.email && <span>📧 {resume.email}</span>}
          {resume.phone && <span>📱 {resume.phone}</span>}
          {resume.github && <span>🐙 {resume.github}</span>}
          {resume.linkedin && <span>💼 {resume.linkedin}</span>}
          {resume.location && <span>📍 {resume.location}</span>}
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 240px" }}>
        <Box sx={{ p: 3, borderRight: "1px solid #30363D" }}>
          {resume.summary && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: "#58A6FF", fontSize: "0.72rem", mb: 1 }}>// Summary</Typography>
              <Typography sx={{ color: "#8B949E", fontSize: "0.82rem", lineHeight: 1.8, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{resume.summary}</Typography>
            </Box>
          )}
          {resume.experiences?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: "#58A6FF", fontSize: "0.72rem", mb: 2 }}>// Experience</Typography>
              {resume.experiences.map((exp, i) => (
                <Box key={i} sx={{ mb: 2.5, p: 2, bgcolor: "#161B22", borderRadius: 2, border: "1px solid #30363D" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#E6EDF3" }}>{exp.position}</Typography>
                      <Typography sx={{ color: "#10B981", fontSize: "0.78rem" }}>{exp.company}</Typography>
                    </Box>
                    <Typography sx={{ color: "#6E7681", fontSize: "0.7rem" }}>{exp.startDate} → {exp.current ? "now" : exp.endDate}</Typography>
                  </Box>
                  {exp.description && (
                    <Typography sx={{ mt: 1, color: "#8B949E", fontSize: "0.78rem", lineHeight: 1.75, whiteSpace: "pre-line", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      {exp.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
          {resume.projects?.length > 0 && (
            <Box>
              <Typography sx={{ color: "#58A6FF", fontSize: "0.72rem", mb: 2 }}>// Projects</Typography>
              {resume.projects.map((p, i) => (
                <Box key={i} sx={{ mb: 2, p: 2, bgcolor: "#161B22", borderRadius: 2, border: "1px solid #30363D" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#E6EDF3" }}>{p.name}</Typography>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {p.githubUrl && <Typography sx={{ fontSize: "0.68rem", color: "#58A6FF" }}>GitHub</Typography>}
                      {p.liveUrl && <Typography sx={{ fontSize: "0.68rem", color: "#10B981", ml: 1 }}>Live</Typography>}
                    </Box>
                  </Box>
                  {p.technologies && (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.8 }}>
                      {p.technologies.split(",").map((t, ti) => (
                        <Box key={ti} sx={{ px: 1, py: 0.2, bgcolor: "#0D419D33", border: "1px solid #1F6FEB55",
                          borderRadius: 1, fontSize: "0.65rem", color: "#58A6FF" }}>{t.trim()}</Box>
                      ))}
                    </Box>
                  )}
                  {p.description && <Typography sx={{ mt: 0.8, color: "#8B949E", fontSize: "0.75rem", fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{p.description}</Typography>}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ p: 3 }}>
          {resume.skills?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: "#58A6FF", fontSize: "0.72rem", mb: 2 }}>// Skills</Typography>
              {resume.skills.map((s, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.4 }}>
                    <Typography sx={{ fontSize: "0.75rem", color: "#E6EDF3" }}>{s.name}</Typography>
                    <Typography sx={{ fontSize: "0.6rem", color: "#10B981" }}>{skillLevels[s.level] || 60}%</Typography>
                  </Box>
                  <Box sx={{ height: 3, bgcolor: "#30363D", borderRadius: 1 }}>
                    <Box sx={{ height: "100%", width: `${skillLevels[s.level] || 60}%`, bgcolor: "#10B981", borderRadius: 1 }} />
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          {resume.educations?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ color: "#58A6FF", fontSize: "0.72rem", mb: 2 }}>// Education</Typography>
              {resume.educations.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: "#161B22", borderRadius: 2, border: "1px solid #30363D" }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.78rem", color: "#E6EDF3" }}>{edu.degree}</Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#10B981" }}>{edu.institution}</Typography>
                  <Typography sx={{ fontSize: "0.65rem", color: "#6E7681" }}>{edu.endDate}</Typography>
                </Box>
              ))}
            </Box>
          )}
          {resume.certifications?.length > 0 && (
            <Box>
              <Typography sx={{ color: "#58A6FF", fontSize: "0.72rem", mb: 2 }}>// Certs</Typography>
              {resume.certifications.map((c, i) => (
                <Box key={i} sx={{ mb: 1, p: 1, bgcolor: "#161B22", borderRadius: 1.5, border: "1px solid #30363D" }}>
                  <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: "#E6EDF3" }}>{c.name}</Typography>
                  <Typography sx={{ fontSize: "0.65rem", color: "#6E7681" }}>{c.issuer}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// ─── MINIMAL TEMPLATE ─────────────────────────────────────────────────────────
function MinimalTemplate({ resume }: { resume: Resume }) {
  return (
    <Box sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', bgcolor: "#fff", minHeight: "297mm", p: "48px 56px" }}>
      <Box sx={{ borderBottom: "2px solid #1A1A2E", pb: 3, mb: 3 }}>
        <Typography sx={{ fontSize: "2.4rem", fontWeight: 300, letterSpacing: -1, color: "#1A1A2E", lineHeight: 1 }}>
          {resume.fullName || "Your Name"}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1.5, color: "#6B7280", fontSize: "0.78rem" }}>
          {resume.email && <span>{resume.email}</span>}
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
          {resume.linkedin && <span>{resume.linkedin}</span>}
          {resume.website && <span>{resume.website}</span>}
        </Box>
      </Box>

      {resume.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.9, maxWidth: "72ch" }}>{resume.summary}</Typography>
        </Box>
      )}

      {resume.experiences?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: 4, color: "#9CA3AF", mb: 2, textTransform: "uppercase" }}>Experience</Typography>
          {resume.experiences.map((exp, i) => (
            <Box key={i} sx={{ mb: 2.5, display: "grid", gridTemplateColumns: "160px 1fr", gap: 3 }}>
              <Box>
                <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>{exp.startDate} –</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>{exp.current ? "Present" : exp.endDate}</Typography>
                <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", mt: 0.3 }}>{exp.location}</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#111827" }}>{exp.position}</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#374151", mb: 0.5 }}>{exp.company}</Typography>
                {exp.description && <Typography sx={{ fontSize: "0.78rem", color: "#6B7280", lineHeight: 1.75, whiteSpace: "pre-line" }}>{exp.description}</Typography>}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {resume.educations?.length > 0 && (
          <Box>
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: 4, color: "#9CA3AF", mb: 2, textTransform: "uppercase" }}>Education</Typography>
            {resume.educations.map((edu, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{edu.degree}</Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "#374151" }}>{edu.institution}</Typography>
                <Typography sx={{ fontSize: "0.72rem", color: "#9CA3AF" }}>{edu.endDate}</Typography>
              </Box>
            ))}
          </Box>
        )}
        {resume.skills?.length > 0 && (
          <Box>
            <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: 4, color: "#9CA3AF", mb: 2, textTransform: "uppercase" }}>Skills</Typography>
            <Typography sx={{ fontSize: "0.82rem", color: "#374151", lineHeight: 2 }}>
              {resume.skills.map(s => s.name).join("  ·  ")}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── ACADEMIC TEMPLATE ────────────────────────────────────────────────────────
function AcademicTemplate({ resume }: { resume: Resume }) {
  return (
    <Box sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', bgcolor: "#fff", minHeight: "297mm", p: "40px 48px" }}>
      <Box sx={{ textAlign: "center", borderBottom: "3px double #7C3AED", pb: 3, mb: 3 }}>
        <Typography sx={{ fontSize: "1.9rem", fontWeight: 700, color: "#1A1A2E", letterSpacing: 1 }}>{resume.fullName || "Your Name"}</Typography>
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3, mt: 1, color: "#6B7280", fontSize: "0.78rem" }}>
          {resume.email && <span>✉ {resume.email}</span>}
          {resume.phone && <span>✆ {resume.phone}</span>}
          {resume.location && <span>⚑ {resume.location}</span>}
          {resume.website && <span>🌐 {resume.website}</span>}
        </Box>
      </Box>

      {resume.summary && (
        <Box sx={{ mb: 3, textAlign: "justify" }}>
          <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: 2, color: "#7C3AED", mb: 1, textTransform: "uppercase" }}>Research Interests / Summary</Typography>
          <Typography sx={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.9 }}>{resume.summary}</Typography>
        </Box>
      )}

      {resume.educations?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: 2, color: "#7C3AED", mb: 1.5, textTransform: "uppercase", borderBottom: "1px solid #EDE9FE", pb: 0.5 }}>Education</Typography>
          {resume.educations.map((edu, i) => (
            <Box key={i} sx={{ mb: 1.5, display: "grid", gridTemplateColumns: "1fr auto" }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</Typography>
                <Typography sx={{ fontStyle: "italic", fontSize: "0.82rem", color: "#374151" }}>{edu.institution}{edu.location ? `, ${edu.location}` : ""}</Typography>
                {edu.grade && <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>GPA: {edu.grade}</Typography>}
              </Box>
              <Typography sx={{ fontSize: "0.78rem", color: "#6B7280", textAlign: "right" }}>{edu.startDate} – {edu.current ? "Present" : edu.endDate}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {resume.experiences?.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: 2, color: "#7C3AED", mb: 1.5, textTransform: "uppercase", borderBottom: "1px solid #EDE9FE", pb: 0.5 }}>Research & Professional Experience</Typography>
          {resume.experiences.map((exp, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.88rem" }}>{exp.position}</Typography>
                  <Typography sx={{ fontStyle: "italic", fontSize: "0.8rem", color: "#374151" }}>{exp.company}{exp.location ? `, ${exp.location}` : ""}</Typography>
                </Box>
                <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</Typography>
              </Box>
              {exp.description && <Typography sx={{ mt: 0.8, fontSize: "0.82rem", color: "#4B5563", lineHeight: 1.8, whiteSpace: "pre-line" }}>{exp.description}</Typography>}
            </Box>
          ))}
        </Box>
      )}

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {resume.skills?.length > 0 && (
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: 2, color: "#7C3AED", mb: 1.5, textTransform: "uppercase", borderBottom: "1px solid #EDE9FE", pb: 0.5 }}>Technical Skills</Typography>
            {resume.skills.map((s, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.6 }}>
                <Typography sx={{ fontSize: "0.8rem" }}>{s.name}</Typography>
                <Typography sx={{ fontSize: "0.72rem", color: "#7C3AED", fontStyle: "italic" }}>{s.level.toLowerCase()}</Typography>
              </Box>
            ))}
          </Box>
        )}
        {resume.certifications?.length > 0 && (
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "0.75rem", letterSpacing: 2, color: "#7C3AED", mb: 1.5, textTransform: "uppercase", borderBottom: "1px solid #EDE9FE", pb: 0.5 }}>Certifications</Typography>
            {resume.certifications.map((c, i) => (
              <Box key={i} sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: "0.82rem", fontWeight: 700 }}>{c.name}</Typography>
                <Typography sx={{ fontSize: "0.73rem", fontStyle: "italic", color: "#6B7280" }}>{c.issuer}, {c.issueDate}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

// ─── CORPORATE TEMPLATE ───────────────────────────────────────────────────────
function CorporateTemplate({ resume }: { resume: Resume }) {
  return (
    <Box sx={{ fontFamily: '"Plus Jakarta Sans", sans-serif', bgcolor: "#fff", minHeight: "297mm" }}>
      <Box sx={{ bgcolor: "#78350F", p: "32px 48px" }}>
        <Typography sx={{ fontSize: "1.9rem", fontWeight: 800, color: "#FEF3C7", letterSpacing: 0.5 }}>{resume.fullName || "Your Name"}</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 1.5, color: "#FDE68A", fontSize: "0.78rem" }}>
          {resume.email && <span>📧 {resume.email}</span>}
          {resume.phone && <span>📞 {resume.phone}</span>}
          {resume.location && <span>📍 {resume.location}</span>}
          {resume.linkedin && <span>in {resume.linkedin}</span>}
        </Box>
      </Box>
      <Box sx={{ height: 6, background: "linear-gradient(90deg, #B45309, #F59E0B, #D97706)" }} />

      <Box sx={{ p: "32px 48px" }}>
        {resume.summary && (
          <Box sx={{ mb: 3, p: 2.5, bgcolor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 2 }}>
            <Typography sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: 2.5, color: "#92400E", mb: 1, textTransform: "uppercase" }}>Profile Summary</Typography>
            <Typography sx={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.85 }}>{resume.summary}</Typography>
          </Box>
        )}

        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 4 }}>
          <Box>
            {resume.experiences?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: 2.5, color: "#92400E", textTransform: "uppercase" }}>Professional Experience</Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#FDE68A" }} />
                </Box>
                {resume.experiences.map((exp, i) => (
                  <Box key={i} sx={{ mb: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Box>
                        <Typography sx={{ fontWeight: 800, fontSize: "0.9rem", color: "#1C1917" }}>{exp.position}</Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#B45309" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</Typography>
                      </Box>
                      <Box sx={{ px: 1.5, py: 0.3, bgcolor: "#FEF3C7", borderRadius: 2, height: "fit-content" }}>
                        <Typography sx={{ fontSize: "0.68rem", color: "#92400E", fontWeight: 700 }}>{exp.startDate} – {exp.current ? "Present" : exp.endDate}</Typography>
                      </Box>
                    </Box>
                    {exp.description && <Typography sx={{ fontSize: "0.82rem", color: "#4B5563", lineHeight: 1.8, whiteSpace: "pre-line" }}>{exp.description}</Typography>}
                  </Box>
                ))}
              </Box>
            )}
            {resume.projects?.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: 2.5, color: "#92400E", textTransform: "uppercase" }}>Key Projects</Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#FDE68A" }} />
                </Box>
                {resume.projects.map((p, i) => (
                  <Box key={i} sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>{p.name}</Typography>
                    {p.description && <Typography sx={{ fontSize: "0.78rem", color: "#6B7280" }}>{p.description}</Typography>}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          <Box>
            {resume.skills?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: 2, color: "#92400E", textTransform: "uppercase" }}>Core Skills</Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#FDE68A" }} />
                </Box>
                {resume.skills.map((s, i) => (
                  <Box key={i} sx={{ mb: 0.8, display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 5, height: 5, bgcolor: "#B45309", borderRadius: "50%", flexShrink: 0 }} />
                    <Typography sx={{ fontSize: "0.8rem", color: "#1C1917" }}>{s.name}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            {resume.educations?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: 2, color: "#92400E", textTransform: "uppercase" }}>Education</Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#FDE68A" }} />
                </Box>
                {resume.educations.map((edu, i) => (
                  <Box key={i} sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.82rem" }}>{edu.degree}</Typography>
                    <Typography sx={{ fontSize: "0.75rem", color: "#B45309" }}>{edu.institution}</Typography>
                    <Typography variant="caption" color="text.secondary">{edu.endDate}</Typography>
                  </Box>
                ))}
              </Box>
            )}
            {resume.certifications?.length > 0 && (
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.68rem", letterSpacing: 2, color: "#92400E", textTransform: "uppercase" }}>Certifications</Typography>
                  <Box sx={{ flex: 1, height: 1, bgcolor: "#FDE68A" }} />
                </Box>
                {resume.certifications.map((c, i) => (
                  <Box key={i} sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700 }}>{c.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{c.issuer}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
interface Props { resume: Resume; }

export default function ResumePreview({ resume }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ content: () => printRef.current, documentTitle: resume.title || "Resume" });

  const renderTemplate = () => {
    switch (resume.template) {
      case "FRESHER":   return <FresherTemplate resume={resume} />;
      case "EXECUTIVE": return <ExecutiveTemplate resume={resume} />;
      case "CREATIVE":  return <CreativeTemplate resume={resume} />;
      case "TECH":      return <TechTemplate resume={resume} />;
      case "MINIMAL":   return <MinimalTemplate resume={resume} />;
      case "ACADEMIC":  return <AcademicTemplate resume={resume} />;
      case "CORPORATE": return <CorporateTemplate resume={resume} />;
      default:          return <ModernTemplate resume={resume} />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" startIcon={<Print />} onClick={handlePrint} size="small" sx={{ borderRadius: 3 }}>
          Export PDF
        </Button>
      </Box>
      <Box ref={printRef} sx={{ boxShadow: "0 4px 32px rgba(0,0,0,0.14)", borderRadius: 2, overflow: "hidden" }}>
        {renderTemplate()}
      </Box>
    </Box>
  );
}

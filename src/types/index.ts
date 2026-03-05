export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  phone?: string;
  location?: string;
  jobTitle?: string;
  role: string;
  resumeCount: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: User;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description?: string;
  displayOrder?: number;
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  grade?: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description?: string;
  displayOrder?: number;
}

export interface Skill {
  id?: string;
  name: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  category?: string;
}

export interface Project {
  id?: string;
  name: string;
  description?: string;
  technologies?: string;
  liveUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id?: string;
  name: string;
  issuer?: string;
  credentialId?: string;
  credentialUrl?: string;
  issueDate?: string;
  expiryDate?: string;
}

export interface Resume {
  id?: string;
  title: string;
  template: ResumeTemplate;
  published: boolean;
  slug?: string;
  atsScore?: number;
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  createdAt?: string;
  updatedAt?: string;
}

export type ResumeTemplate = "FRESHER" | "MODERN" | "EXECUTIVE" | "CREATIVE" | "TECH" | "MINIMAL" | "ACADEMIC" | "CORPORATE";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}
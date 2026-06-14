export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  role: string;
  year: string;
  client?: string;
  deliverables: string[];
  metrics?: string;
  caseStudyLink?: string;
  liveLink?: string;
  githubLink?: string;
  screens?: string[];
  process?: {
    step: string;
    title: string;
    description: string;
  }[];
}

export interface Skill {
  name: string;
  level: number; // For nice progress display if needed, but designers prefer elegant cards
  category: 'core' | 'tools' | 'soft';
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  details: string;
  highlights: string[];
}

export interface Certificate {
  title: string;
  issuer: string;
  link: string;
  issueDate?: string;
  credentialId?: string;
  skills: string[];
  description?: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  portfolio?: string;
  location: string;
}

export interface Message {
  name: string;
  email: string;
  message: string;
  date: string;
  subject?: string;
  syncedToSheets?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags?: string[];
  content: string;
  readingTime?: number;
}

export interface DocPage {
  slug: string[];
  title: string;
  description?: string;
  content: string;
  order?: number;
  section?: string;
}

export interface WaitlistEntry {
  email: string;
  createdAt: string;
  source?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  organization?: string;
  message: string;
  submittedAt: string;
  /** Origin of the submission, e.g. 'chat-agent' for leads captured by the assistant. */
  source?: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ModuleCard {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'prototype' | 'beta' | 'planned';
}

export interface DocNavItem {
  title: string;
  href: string;
  children?: DocNavItem[];
}

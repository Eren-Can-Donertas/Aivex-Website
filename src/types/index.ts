export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags?: string[];
  content: string;
  readingTime?: number;
  /** Content category used for filtering: research | engineering | product | company. */
  category?: string;
  /** Turkish overlay metadata (from a sibling `.tr.mdx` file), when present. */
  titleTr?: string;
  excerptTr?: string;
  /** True when a Turkish overlay exists for this post. */
  hasTr?: boolean;
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
  role?: string;
  interest_type?: string;
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
  status:
    | 'internal-runtime'
    | 'data-connected'
    | 'in-validation'
    | 'api-ready'
    | 'beta'
    | 'risk-gate-active'
    | 'experimental';
}

export interface DocNavItem {
  title: string;
  href: string;
  children?: DocNavItem[];
}

// Single source of truth for site content.
// Flip SHOW_FINANCE to true once Gaurav bhai + Sujal approve the Financial Consultant service.

export const SHOW_FINANCE = false;

export const brand = {
  name: "ShrushtiVertex",
  tagline: "Transforming your vision into its ultimate apex",
};

export type Service = {
  id: string;
  title: string;
  blurb: string;
  // bento span hints for desktop grid
  span: string;
  draft?: boolean;
};

export const services: Service[] = [
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    blurb:
      "Scalable architecture, CI/CD, and observability that holds up under real load.",
    span: "md:col-span-3 md:row-span-2",
  },
  {
    id: "mobile",
    title: "Mobile Development",
    blurb: "Native-feel iOS & Android, shipped with Flutter and React Native.",
    span: "md:col-span-3",
  },
  {
    id: "web",
    title: "Web Development",
    blurb: "Fast, accessible, animated web experiences. Next.js to the metal.",
    span: "md:col-span-3",
  },
  {
    id: "uiux",
    title: "UI / UX Design",
    blurb:
      "Interfaces engineered for clarity and craft — every interaction intentional.",
    span: "md:col-span-2",
  },
  {
    id: "ai",
    title: "Agentic AI / Gen AI",
    blurb:
      "Autonomous agents, RAG pipelines, and AI features wired into your product.",
    span: "md:col-span-4",
  },
  {
    id: "finance",
    title: "Financial Consulting",
    blurb:
      "Modeling, fundraising strategy, and financial planning — led by Gaurav & Sujal.",
    span: "md:col-span-3",
    draft: true,
  },
];

export const visibleServices = services.filter((s) => !s.draft || SHOW_FINANCE);

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  tone: string; // accent gradient seed
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Helix Health",
    category: "Mobile · Agentic AI",
    year: "2025",
    tone: "from-emerald-500/30 to-teal-700/10",
  },
  {
    id: "p2",
    title: "Northwind Cloud",
    category: "Cloud · Infrastructure",
    year: "2025",
    tone: "from-cyan-500/30 to-emerald-700/10",
  },
  {
    id: "p3",
    title: "Atlas Commerce",
    category: "Web · UI/UX",
    year: "2024",
    tone: "from-lime-500/25 to-emerald-800/10",
  },
  {
    id: "p4",
    title: "Vault Finance",
    category: "Web · Fintech",
    year: "2024",
    tone: "from-teal-400/30 to-cyan-800/10",
  },
];

export type Person = {
  name: string;
  role: string;
  focus: string;
  initials: string;
};

export const team: Person[] = [
  {
    name: "You",
    role: "Founder · Engineering",
    focus: "App & Web Development",
    initials: "ME",
  },
  {
    name: "Gaurav",
    role: "Partner · Finance",
    focus: "Financial Strategy",
    initials: "GB",
  },
  {
    name: "Sujal",
    role: "Partner · Finance",
    focus: "Financial Consulting",
    initials: "SJ",
  },
];

export const blogs = [
  {
    title: "Shipping agentic AI that survives production",
    tag: "AI Engineering",
    read: "6 min",
  },
  {
    title: "Why your cloud bill is a design problem",
    tag: "Infrastructure",
    read: "4 min",
  },
  {
    title: "Motion that feels expensive, not noisy",
    tag: "Design",
    read: "5 min",
  },
];

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

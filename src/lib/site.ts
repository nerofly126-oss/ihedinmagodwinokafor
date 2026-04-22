import peer2learnImage from "@/assets/peer2learn.png";
import onepadImage from "@/assets/onepad.svg";
import vengrydImage from "@/assets/vengryd.jpg";

const trimValue = (value?: string) => value?.trim() ?? "";

const siteName = trimValue(import.meta.env.VITE_SITE_NAME) || "IHEDINMA GODWIN OKAFOR";
const siteRole = trimValue(import.meta.env.VITE_SITE_ROLE) || "Full-Stack Developer";
const siteDescription =
  trimValue(import.meta.env.VITE_SITE_DESCRIPTION) ||
  "Full-stack developer building polished, dependable web products with strong UX, resilient systems, and clean code.";

export const siteConfig = {
  name: siteName,
  role: siteRole,
  description: siteDescription,
  location: trimValue(import.meta.env.VITE_LOCATION) || "Remote",
  contactEmail: trimValue(import.meta.env.VITE_CONTACT_EMAIL) || "nerofly126@gmail.com",
  whatsappNumber: trimValue(import.meta.env.VITE_WHATSAPP_NUMBER) || "2349048893502",
  githubUrl: trimValue(import.meta.env.VITE_GITHUB_URL) || "https://github.com/nerofly126-oss",
  linkedinUrl: trimValue(import.meta.env.VITE_LINKEDIN_URL) || "https://www.linkedin.com/in/godwin-okafor-725a82248",
  siteUrl: trimValue(import.meta.env.VITE_SITE_URL),
  availability: "Available for freelance builds, product partnerships, and long-term engineering work.",
  hero: {
    eyebrow: siteRole,
    heading: "Shipping thoughtful digital products that feel fast, clear, and reliable.",
    body:
      "I design and build modern web experiences with a focus on performance, maintainability, and details that hold up in production.",
  },
  about: {
    heading: "I enjoy turning complexity into software people can trust.",
    body:
      "My work sits at the intersection of product thinking, frontend polish, and backend reliability. I care about clear interfaces, predictable systems, and delivery that stays maintainable after launch.",
  },
  projects: [
    {
      title: "Vengryd",
      description:
        "A hyperlocal marketplace for your community.",
      tags: ["MVP"],
      color: "from-primary/10 to-primary/5",
      image: vengrydImage,
      imageFit: "cover",
      imageBg: "",
      repoUrl: "",
      demoUrl: "https://vengryd.vercel.app",
      note: "",
    },
    {
      title: "ONEPAD",
      description:
        "All AI models into one platform.",
      tags: ["SaaS"],
      color: "from-accent/10 to-accent/5",
      image: onepadImage,
      imageFit: "contain",
      imageBg: "bg-[#0b0b0d]",
      repoUrl: "",
      demoUrl: "https://onepad.co",
      note: "",
    },
    {
      title: "peer2learn",
      description:
        "A platform for tutors to teach students.",
      tags: ["MVP"],
      color: "from-primary/10 to-accent/5",
      image: peer2learnImage,
      imageFit: "contain",
      imageBg: "bg-white",
      repoUrl: "",
      demoUrl: "https://peer2learn.com",
      note: "",
    },
  ],
  experiences: [
    {
      role: "Junior Full-Stack Developer Intern",
      company: "IT World",
      period: "2024 — 2025",
      description:
        "Worked across frontend and backend tasks, contributing to product features, debugging issues, and supporting web application delivery in a collaborative team environment.",
    },
    {
      role: "Backend Engineer Intern",
      company: "Edmoss Global Tech",
      period: "2025 — Present",
      description:
        "Building and maintaining backend services, working with APIs, database queries, and server-side logic to support reliable product functionality.",
    },
    {
      role: "Full-Stack Engineer",
      company: "onepad.co Startup",
      period: "2025 — Present",
      description:
        "Contributing across the full stack by building product features, improving user experience, and supporting scalable web platform development from frontend to backend.",
    },
  ],
} as const;

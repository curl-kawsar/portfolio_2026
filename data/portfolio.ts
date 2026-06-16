// Single source of truth for the portfolio site.
// Re-populate this file to re-theme/re-populate the same template
// for a different person — components should not need to change.

export type Project = {
  name: string;
  metric: string; // one-line outcome
  bullets: string[];
  stack: string[];
};

export type Award = {
  year: number;
  result: string; // "Champion" | "1st Runner Up" | "Top 10 Finalists" | "Participant" | "Problem Setter" | etc.
  event: string;
  location: string;
};

export type LeadershipRole = {
  title: string;
  org: string;
  bullets: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Portfolio = {
  name: string;
  role: string;
  location: string;
  photoUrl: string;
  email: string;
  phone: string;
  linkedin: string;
  resumeUrl: string;
  about: string[]; // paragraphs
  projects: Project[];
  awards: Award[];
  leadership: LeadershipRole[];
  skills: SkillGroup[];
  education: {
    institution: string;
    degree: string;
    cgpa?: string;
    thesis?: string;
    honors?: string[];
  };
};

export const portfolio: Portfolio = {
  name: "Md. Kawsar Ahmed",
  role: "Software Engineer · Data Science",
  location: "Cumilla, Bangladesh",
  photoUrl: "/photo.png",
  email: "knownaskawsar@gmail.com",
  phone: "01847556023",
  linkedin: "https://www.linkedin.com/in/curl-kawsar/",
  resumeUrl: "/resume_kawsar.pdf",

  about: [
    "I'm a language-agnostic engineer with experience across the stack. My journey began with frontend development, and I'm now deep in the world of backend systems. I primarily work with JavaScript, while staying sharp in Python and actively learning DevOps. I choose stacks by fit — not by familiarity — and care more about correctness, observability, and shipping than about the next shiny thing.",
    "I'm a competitive builder: multiple National Hackathon Championships across Bangladesh (UAP Innovatex, NSU Tech Fest, DevFest AI) and a track record of shipping under pressure. I thrive in 24–48 hour windows where the deadline forces real architectural decisions instead of polish.",
    "Beyond code, I've led teams of up to 7 engineers, coached 100+ students, and organized hackathons and CSE fests at university scale. I believe software is a team sport — clarity, mentorship, and shipping beats lone-wolf heroics every time.",
    "I build systems that handle real load, store real money, and survive real outages — and I write them so the next engineer can read them.",
  ],

  projects: [
    {
      name: "Multi-tenant SaaS Platform",
      metric:
        "Turborepo + Bun monorepo orchestrating 6 applications and 7 services for multi-tenant ecommerce",
      bullets: [
        "Architected a Turborepo + Bun monorepo with 6 applications; designed a two-system platform separating SaaS Control Plane (tenant lifecycle, auth, billing) from Ecommerce Runtime (multi-tenant storefront).",
        "Built automated store provisioning pipeline with env config generation, Caddy reverse-proxy management, SSL via ACME/Let's Encrypt, and health checks with real-time status tracking through deployment states.",
        "Implemented a shared-container Next.js storefront serving all merchants via hostname-based tenant resolution with product catalog, checkout, customer auth, order tracking, and theme customization.",
        "Integrated payment gateway (idempotent checkout), WhatsApp marketing (Baileys with per-store session isolation), and voice marketing (IVR).",
        "Built modular REST API (Hono + Bun, DDD) with 35 feature modules; authored 3 production Dockerfiles and Docker Compose orchestrating 7 services with health checks and persistence.",
        "Managed production deployment via PM2 and GitHub Actions CI/CD.",
      ],
      stack: [
        "Turborepo",
        "Bun",
        "Next.js",
        "Hono",
        "Caddy",
        "ACME",
        "Baileys",
        "PostgreSQL",
        "Docker",
        "PM2",
        "GitHub Actions",
      ],
    },
    {
      name: "Offline-First Restaurant POS System",
      metric:
        "Production-grade POS with zero data loss during network outages and exactly-once order sync",
      bullets: [
        "Architected and developed a production-grade offline-first Point-of-Sale application enabling uninterrupted cashier operations during network outages with zero data loss via IndexedDB local persistence.",
        "Engineered a dual-database sync pipeline using Dexie.js (client-side write-ahead log) and PostgreSQL (canonical store), with BullMQ + Redis background worker ensuring exactly-once order processing via idempotency-key deduplication (24h TTL + DB constraints).",
        "Integrated Web Bluetooth API for direct ESC/POS thermal receipt printer communication with automatic GATT discovery and Unicode-to-raster conversion using Canvas 2D API with Floyd-Steinberg dithering for non-Latin scripts (Bengali, Arabic, CJK).",
        "Implemented PIN-based RBAC authentication (4 roles) with Redis-backed server sessions and 12-hour offline cache; designed a Zustand cart engine with per-line/order discounts, variants, modifiers, and category-level taxes.",
        "Built admin dashboard with menu/staff CRUD, table management, analytics via Recharts, dynamic CSS theming, and keyboard-driven command palette; deployed via Docker Compose + PM2 with separate web/worker processes.",
      ],
      stack: [
        "Next.js",
        "Dexie.js",
        "IndexedDB",
        "PostgreSQL",
        "BullMQ",
        "Redis",
        "Web Bluetooth",
        "Canvas 2D",
        "Zustand",
        "Recharts",
        "Docker",
        "PM2",
      ],
    },
  ],

  awards: [
    { year: 2025, result: "Champion", event: "UAP Innovatex 2025 — National Hackathon", location: "Dhaka, BD" },
    { year: 2025, result: "Champion", event: "NSU Tech Fest 2025 — National Hackathon", location: "Dhaka, BD" },
    { year: 2023, result: "Champion", event: "DevFest AI Hackathon by Google Developer Group", location: "Cumilla, BD" },
    { year: 2025, result: "1st Runner Up", event: "MIST Inventious 4.1 — National Hackathon", location: "Dhaka, BD" },
    { year: 2026, result: "1st Runner Up", event: "CUET CSE FEST Micro-ops — National Hackathon", location: "Chittagong, BD" },
    { year: 2025, result: "1st Runner Up", event: "Televerse 1.0 API Avengers — National Hackathon", location: "Chittagong, BD" },
    { year: 2024, result: "Top 10 Finalists", event: "OpenAPI National Hackathon — IUT Tech Fest", location: "Gazipur, BD" },
    { year: 2024, result: "Top 9 Finalists", event: "SUST CSE Carnival 2024 — National Hackathon", location: "Sylhet, BD" },
    { year: 2025, result: "Participant", event: "NASA Space Apps Challenge 2025", location: "Cumilla, BD" },
    { year: 2025, result: "Problem Setter (2x)", event: "BAIUST CSE FEST 2025 (Spring, Fall)", location: "Cumilla, BD" },
  ],

  leadership: [
    {
      title: "General Secretary (GS)",
      org: "BAIUST Computer Club (BCC)",
      bullets: [
        "Launched the Software Intern Program, coaching 102 students to ship 6 software modules for the campus.",
        "Hosting twice-weekly \"Engineering Adda\" tech round-tables (avg 40 attendees), boosting club retention.",
        "Organized a 24-hour hackathon for 51 teams (196 participants); managed logistics end-to-end, earning a 90% participant NPS.",
        "Developed the Internal Management System and the mail server for the club.",
      ],
    },
    {
      title: "Organizer, Mentor, Problem Setter",
      org: "BAIUST CSE FEST 2025",
      bullets: [
        "Organized a 24-hour hackathon, IUPC, E-football, Typing Contest, and ICT Quiz for 600+ participants.",
        "Worked closely with faculty to plan and execute the event end-to-end.",
        "Problem Setter for the hackathon segment; mentored participants throughout.",
        "Developed strong teamwork skills and an ability to thrive in a fast-paced, dynamic environment.",
      ],
    },
    {
      title: "Team Lead",
      org: "Stars Intern Program, BAIUST",
      bullets: [
        "Bus Tracker: real-time tracking for 12 buses with live map and ETA for students and admins.",
        "Treasurer Branch Reconciliation: automated matching of bank statements and student payments with instant mismatch alerts and ready-to-sign reports.",
        "Alumni Portal: a secure platform for graduate profiles, updates, and networking to enhance alumni engagement.",
        "MCP Server: central info agent aggregating live academic, finance, and transport data for quicker decision-making.",
      ],
    },
  ],

  skills: [
    { category: "Programming", items: ["JavaScript", "Python", "C/C++", "SQL"] },
    { category: "Backend", items: ["Node.js (Express.js, Hono.js)", "Next.js", "Django", "FastAPI"] },
    { category: "Database & Caching", items: ["MongoDB", "PostgreSQL", "Redis"] },
    { category: "DevOps & Infrastructure", items: ["Docker", "GitHub Actions", "AWS", "VPS"] },
    { category: "Observability", items: ["OpenTelemetry", "Prometheus", "Grafana", "Loki"] },
    { category: "Messaging & Queues", items: ["RabbitMQ", "BullMQ"] },
    { category: "Frontend", items: ["HTML", "CSS", "Component Library", "Next.js", "Axios", "TanStack"] },
    { category: "Tools", items: ["Git", "GitHub", "Docker", "Trello", "Notion", "Render", "Clerk", "Vercel"] },
    { category: "Others", items: ["Linux", "Prompt Engineering", "Product Management", "MS Office", "Canva", "Google Docs", "Google Sheets"] },
  ],

  education: {
    institution:
      "Bangladesh Army International University of Science and Technology (BAIUST), Cumilla",
    degree: "B.Sc in Computer Science and Engineering (Data Science Major)",
    cgpa: "3.02",
    thesis: "Voice-based Emotion Recognition",
    honors: [
      "BAIUST National and International Distinguished Student Award (3×)",
    ],
  },
};

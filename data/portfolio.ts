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
  /** Optional time range shown on the timeline (e.g. "2024 — Present"). */
  period?: string;
  bullets: string[];
};

export type WorkExperience = {
  title: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
  /** Official employment verification URL from the company HR system. */
  verificationUrl?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type EducationEntry = {
  institution: string;
  degree: string;
  period?: string;
  result?: string;
  thesis?: string;
  honors?: string[];
};

export type Reference = {
  name: string;
  title: string;
  org: string;
  location?: string;
  email: string;
};

export type Testimonial = {
  name: string;
  role: string;
  org: string;
  quote: string;
  /** Filename inside /public/testimonial/ (e.g. nayeem.mp4). */
  video: string;
};

export type MentorshipStat = {
  label: string;
  value: string;
};

export type MentorshipActivity = {
  title: string;
  org: string;
  period?: string;
  metric?: string;
  bullets: string[];
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
  /** Live site embedded in the MacBook Mockboard section. */
  liveSiteUrl: string;
  about: string[]; // paragraphs
  experience: WorkExperience[];
  projects: Project[];
  awards: Award[];
  leadership: LeadershipRole[];
  skills: SkillGroup[];
  education: EducationEntry[];
  references: Reference[];
  testimonials: Testimonial[];
  mentorshipStats: MentorshipStat[];
  mentorshipActivities: MentorshipActivity[];
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
  liveSiteUrl: "https://edokandar.cloud/",

  about: [
    "I'm a **language-agnostic engineer** with experience across the stack. My journey began with **frontend development**, and I'm now deep in the world of **backend systems**. I primarily work with **JavaScript**, while staying sharp in **Python** and actively learning **DevOps**. I choose stacks by fit — not by familiarity — and care more about **correctness, observability, and shipping** than about the next shiny thing.",
    "I'm a **competitive builder**: multiple **National Hackathon Championships** across Bangladesh (**UAP Innovatex, NSU Tech Fest, DevFest AI**) and a track record of shipping under pressure. I thrive in **24–48 hour windows** where the deadline forces real architectural decisions instead of polish.",
    "Beyond code, I've led teams of up to **7 engineers**, coached **100+ students**, and organized hackathons and CSE fests at **university scale**. I believe software is a **team sport** — clarity, mentorship, and shipping beats lone-wolf heroics every time.",
    "I build systems that handle **real load**, store **real money**, and survive **real outages** — and I write them so the next engineer can read them.",
  ],

  experience: [
    {
      title: "Software Engineer",
      company: "Wa-Mac",
      location: "USA (Remote)",
      period: "Dec 2024 — Present",
      verificationUrl:
        "https://career.wa-mac.com/verify/1594ac19-cf19-43d1-99e4-fdc88d28a994",
      bullets: [
        "Architected and deployed internal tools and infrastructure improvements, reducing workflow execution time by **40–50%** and improving team productivity across all departments.",
        "Built a **Real Estate Tenant Management System** with envelope encryption (KEK/DEK), idempotency mechanisms to eliminate duplicate payments, and fuzzy matching reducing duplicate file uploads by **70%**; implemented support ticket system with **Socket.IO + Redis Pub/Sub**, video conferencing via **LiveKit/WebRTC**, and file storage via **Google Drive OAuth** and **MinIO**.",
        "Developed Career Portal handling **1,200 applications in 3 days** with **80% reduction** in manual workflow; currently building a **multi-tenant CRM platform** using Turborepo.",
        "Optimized caching layer with Redis and TanStack Query, improving website loading performance from **1.3s to 0.2–0.4s**; containerized all services with Docker for consistent deployment.",
        "Engineered custom storage server infrastructure reducing cloud storage costs by **76%** and deployed VPN server for secure internal VPS/server access.",
        "Led a team of **7 developers** across multiple projects with focus on system design and technical architectural decisions.",
      ],
    },
  ],

  projects: [
    {
      name: "Multi-tenant SaaS Platform",
      metric:
        "**Turborepo + Bun** monorepo orchestrating **6 applications** and **7 services** for multi-tenant ecommerce",
      bullets: [
        "Architected a **Turborepo + Bun monorepo** with **6 applications**; designed a two-system platform separating **SaaS Control Plane** (tenant lifecycle, auth, billing) from **Ecommerce Runtime** (multi-tenant storefront).",
        "Built **automated store provisioning pipeline** with env config generation, **Caddy** reverse-proxy management, SSL via **ACME/Let's Encrypt**, and health checks with real-time status tracking through deployment states.",
        "Implemented a **shared-container Next.js storefront** serving all merchants via **hostname-based tenant resolution** with product catalog, checkout, customer auth, order tracking, and theme customization.",
        "Integrated **payment gateway** (idempotent checkout), **WhatsApp marketing** (Baileys with per-store session isolation), and **voice marketing (IVR)**.",
        "Built modular REST API (**Hono + Bun**, DDD) with **35 feature modules**; authored **3 production Dockerfiles** and Docker Compose orchestrating **7 services** with health checks and persistence.",
        "Managed production deployment via **PM2** and **GitHub Actions CI/CD**.",
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
        "Production-grade POS with **zero data loss** during network outages and **exactly-once order sync**",
      bullets: [
        "Architected and developed a production-grade **offline-first Point-of-Sale** application enabling uninterrupted cashier operations during network outages with **zero data loss** via **IndexedDB** local persistence.",
        "Engineered a **dual-database sync pipeline** using Dexie.js (client-side write-ahead log) and PostgreSQL (canonical store), with **BullMQ + Redis** background worker ensuring **exactly-once order processing** via **idempotency-key deduplication** (24h TTL + DB constraints).",
        "Integrated **Web Bluetooth API** for direct **ESC/POS** thermal receipt printer communication with automatic GATT discovery and Unicode-to-raster conversion using Canvas 2D API with **Floyd-Steinberg dithering** for non-Latin scripts (Bengali, Arabic, CJK).",
        "Implemented **PIN-based RBAC authentication** (**4 roles**) with Redis-backed server sessions and **12-hour offline cache**; designed a Zustand cart engine with per-line/order discounts, variants, modifiers, and category-level taxes.",
        "Built admin dashboard with menu/staff CRUD, table management, analytics via Recharts, dynamic CSS theming, and keyboard-driven command palette; deployed via **Docker Compose + PM2** with separate web/worker processes.",
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
    {
      year: 2025,
      result: "Hackathon Coordinator, Problem Setter & Mentor",
      event: "BAIUST CSE Fall Fest 2025",
      location: "Cumilla, BD",
    },
    {
      year: 2026,
      result: "Hackathon Coordinator, Problem Setter & Mentor",
      event: "BAIUST CSE Spring Fest 2026",
      location: "Cumilla, BD",
    },
    {
      year: 2026,
      result: "Prompt Engineering Coordinator, Problem Setter & Mentor",
      event: "BAIUST CSE Spring Fest 2026",
      location: "Cumilla, BD",
    },
  ],

  leadership: [
    {
      title: "General Secretary (GS)",
      org: "BAIUST Computer Club (BCC)",
      period: "2024 — Present",
      bullets: [
        "Launched the **Software Intern Program**, coaching **102 students** to ship **6 software modules** for the campus.",
        "Hosting twice-weekly **\"Engineering Adda\"** tech round-tables (avg **40 attendees**), boosting club retention.",
        "Organized a **24-hour hackathon** for **51 teams** (**196 participants**); managed logistics end-to-end, earning a **90% participant NPS**.",
        "Developed the **Internal Management System** and the **mail server** for the club.",
      ],
    },
    {
      title: "Hackathon Coordinator, Problem Setter & Mentor",
      org: "BAIUST CSE Fall Fest 2025",
      period: "2025",
      bullets: [
        "Coordinated the **24-hour hackathon** segment for Fall Fest — logistics, judging flow, and participant support.",
        "Authored **problem statements** and mentored teams on architecture, scope, and shipping under time pressure.",
        "Worked with faculty and club leads to execute the track end-to-end for **600+ fest participants**.",
      ],
    },
    {
      title: "Hackathon Coordinator, Problem Setter & Mentor",
      org: "BAIUST CSE Spring Fest 2026",
      period: "2026",
      bullets: [
        "Led hackathon coordination for Spring Fest — registration, venue flow, and mentor rotations during the contest.",
        "**Problem setter** for the hackathon track; coached teams on APIs, data modeling, and demo-ready scope.",
        "Helped deliver IUPC, typing contest, and ICT quiz programming alongside the main hackathon segment.",
      ],
    },
    {
      title: "Prompt Engineering Coordinator, Problem Setter & Mentor",
      org: "BAIUST CSE Spring Fest 2026",
      period: "2026",
      bullets: [
        "Designed and ran the **Prompt Engineering** segment — challenge briefs, rubric, and live mentoring.",
        "Crafted problems that reward **practical LLM use** — chaining, evaluation, and time-boxed trade-offs.",
        "Mentored participants on prompt design, tool choice, and presenting working solutions within the contest window.",
      ],
    },
    {
      title: "Team Lead",
      org: "Stars Intern Program, BAIUST",
      period: "2024",
      bullets: [
        "**Bus Tracker**: real-time tracking for **12 buses** with live map and ETA for students and admins.",
        "**Treasurer Branch Reconciliation**: automated matching of bank statements and student payments with **instant mismatch alerts** and ready-to-sign reports.",
        "**Alumni Portal**: a secure platform for graduate profiles, updates, and networking to enhance alumni engagement.",
        "**MCP Server**: central info agent aggregating live academic, finance, and transport data for quicker decision-making.",
      ],
    },
  ],

  skills: [
    { category: "Programming", items: ["JavaScript", "Python", "C/C++", "SQL"] },
    { category: "Backend", items: ["Node.js (Express.js, Hono.js)", "Next.js", "Django", "FastAPI"] },
    { category: "Architecture", items: ["Monorepo", "Turborepo", "Microservice", "Modular"] },
    { category: "Database & Caching", items: ["PostgreSQL", "Supabase", "Neon", "MongoDB", "Redis"] },
    { category: "DevOps & Infrastructure", items: ["Docker", "GitHub Actions", "AWS", "VPS"] },
    { category: "Observability", items: ["OpenTelemetry", "Prometheus", "Grafana", "Loki"] },
    { category: "Messaging & Queues", items: ["RabbitMQ", "BullMQ"] },
    { category: "Frontend", items: ["HTML", "CSS", "Component Library", "Next.js", "Axios", "TanStack"] },
    { category: "Tools", items: ["Git", "GitHub", "Docker", "Trello", "Notion", "Render", "Clerk", "Vercel"] },
    { category: "Others", items: ["Linux", "Prompt Engineering", "Product Management", "MS Office", "Canva", "Google Docs", "Google Sheets"] },
  ],

  education: [
    {
      institution:
        "Bangladesh Army International University of Science and Technology (BAIUST), Cumilla",
      degree: "B.Sc in Computer Science and Engineering (Data Science Major)",
      period: "2022 — 2026",
      result: "CGPA: 3.02",
      thesis: "Voice-based Emotion Recognition",
      honors: [
        "BAIUST National and International Distinguished Student Award (3×)",
      ],
    },
    {
      institution: "Cumilla Collectorate School and College, Cumilla",
      degree: "Higher Secondary Certificate (HSC) · Science",
      period: "2021",
      result: "GPA: 5.00",
    },
    {
      institution: "Chauddagram HJ Model Pilot Govt High School, Cumilla",
      degree: "Secondary School Certificate (SSC) · Science",
      period: "2019",
      result: "GPA: 4.50",
    },
  ],

  references: [
    {
      name: "Golam Moktader Nayeem",
      title:
        "Dean (Acting), Faculty of ECE · Associate Professor, Dept. of CSE",
      org: "Bangladesh Army International University of Science & Technology (BAIUST)",
      location: "Cumilla",
      email: "gmnayeem.cse@baiust.ac.bd",
    },
    {
      name: "Md. Khorshed Alam Molla",
      title:
        "Senior Manager & Head – ROC Cumilla · Asset and ROC Operations",
      org: "Brac Bank, ChawkBazar",
      location: "Regional Operating Center, Cumilla",
      email: "mohammedkhorsedalam.molla@bracbank.com",
    },
  ],

  testimonials: [
    {
      name: "Golam Moktader Nayeem",
      role: "Dean (Acting), Faculty of ECE · Associate Professor, Dept. of CSE",
      org: "BAIUST, Cumilla",
      quote:
        "Kawsar shows strong engineering discipline, campus leadership, and the ability to ship real systems — not just coursework.",
      video: "nayeem.mp4",
    },
    {
      name: "Md. Khorshed Alam Molla",
      role: "Senior Manager & Head – ROC Cumilla",
      org: "Brac Bank, ChawkBazar",
      quote:
        "A dependable engineer who communicates clearly, meets deadlines, and handles production pressure with composure.",
      video: "molla.mp4",
    },
  ],

  mentorshipStats: [
    { label: "Students coached", value: "102+" },
    { label: "Modules shipped", value: "6" },
    { label: "Weekly round-table", value: "40 avg" },
    { label: "Hackathon teams", value: "51" },
  ],

  mentorshipActivities: [
    {
      title: "Engineering Adda",
      org: "BAIUST Computer Club (BCC)",
      period: "2024 — Present",
      metric: "Twice-weekly tech round-tables · **40 attendees** on average",
      bullets: [
        "Host open **engineering discussions** on system design, shipping, and career growth for club members.",
        "Built a consistent format: one topic, one demo, one debate — keeps sessions practical, not slide-heavy.",
      ],
    },
    {
      title: "Software Intern Program",
      org: "BAIUST Computer Club (BCC)",
      period: "2024 — Present",
      metric: "Coached **102 students** to ship **6 campus modules**",
      bullets: [
        "Designed the intern track: repo standards, PR reviews, and weekly ship checkpoints.",
        "Mentored squads from idea → MVP → handoff to faculty/student users.",
      ],
    },
    {
      title: "Hackathon Coordinator, Problem Setter & Mentor",
      org: "BAIUST CSE Fall Fest 2025",
      period: "2025",
      metric: "Fall Fest hackathon track · **Problem setter** & on-floor mentor",
      bullets: [
        "Coordinated the **24-hour hackathon** for Fall Fest — scheduling, judging, and participant support.",
        "Authored challenges that reward **real engineering** — APIs, data modeling, and time-boxed trade-offs.",
        "Mentored teams on architecture and scope so they could ship a working demo within the contest window.",
      ],
    },
    {
      title: "Hackathon Coordinator, Problem Setter & Mentor",
      org: "BAIUST CSE Spring Fest 2026",
      period: "2026",
      metric: "Spring Fest hackathon · **Coordinator** & mentor",
      bullets: [
        "Led hackathon coordination for Spring Fest alongside IUPC, typing contest, and ICT quiz programming.",
        "**Problem setter** for the hackathon track; coached teams on scope and demo-ready deliverables.",
        "Worked with faculty to plan and execute the segment for **600+ fest participants**.",
      ],
    },
    {
      title: "Prompt Engineering Coordinator, Problem Setter & Mentor",
      org: "BAIUST CSE Spring Fest 2026",
      period: "2026",
      metric: "Prompt Engineering segment · **Coordinator** & problem author",
      bullets: [
        "Designed and ran the **Prompt Engineering** track — briefs, rubric, and live mentoring during the contest.",
        "Crafted problems that test **practical LLM workflows** — chaining, evaluation, and clear success criteria.",
        "Mentored participants on prompt design and presenting working solutions within the time limit.",
      ],
    },
  ],
};

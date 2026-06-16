# Meta Prompt: Numbered-Section Engineer Portfolio

Use this as a prompt for an AI coding agent (Claude Code, Cursor, etc.) to generate a personal portfolio site in the style of `updated-portfolio-opal-nine.vercel.app` — a minimal, editorial, numbered-section single-page site built for software engineers who want to lead with proof of work (projects, hackathons, leadership) rather than a generic "creative" portfolio.

---

## 1. Project Brief (paste this to the agent)

> Build a single-page personal portfolio website for a software engineer. The tone is minimal, editorial, and confident — no gradients, no glassmorphism, no hero illustrations. Content density and typographic hierarchy do the work. Think "engineering resume meets design studio site," not "creative agency landing page."

## 2. Tech Stack

- Next.js 15+ (App Router), TypeScript
- Tailwind CSS for styling
- shadcn/ui only if needed for primitives (most of this UI is custom, not component-library-driven)
- Framer Motion (or Motion One) for scroll-reveal and nav indicator transitions — subtle only
- next/image for the profile photo
- Deployed on Vercel
- All content (projects, awards, leadership, skills) lives in a single typed data file (`/data/portfolio.ts`) so the same template can be re-themed/re-populated for a different person without touching components

## 3. Design System

**Typography**
- Sans-serif for body and headings (Inter, Geist, or similar) — no serif anywhere
- A monospace font for section labels, numbers, tags, and metadata ("01 — ABOUT", tech-stack pills, dates) to create contrast against the sans headings
- Large, tight-leading display heading for the name/hero line; everything else stays modest in size — hierarchy comes from spacing and weight, not from huge font jumps

**Color**
- Monochrome base: near-black text on off-white/white background (or true dark mode equivalent), with a single accent color reserved for links/hover states only
- No decorative color — color is functional (links, active nav state) only

**Layout**
- Single column, generous max-width (~720–840px) centered content column — this is a reading-focused layout, not a multi-column dashboard
- Sticky/fixed header containing name, small profile photo, and anchor navigation; on scroll, header can compress or stay minimal
- Each major section is numbered ("01 - ABOUT", "02 - SELECTED WORK", etc.) with the number in mono font, small caps or uppercase label beside it — this numbering is the site's primary visual signature, keep it consistent across every section
- Section nav is anchor-link based (`#about`, `#work`, `#recognition`, `#leadership`, `#skills`, `#education`, `#contact`) with a scroll-spy active state
- Generous vertical whitespace between sections (treat sections like chapters, not cards crammed together)

**Motion**
- Fade/slide-up on scroll into view for each section, ~200–400ms, no bounce/spring excess
- Smooth-scroll for anchor nav clicks
- Hover states are subtle (underline, slight opacity/color shift) — never scale/shadow-pop effects

## 4. Information Architecture

Build these sections, in this order, each prefixed with a two-digit number:

1. **Hero / Header** — name, role line ("Software Engineer · [Major/Specialty]"), location, profile photo, contact quick-links (email, phone, LinkedIn), and the anchor nav
2. **01 — About** — 2–3 short paragraphs: how you think about your craft/stack choice, a competitive/under-pressure proof point (hackathons), and a leadership/impact proof point. End on a one-line value statement.
3. **02 — Selected Work** — 2–4 project cards. Each card: project name, one-line outcome metric (users served, requests handled, scale), 3–5 bullet points on architecture/implementation detail (be specific: which DB, which queue, which protocol), and a row of tech-stack pills at the bottom in mono font.
4. **03 — Recognition** — a reverse-chronological list of hackathons/awards. Each row: year, result/placement (Champion, Runner-up, Finalist, Participant), event name, location. Group visually by year if the list is long.
5. **04 — Leadership** — 2–4 role cards. Each: role title, organization, 3–5 bullet points of concrete impact (numbers wherever possible — people coached, events run, NPS, retention).
6. **05 — Skills** — grouped by category (Languages, Backend, Database & Cache, DevOps & Infra, Observability, Messaging & Queues, Frontend, Tools), each category a label + inline pill list. Don't rate skills 1–5 or use progress bars — flat pill lists only.
7. **06 — Education** — institution, degree + major, CGPA (if strong), thesis title, any distinguished-student/honors line.
8. **07 — Contact** — short CTA line ("Open to opportunities...") + email, phone, LinkedIn. Footer with copyright.

## 5. Content Data Schema

Have the agent scaffold a single typed data source so the template is reusable:

```ts
type Project = {
  name: string;
  metric: string; // one-line outcome
  bullets: string[];
  stack: string[];
};

type Award = {
  year: number;
  result: "Champion" | "1st Runner Up" | "Top Finalist" | "Participant" | string;
  event: string;
  location: string;
};

type LeadershipRole = {
  title: string;
  org: string;
  bullets: string[];
};

type SkillGroup = {
  category: string;
  items: string[];
};

type Portfolio = {
  name: string;
  role: string;
  location: string;
  photoUrl: string;
  email: string;
  phone: string;
  linkedin: string;
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
```

## 6. Component Breakdown

- `Header.tsx` — sticky nav with scroll-spy
- `Hero.tsx`
- `SectionHeading.tsx` — reusable "01 - LABEL" component used by every section for consistency
- `About.tsx`
- `WorkSection.tsx` + `ProjectCard.tsx`
- `RecognitionSection.tsx` — table/list row component
- `LeadershipSection.tsx` + `RoleCard.tsx`
- `SkillsSection.tsx` + `SkillGroup.tsx`
- `EducationSection.tsx`
- `ContactSection.tsx` + `Footer.tsx`

## 7. SEO / Metadata

- Set `title`, `meta-description`, Open Graph, and Twitter card tags from the same data file (name + role + one-line summary)
- Use `viewport` meta for responsive scaling
- Single static page — no CMS needed unless explicitly requested

## 8. Responsiveness & Accessibility

- Mobile: nav collapses to a simple stacked list or hamburger; numbering and section rhythm stay intact
- Maintain WCAG-acceptable contrast for the monochrome palette
- Semantic HTML: `<nav>`, `<section id="...">`, heading hierarchy (`h1` once, `h2` per section)

## 9. What to explicitly avoid

- No glassmorphism, no large gradient blobs, no 3D hero animations
- No skill progress bars / star ratings
- No stock "creative portfolio" hero imagery — photo + text only
- No more than one accent color

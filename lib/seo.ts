import { portfolio } from "@/data/portfolio";

export const SITE_URL = "https://www.imkawsar.com";

/** 150–160 chars — used in meta description, OG, and WebSite schema */
export const seoDescription =
  "Backend software engineer from Cumilla, Bangladesh. Building multi-tenant SaaS, offline-first systems, and production APIs with Node.js, PostgreSQL, Redis, and Docker.";

/** Common name spellings and search variants */
export const seoNameVariations = [
  "Kawsar",
  "Kawchar",
  "Kawser",
  "Kawsar Ahmed",
  "Kawchar Ahmed",
  "Kawser Ahmed",
  "Md Kawsar Ahmed",
  "Md. Kawsar Ahmed",
  "Md Kawchar Ahmed",
  "Md Kawser Ahmed",
  "Kawsar software engineer",
  "Kawchar software engineer",
  "Kawser software engineer",
];

export const seoKeywords = [
  portfolio.name,
  ...seoNameVariations,
  "Software Engineer",
  "Backend Engineer",
  "Backend Developer",
  "Full Stack Engineer",
  "Data Science",
  "System Design",
  "Software Architecture",
  "Multi-tenant SaaS",
  "Microservices",
  "Offline-first Systems",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Next.js",
  "Turborepo",
  "Express.js",
  "Hono.js",
  "BullMQ",
  "API Development",
  "REST API",
  "DevOps",
  "Incident Response",
  "Hackathon Champion",
  "National Hackathon Bangladesh",
  "Software Engineer Bangladesh",
  "Remote Software Engineer",
  "Cumilla",
  "Bangladesh",
  "BAIUST",
];

/** Person schema `knowsAbout` — expertise signals for Google */
export const seoKnowsAbout = [
  "Backend Engineering",
  "System Design",
  "Multi-tenant SaaS Architecture",
  "Microservices",
  "Offline-first Systems",
  "API Design",
  "Data Science",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Redis",
  "Docker",
  "DevOps",
  "Incident Response",
  "Turborepo",
  "Express.js",
  "Hono.js",
  "BullMQ",
  "Next.js",
  "Prompt Engineering",
];

export const seoOgTagline =
  "Backend · SaaS · System Design · Node.js · PostgreSQL · Hackathons";

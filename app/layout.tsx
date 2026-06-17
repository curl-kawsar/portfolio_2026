import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${portfolio.name} — ${portfolio.role}`;
const description = `${portfolio.role} based in ${portfolio.location}. Selected work in multi-tenant SaaS, offline-first systems, and backend infrastructure.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    portfolio.name,
    "Software Engineer",
    "Data Science",
    "Backend",
    "Multi-tenant SaaS",
    "Hackathon Champion",
    "Bangladesh",
  ],
  authors: [{ name: portfolio.name }],
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "en_US",
    siteName: portfolio.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

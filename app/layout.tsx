import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { portfolio } from "@/data/portfolio";
import { getGalleryLoveState } from "@/lib/db";
import { seoDescription, seoKeywords, SITE_URL } from "@/lib/seo";
import LoveShell from "@/components/LoveShell";

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

const defaultTitle = `${portfolio.name} — ${portfolio.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s — ${portfolio.name}`,
  },
  description: seoDescription,
  keywords: seoKeywords,
  authors: [{ name: portfolio.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: defaultTitle,
    description: seoDescription,
    url: SITE_URL,
    type: "profile",
    locale: "en_US",
    siteName: portfolio.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: seoDescription,
    images: ["/opengraph-image"],
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialLove = { total: 0, images: {} as Record<string, { count: number; loved: boolean }> };

  try {
    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitor_id")?.value;
    initialLove = await getGalleryLoveState(visitorId);
  } catch {
    // DB unavailable during build or missing env — client will fetch later
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        <LoveShell initialLove={initialLove}>
          <div className="relative z-10">{children}</div>
        </LoveShell>
      </body>
    </html>
  );
}

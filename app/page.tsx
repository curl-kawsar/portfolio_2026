import { portfolio } from "@/data/portfolio";
import { seoDescription, seoKnowsAbout, SITE_URL } from "@/lib/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LiveSiteMockboard from "@/components/LiveSiteMockboard";
import About from "@/components/About";
import ExperienceSection from "@/components/ExperienceSection";
import WorkSection from "@/components/WorkSection";
import RecognitionSection from "@/components/RecognitionSection";
import GallerySection from "@/components/GallerySection";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import SpeakingMentorshipSection from "@/components/SpeakingMentorshipSection";
import YouTubePlaylistSection from "@/components/YouTubePlaylistSection";
import LeadershipSection from "@/components/LeadershipSection";
import IncidentManagementSection from "@/components/IncidentManagementSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ReferencesSection from "@/components/ReferencesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  url: SITE_URL,
  jobTitle: "Software Engineer",
  description: seoDescription,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cumilla",
    addressCountry: "BD",
  },
  sameAs: [portfolio.linkedin],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bangladesh Army International University of Science and Technology",
  },
  knowsAbout: seoKnowsAbout,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: portfolio.name,
  url: SITE_URL,
  description: seoDescription,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <SkillsSection groups={portfolio.skills} />
        <ExperienceSection roles={portfolio.experience} />
        <WorkSection />
        <LiveSiteMockboard
          url={portfolio.liveSiteUrl}
          caption="LIVE PREVIEW / EDOKANDAR.CLOUD"
          subcaption="REAL-TIME IFRAME · SCROLL TO EXPLORE"
        />
        <RecognitionSection />
        <TestimonialsSection />
        <GallerySection />
        <IncidentManagementSection
          intro={portfolio.incidentIntro}
          incidents={portfolio.incidents}
        />
        <BlogTeaserSection />
        <SpeakingMentorshipSection
          stats={portfolio.mentorshipStats}
          activities={portfolio.mentorshipActivities}
        />
        <YouTubePlaylistSection playlist={portfolio.youtubePlaylist} />
        
        <LeadershipSection roles={portfolio.leadership} />
        
        <EducationSection />
        <ReferencesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

import { portfolio } from "@/data/portfolio";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkSection from "@/components/WorkSection";
import RecognitionSection from "@/components/RecognitionSection";
import LeadershipSection from "@/components/LeadershipSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <About />
        <WorkSection />
        <RecognitionSection />
        <LeadershipSection roles={portfolio.leadership} />
        <SkillsSection groups={portfolio.skills} />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

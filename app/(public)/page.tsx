import HeroSection from "@/components/sections/HeroSection";
import SkillsMarquee from "@/components/sections/SkillsMarquee";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CTASection from "@/components/sections/CTASection";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

async function getFeaturedProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ featured: true }).sort({ created_at: -1 }).limit(3).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const projects = await getFeaturedProjects();

  return (
    <>
      <HeroSection />
      <SkillsMarquee />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection projects={projects} />
      <ServicesSection />
      <CTASection />
    </>
  );
}

import type { Metadata } from "next";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CTASection from "@/components/sections/CTASection";
import dbConnect from "@/lib/db";
import Project from "@/models/Project";

export const metadata: Metadata = {
  title: "Projects",
  description: "Portfolio projects by Shubham Meshram — Full Stack Developer.",
};

async function getProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ created_at: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <div className="pt-32 pb-8 container mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-4">
          <span className="w-4 h-px bg-primary" />
          Featured Portfolio
          <span className="w-4 h-px bg-primary" />
        </span>
        <h1 className="text-5xl font-display font-bold">
          All <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
          A showcase of production-ready web applications, real-time backend systems, and AI-powered platforms engineered for scale.
        </p>
      </div>
      <ProjectsSection projects={projects} showAll />
      <CTASection />
    </>
  );
}

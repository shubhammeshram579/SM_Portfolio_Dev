import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Shubham Meshram — Full Stack Developer from Pune.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="pt-32 pb-8 container mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-4">
          <span className="w-4 h-px bg-primary" />
          About Me
          <span className="w-4 h-px bg-primary" />
        </span>
        {/* <h1 className="text-5xl font-display font-bold">
          The Developer <span className="text-gradient">Behind The Code</span>
        </h1> */}

        <h1 className="text-5xl font-display font-bold">
  The Engineer <span className="text-gradient">Behind The Products</span>
</h1>
      </div>
      <AboutSection />
      <ExperienceSection />
      <CTASection />
    </>
  );
}

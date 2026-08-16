import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description: "Freelance services offered by Shubham Meshram — Full Stack Developer.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-32 pb-8 container mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-4">
            <span className="w-4 h-px bg-primary" />
            Freelance & Technical Consulting
            <span className="w-4 h-px bg-primary" />
          </span>
          <h1 className="text-5xl font-display font-bold">
            Services I <span className="text-gradient">Provide</span>
          </h1>
          <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
            End-to-end full-stack development, AI/LLM integration, and real-time backend systems tailored to turn your vision into production-ready software.
          </p>
        </div>
      <ServicesSection />
      <CTASection />
    </>
  );
}

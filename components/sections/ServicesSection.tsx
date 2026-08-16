"use client";
import { motion } from "framer-motion";
import { Code2, LayoutDashboard, Webhook, PanelLeft, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { siteConfig } from "@/config/site";

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={24} />,
  LayoutDashboard: <LayoutDashboard size={24} />,
  Webhook: <Webhook size={24} />,
  PanelLeft: <PanelLeft size={24} />,
};

export default function ServicesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
        
          <SectionHeading
            label="Services"
            title="Solutions I Can"
            highlight="Build For You"
            description="From full-stack web applications and AI-powered workflows to real-time backends and enterprise dashboards — engineered for performance and reliability."
          />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {siteConfig.services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-7 group hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                {iconMap[service.icon] ?? <Code2 size={24} />}
              </div>
              <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <CheckCircle2 size={13} className="text-primary shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/common/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { Code2, Layers, Zap, Users } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Built", value: "10+" },
  { label: "Users Served", value: "6K+" },
  { label: "Technologies", value: "15+" },
];


const skillCategories = [
  { label: "Languages", skills: siteConfig.skills.languages, color: "text-blue-400" },
  { label: "Frontend", skills: siteConfig.skills.frontend, color: "text-primary" },
  { label: "Backend", skills: siteConfig.skills.backend, color: "text-yellow-400" },
  { label: "Databases & ORM", skills: siteConfig.skills.databases, color: "text-purple-400" },
  { label: "AI & Workflows", skills: siteConfig.skills.ai, color: "text-emerald-400" },
  { label: "DevOps & Tools", skills: siteConfig.skills.tools, color: "text-orange-400" },
];

export default function AboutSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <SectionHeading
            label="About Me"
            title="Passionate about building"
            highlight="scalable & AI-driven solutions"
            description="Full-Stack Developer focused on production-ready web applications, real-time backend systems, and AI integrations. I care deeply about clean architecture, performance, database optimization, and great developer experience."
          />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground font-body">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div className="mt-16 space-y-6">
          <h3 className="text-lg font-display font-semibold">Technical Skills</h3>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-wrap items-start gap-3"
            >
              <span className={`text-xs font-mono w-20 shrink-0 mt-1 ${cat.color}`}>
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs font-mono">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

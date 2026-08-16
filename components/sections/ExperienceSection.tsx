"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import SectionHeading from "@/components/common/SectionHeading";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            label="Experience"
            title="Work"
            highlight="History"
            description="Hands-on experience building real-world production applications."
          />
        </motion.div>

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {siteConfig.experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative sm:grid sm:grid-cols-2 sm:gap-8 ${
                  i % 2 === 0 ? "" : "sm:direction-rtl"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background z-10 hidden sm:block top-6" />

                <div className={i % 2 === 0 ? "sm:text-right sm:pr-12" : "sm:col-start-2 sm:pl-12"}>
                  <div className="glass rounded-xl p-6 hover:border-primary/30 transition-all group">
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-primary font-medium text-sm font-body">{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                          <Calendar size={11} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                          <MapPin size={11} />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.highlights.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                          <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mt-20">
          <h3 className="text-xl font-display font-semibold mb-8 text-center">Education & Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {siteConfig.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 hover:border-primary/30 transition-all"
              >
                <p className="font-display font-semibold text-foreground">{edu.degree}</p>
                <p className="text-sm text-muted-foreground font-body mt-1">{edu.institution}</p>
                <p className="text-xs text-primary font-mono mt-2">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

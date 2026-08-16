"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/SectionHeading";
import { Project } from "@/types";

interface ProjectsSectionProps {
  projects: Project[];
  showAll?: boolean;
}

export default function ProjectsSection({ projects, showAll = false }: ProjectsSectionProps) {
  const displayed = showAll ? projects : projects.slice(0, 3);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            label="Projects"
            title="Featured Work &"
            highlight="Built Systems"
            description="A curated showcase of production-ready applications, real-time backends, and AI-powered platforms engineered for performance and scalability."
          />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
            <motion.div
              key={project._id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl overflow-hidden group hover:border-primary/20 transition-all"
            >
              {/* Image */}
              <div className="relative h-48 bg-secondary overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-display font-bold text-muted/20">
                      {project.title.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                )}
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="capitalize text-xs">{project.category}</Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech_stack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs font-mono">
                      {tech}
                    </Badge>
                  ))}
                  {project.tech_stack.length > 4 && (
                    <Badge variant="secondary" className="text-xs font-mono">
                      +{project.tech_stack.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                    >
                      <Github size={13} /> Code
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && (
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/projects">
                View All Projects <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

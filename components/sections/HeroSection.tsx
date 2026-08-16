"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HeroSection() {
  const techBadges = [
  "React.js",
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "AI / LLM",
];



  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      {/* Floating orb */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 hidden lg:block">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-72 h-72 rounded-full border border-primary/20 flex items-center justify-center">
            <div className="w-56 h-56 rounded-full border border-primary/30 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center animate-glow-pulse">
                {/* <span className="font-display font-bold text-5xl text-primary">SM</span> */}
                {/* <img src="https://res.cloudinary.com/dsfepcba9/image/upload/v1786733496/profile_img_t5eale.jpg" alt="" className="w-32 object-cover rounded-full" /> */}
                <img src="https://res.cloudinary.com/dsfepcba9/image/upload/v1786742077/profile_img-removebg-preview_cgwtlj.png" alt="" className="w-96 object-cover rounded-full" />
              </div>
            </div>
          </div>
          {/* Orbiting dots */}
          {["React", "Node", "Next.js"].map((tech, i) => (
            <motion.div
              key={tech}
              animate={{ rotate: 360 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
              style={{ transformOrigin: "center" }}
            >
              <div
                className="absolute w-10 h-10 rounded-lg glass flex items-center justify-center text-xs font-mono text-primary border border-primary/30"
                style={{
                  top: `${10 + i * 25}%`,
                  right: "-20px",
                }}
              >
                {tech.slice(0, 2)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto">
        <div className="max-w-2xl">
          {/* Available badge */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 text-xs font-mono text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Open for freelance & full-time roles
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6">
              Building
              <br />
              <span className="text-gradient">Scalable</span>
              <br />
              Web Apps.
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-muted-foreground font-body text-lg leading-relaxed mb-6 max-w-lg"
          >
            Full-Stack Developer focused on building scalable, production-ready web
            applications and AI-powered solutions. Experienced in{" "}
            <span className="text-foreground">
              React.js, Next.js, Node.js, TypeScript
            </span>{" "}
            with{" "}
            <span className="text-foreground">
              PostgreSQL, MongoDB, Redis
            </span>
            , real-time systems, REST APIs, and AI/LLM integrations.
          </motion.p>

          {/* Tech badges */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2 mb-8"
          >
            {techBadges.map((tech) => (
              <Badge key={tech} variant="secondary" className="font-mono text-xs">
                {tech}
              </Badge>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3"
          >
            <Button  asChild size="lg" className="gap-2 z-50">
              <Link href="/projects">
                View Projects <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 z-50">
              <Link href="/contact">
                Hire Me
              </Link>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-4 mt-8"
          >
            <span className="text-xs text-muted-foreground font-mono">Find me on</span>
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: siteConfig.github, label: "GitHub" },
                { icon: Linkedin, href: siteConfig.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all z-50"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-sm"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative p-12 md:p-16 text-center">
            {/* Top Badge */}
            <span className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-4">
              <span className="w-4 h-px bg-primary" />
              Let&apos;s Build Together
              <span className="w-4 h-px bg-primary" />
            </span>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Have a project or opportunity <span className="text-gradient">in mind?</span>
            </h2>

            {/* Subtitle */}
            <p className="text-muted-foreground font-body max-w-xl mx-auto mb-8 text-lg leading-relaxed">
              Whether you need a full-stack web application, an AI-powered integration, or an experienced full-stack developer for your team—let&apos;s make it happen.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2 px-6">
                <Link href="/contact">
                  <Mail size={18} /> Get In Touch
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 px-6">
                <Link href="/projects">
                  View All Projects <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

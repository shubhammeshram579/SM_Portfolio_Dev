import type { Metadata } from "next";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Shubham Meshram for freelance work or collaboration.",
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-32 pb-8 container mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-4">
          <span className="w-4 h-px bg-primary" />
          Contact
          <span className="w-4 h-px bg-primary" />
        </span>
        <h1 className="text-5xl font-display font-bold">
          Let&apos;s <span className="text-gradient">Connect</span>
        </h1>
        <p className="text-muted-foreground font-body mt-3 max-w-lg mx-auto">
          Have a project or opportunity? I&apos;d love to hear from you.
        </p>
      </div>

      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-semibold mb-2">Get In Touch</h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  I&apos;m currently available for freelance work and open to full-time opportunities.
                  Whether you have a project in mind, want to collaborate, or just say hi — my inbox is open.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                  { icon: MapPin, label: "Location", value: siteConfig.location, href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 glass rounded-xl p-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-body hover:text-primary transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-body">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-body hover:border-primary/30 hover:text-primary transition-all"
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-body hover:border-primary/30 hover:text-primary transition-all"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-display font-semibold mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

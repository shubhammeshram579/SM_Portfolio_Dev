const skills = [
  "React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL",
  "MongoDB", "Tailwind CSS", "Docker", "AWS", "Redis", "REST APIs",
  "Shadcn UI", "Framer Motion", "Git", "Vercel", "Supabase", "Nest.js",
];

export default function SkillsMarquee() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-border/50 bg-secondary/20">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex">
        <div className="flex gap-8 animate-marquee whitespace-nowrap shrink-0">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground"
            >
              <span className="text-primary">✦</span>
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-8 animate-marquee whitespace-nowrap shrink-0" aria-hidden>
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground"
            >
              <span className="text-primary">✦</span>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

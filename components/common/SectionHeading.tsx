import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  label,
  title,
  highlight,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3", align === "center" ? "text-center" : "text-left", className)}>
      {label && (
        <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-primary uppercase tracking-widest">
          <span className="w-4 h-px bg-primary" />
          {label}
          <span className="w-4 h-px bg-primary" />
        </span>
      )}
      <h2 className="text-3xl sm:text-2xl font-display font-bold text-foreground leading-tight">
        {title}{" "}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dbConnect from "@/lib/db";
import Blog from "@/models/Blog";
import { formatDate } from "@/lib/utils";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on full-stack development, Next.js, React, and more by Shubham Meshram.",
};

async function getBlogs() {
  try {
    await dbConnect();
    const blogs = await Blog.find({ published: true }).sort({ created_at: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <div className="pt-32 pb-8 container mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-4">
          <span className="w-4 h-px bg-primary" />
          Tech Blog & Insights
          <span className="w-4 h-px bg-primary" />
        </span>
        <h1 className="text-5xl font-display font-bold">
          Thoughts &amp; <span className="text-gradient">Articles</span>
        </h1>
        <p className="text-muted-foreground font-body mt-3 max-w-xl mx-auto">
          In-depth breakdowns on full-stack architecture, backend optimization, AI workflows, and practical software engineering practices.
        </p>
      </div>

      <section className="py-16">
        <div className="container mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-24 glass rounded-2xl">
              <p className="text-4xl mb-4">✍️</p>
              <p className="text-muted-foreground font-body">Blog posts coming soon. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog: { _id: string; slug: string; cover_image?: string; tags: string[]; title: string; excerpt: string; created_at: string }) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug}`}
                  className="glass rounded-xl overflow-hidden group hover:border-primary/30 transition-all"
                >
                  {blog.cover_image && (
                    <div className="h-48 bg-secondary overflow-hidden">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {blog.tags.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs font-mono">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-muted-foreground font-body line-clamp-3 mb-4">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                        <Calendar size={12} />
                        {formatDate(blog.created_at)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-primary font-mono">
                        Read <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection />
    </>
  );
}

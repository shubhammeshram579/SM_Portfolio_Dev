// Run: npx tsx scripts/seed.ts
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;

const ProjectSchema = new mongoose.Schema({
  title: String, description: String, tech_stack: [String],
  github_url: String, live_url: String, image: String,
  category: String, featured: Boolean, created_at: { type: Date, default: Date.now },
});

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const projects = [
  {
    title: "Pinterest Clone",
    description: "A full-featured Pinterest Clone using the MERN stack with real-time notifications, image uploads via Cloudinary, and smooth GSAP animations.",
    tech_stack: ["React.js", "Node.js", "MongoDB", "Socket.IO", "Cloudinary", "Redux Toolkit", "Tailwind CSS", "GSAP"],
    github_url: "https://github.com/shubham-meshram/pinterest-clone",
    live_url: "https://pinterest-clone.vercel.app",
    category: "fullstack",
    featured: true,
  },
  {
    title: "Full-Stack E-commerce",
    description: "Responsive e-commerce application with user authentication, product filters, Razorpay payment integration and smooth scroll animations.",
    tech_stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB", "GSAP", "Razorpay"],
    github_url: "https://github.com/shubham-meshram/ecommerce",
    live_url: "https://ecommerce.vercel.app",
    category: "fullstack",
    featured: true,
  },
  {
    title: "Srijan Admin Panel",
    description: "ERP and LMS admin panel for managing modules, users, and data with role-based access control and Excel/PDF export functionality.",
    tech_stack: ["Next.js", "Tailwind CSS", "Shadcn UI", "Node.js", "PostgreSQL"],
    category: "fullstack",
    featured: true,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log("✅ Seeded", projects.length, "projects");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });

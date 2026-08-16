import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  image?: string;
  category: string;
  featured: boolean;
  created_at: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech_stack: [{ type: String }],
  github_url: String,
  live_url: String,
  image: String,
  category: {
    type: String,
    enum: ["fullstack", "frontend", "backend", "other"],
    default: "fullstack",
  },
  featured: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);

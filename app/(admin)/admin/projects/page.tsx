"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Project } from "@/types";

const emptyProject: Omit<Project, "_id"> = {
  title: "", description: "", tech_stack: [], github_url: "",
  live_url: "", image: "", category: "fullstack", featured: false,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "_id">>(emptyProject);
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      setProjects(data.projects || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyProject);
    setTechInput("");
    setImageFile(null);
    setOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ title: p.title, description: p.description, tech_stack: p.tech_stack,
      github_url: p.github_url || "", live_url: p.live_url || "",
      image: p.image || "", category: p.category, featured: p.featured || false });
    setTechInput("");
    setImageFile(null);
    setOpen(true);
  };

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.tech_stack.includes(t)) {
      setForm({ ...form, tech_stack: [...form.tech_stack, t] });
    }
    setTechInput("");
  };

  const removeTech = (t: string) =>
    setForm({ ...form, tech_stack: form.tech_stack.filter((x) => x !== t) });

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return form.image || null;
    setUploading(true);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((res) => {
        reader.onload = () => res(reader.result as string);
        reader.readAsDataURL(imageFile);
      });
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: base64, folder: "portfolio/projects" }),
      });
      const data = await response.json();
      return data.url;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast.error("Title and description are required");
      return;
    }
    setSaving(true);
    try {
      const imageUrl = await uploadImage();
      const payload = { ...form, image: imageUrl || form.image };
      const url = editing ? `/api/projects/${editing._id}` : "/api/projects";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editing ? "Project updated!" : "Project created!");
      setOpen(false);
      fetchProjects();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Projects</h1>
          <p className="text-muted-foreground font-body mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus size={16} /> New Project
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 size={24} className="animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <div className="glass rounded-xl p-16 text-center">
          <p className="text-muted-foreground font-body mb-4">No projects yet.</p>
          <Button onClick={openCreate} variant="outline" className="gap-2">
            <Plus size={16} /> Add your first project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p._id} className="glass rounded-xl p-5 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-display font-semibold">{p.title}</h3>
                  <Badge variant="secondary" className="text-xs mt-1 capitalize">{p.category}</Badge>
                  {p.featured && <Badge className="text-xs ml-2">Featured</Badge>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                    <Pencil size={14} />
                  </Button>
                  <Button size="icon" variant="ghost" className="hover:text-destructive"
                    onClick={() => handleDelete(p._id!)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-body line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.tech_stack.slice(0, 4).map((t) => (
                  <Badge key={t} variant="outline" className="text-xs font-mono">{t}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Project" : "New Project"}</DialogTitle>
            <DialogDescription>Fill in the project details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Project title" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Description *</Label>
                <Textarea value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                  placeholder="https://github.com/..." />
              </div>
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                  placeholder="https://..." />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Project["category"] })}
                  className="flex h-10 w-full rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {["fullstack", "frontend", "backend", "other"].map((c) => (
                    <option key={c} value={c} className="bg-card">{c}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 accent-primary" />
                  <span className="text-sm font-body">Featured project</span>
                </label>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex gap-2">
                <Input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g. React.js"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())} />
                <Button type="button" variant="outline" onClick={addTech}>Add</Button>
              </div>
              {form.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.tech_stack.map((t) => (
                    <Badge key={t} variant="secondary" className="gap-1 cursor-pointer"
                      onClick={() => removeTech(t)}>
                      {t} ✕
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Project Image</Label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-4 py-2 glass rounded-lg cursor-pointer hover:border-primary/30 transition-all text-sm font-body">
                  <ImageIcon size={14} className="text-primary" />
                  {imageFile ? imageFile.name : "Choose image"}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </label>
                {form.image && !imageFile && (
                  <span className="text-xs text-muted-foreground font-mono truncate max-w-48">
                    Current: uploaded
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving || uploading} className="flex-1">
                {saving || uploading ? <><Loader2 size={14} className="animate-spin mr-2" /> Saving...</> : "Save Project"}
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

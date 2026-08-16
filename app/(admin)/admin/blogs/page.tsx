"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Blog } from "@/types";
import { formatDate } from "@/lib/utils";

const empty: Omit<Blog, "_id"> = {
  title: "", slug: "", excerpt: "", content: "", cover_image: "", tags: [], published: false,
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [form, setForm] = useState<Omit<Blog, "_id">>(empty);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs?all=true");
      const data = await res.json();
      setBlogs(data.blogs || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const openCreate = () => {
    setEditing(null); setForm(empty); setTagInput(""); setOpen(true);
  };

  const openEdit = (b: Blog) => {
    setEditing(b);
    setForm({ title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content,
      cover_image: b.cover_image || "", tags: b.tags, published: b.published });
    setTagInput(""); setOpen(true);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setForm({ ...form, tags: [...form.tags, t] });
    setTagInput("");
  };

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error("Title and content required"); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/blogs/${editing._id}` : "/api/blogs";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(editing ? "Blog updated!" : "Blog created!");
      setOpen(false); fetch_();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      toast.success("Blog deleted"); fetch_();
    } catch { toast.error("Failed to delete"); }
  };

  const togglePublish = async (b: Blog) => {
    try {
      await fetch(`/api/blogs/${b._id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...b, published: !b.published }),
      });
      toast.success(b.published ? "Unpublished" : "Published!"); fetch_();
    } catch { toast.error("Failed"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">Blog Posts</h1>
          <p className="text-muted-foreground font-body mt-1">Manage your blog content</p>
        </div>
        <Button onClick={openCreate} className="gap-2"><Plus size={16} /> New Post</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 size={24} className="animate-spin text-primary" /></div>
      ) : blogs.length === 0 ? (
        <div className="glass rounded-xl p-16 text-center">
          <p className="text-muted-foreground font-body mb-4">No blog posts yet.</p>
          <Button onClick={openCreate} variant="outline" className="gap-2"><Plus size={16} /> Write first post</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {blogs.map((b) => (
            <div key={b._id} className="glass rounded-xl p-5 flex items-center justify-between gap-4 hover:border-primary/30 transition-all">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-display font-semibold">{b.title}</h3>
                  <Badge variant={b.published ? "default" : "secondary"} className="text-xs">
                    {b.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-body truncate w-96">{b.excerpt}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{formatDate(b.created_at!)}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => togglePublish(b)} title={b.published ? "Unpublish" : "Publish"}>
                  {b.published ? <EyeOff size={14} /> : <Eye size={14} />}
                </Button>
                <Button size="icon" variant="ghost" onClick={() => openEdit(b)}><Pencil size={14} /></Button>
                <Button size="icon" variant="ghost" className="hover:text-destructive" onClick={() => handleDelete(b._id!)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Blog Post" : "New Blog Post"}</DialogTitle>
            <DialogDescription>Fill in the blog post details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated-from-title" />
            </div>
            <div className="space-y-2">
              <Label>Excerpt *</Label>
              <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} placeholder="Short summary..." />
            </div>
            <div className="space-y-2">
              <Label>Content *</Label>
              <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} placeholder="Write your post in Markdown..." />
            </div>
            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="e.g. React"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {form.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="gap-1 cursor-pointer"
                      onClick={() => setForm({ ...form, tags: form.tags.filter((x) => x !== t) })}>
                      {t} ✕
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 accent-primary" />
              <span className="text-sm font-body">Publish immediately</span>
            </label>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving} className="flex-1">
                {saving ? <><Loader2 size={14} className="animate-spin mr-2" /> Saving...</> : "Save Post"}
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

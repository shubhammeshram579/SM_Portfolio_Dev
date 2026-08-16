import { FolderOpen, FileText, Mail, Eye } from "lucide-react";
import dbConnect from "@/lib/db";
import ProjectModel from "@/models/Project";
import BlogModel from "@/models/Blog";
import ContactModel from "@/models/Contact";

async function getStats() {
  try {
    await dbConnect();
    const [projects, blogs, contacts, newLeads] = await Promise.all([
      ProjectModel.countDocuments(),
      BlogModel.countDocuments({ published: true }),
      ContactModel.countDocuments(),
      ContactModel.countDocuments({ status: "new" }),
    ]);
    return { projects, blogs, contacts, newLeads };
  } catch {
    return { projects: 0, blogs: 0, contacts: 0, newLeads: 0 };
  }
}

async function getRecentContacts() {
  try {
    await dbConnect();
    const contacts = await ContactModel.find({}).sort({ created_at: -1 }).limit(5).lean();
    return JSON.parse(JSON.stringify(contacts));
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const stats = await getStats();
  const recentContacts = await getRecentContacts();

  const cards = [
    { label: "Total Projects", value: stats.projects, icon: FolderOpen, color: "text-blue-400" },
    { label: "Published Blogs", value: stats.blogs, icon: FileText, color: "text-green-400" },
    { label: "Total Leads", value: stats.contacts, icon: Mail, color: "text-yellow-400" },
    { label: "New Leads", value: stats.newLeads, icon: Eye, color: "text-primary" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground font-body mt-1">Welcome back, Shubham 👋</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground font-body">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <div className={`text-3xl font-display font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Recent Leads */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-display font-semibold text-lg mb-4">Recent Contact Leads</h2>
        {recentContacts.length === 0 ? (
          <p className="text-muted-foreground text-sm font-body text-center py-8">No contacts yet.</p>
        ) : (
          <div className="space-y-3">
            {recentContacts.map((c: { _id: string; name: string; email: string; message: string; status: string; created_at: string }) => (
              <div key={c._id} className="flex items-start gap-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm shrink-0">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="font-medium text-sm font-body">{c.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                      c.status === "new" ? "bg-primary/10 text-primary" :
                      c.status === "read" ? "bg-secondary text-muted-foreground" :
                      "bg-green-500/10 text-green-400"
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{c.email}</p>
                  <p className="text-sm text-muted-foreground font-body mt-1 truncate">{c.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

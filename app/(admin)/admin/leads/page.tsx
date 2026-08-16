"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Trash2, Loader2, Mail, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminLeadsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">("all");

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      setContacts(data.contacts || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetch_(); }, [fetch_]);

  const updateStatus = async (id: string, status: Contact["status"]) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast.success("Status updated");
      fetch_();
    } catch { toast.error("Failed"); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      toast.success("Lead deleted"); fetch_();
    } catch { toast.error("Failed to delete"); }
  };

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);
  const counts = {
    all: contacts.length,
    new: contacts.filter((c) => c.status === "new").length,
    read: contacts.filter((c) => c.status === "read").length,
    replied: contacts.filter((c) => c.status === "replied").length,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold">Contact Leads</h1>
        <p className="text-muted-foreground font-body mt-1">Manage incoming messages from your portfolio</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "new", "read", "replied"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-body transition-all capitalize ${
              filter === f ? "bg-primary text-primary-foreground" : "glass hover:border-primary/30"
            }`}
          >
            {f} <span className="text-xs opacity-70 ml-1">({counts[f]})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 size={24} className="animate-spin text-primary" /></div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-xl p-16 text-center">
          <MessageSquare size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-body">No leads in this category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c._id} className="glass rounded-xl p-6 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold shrink-0">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-display font-semibold">{c.name}</p>
                    <a href={`mailto:${c.email}`} className="text-sm text-primary font-mono hover:underline">
                      {c.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={c.status === "new" ? "default" : "secondary"} className="capitalize text-xs">
                    {c.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">{formatDate(c.created_at!)}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground font-body mt-4 leading-relaxed border-l-2 border-primary/30 pl-4">
                {c.message}
              </p>

              <div className="flex items-center gap-2 mt-4">
                {c.status === "new" && (
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs"
                    onClick={() => updateStatus(c._id!, "read")}>
                    <Mail size={12} /> Mark Read
                  </Button>
                )}
                {c.status !== "replied" && (
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs"
                    onClick={() => updateStatus(c._id!, "replied")}>
                    <CheckCircle2 size={12} /> Mark Replied
                  </Button>
                )}
                <a href={`mailto:${c.email}?subject=Re: Portfolio Inquiry`}>
                  <Button size="sm" className="gap-1.5 text-xs">
                    <Mail size={12} /> Reply via Email
                  </Button>
                </a>
                <Button size="icon" variant="ghost" className="hover:text-destructive ml-auto"
                  onClick={() => handleDelete(c._id!)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

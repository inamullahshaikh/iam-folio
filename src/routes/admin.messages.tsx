import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../components/admin/AdminLayout";
import Drawer from "../components/admin/Drawer";
import { getMessages, replyToMessage } from "../lib/api";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessages,
});

function AdminMessages() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<any>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const reload = () => {
    setLoading(true);
    getMessages()
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const openReply = (m: any) => {
    setActive(m);
    setSubject(`Re: Your message to ${m.name || "portfolio"}`);
    setBody("");
    setOpen(true);
  };

  const send = async () => {
    if (!active?.id) return;
    if (!active?.email) {
      toast.error("This message has no sender email");
      return;
    }
    if (!body.trim()) {
      toast.error("Write a reply");
      return;
    }
    setSending(true);
    try {
      await replyToMessage(active.id, body.trim(), subject.trim() || undefined);
      toast.success("Reply sent");
      setOpen(false);
      reload();
    } catch (e: any) {
      toast.error(e.message || "Failed to send");
    } finally {
      setSending(false);
    }
  };

  const fmt = (d: string) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  };

  return (
    <AdminLayout>
      <div className="admin-head">
        <h1>Messages</h1>
      </div>
      {loading ? (
        <div className="sk" style={{ height: 200 }} />
      ) : items.length === 0 ? (
        <div className="empty">
          <h3>No messages yet</h3>
          <p>Submissions from the contact form will show here.</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>From</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Replied</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{m.email}</td>
                <td style={{ maxWidth: 280, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.message}</td>
                <td style={{ fontSize: 12, color: "var(--muted)" }}>{fmt(m.created_at)}</td>
                <td>{m.replied_at ? "✓" : "—"}</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => openReply(m)}>
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Drawer open={open} onClose={() => setOpen(false)} title={active ? `Reply to ${active.name}` : "Reply"}>
        {active && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              <strong>To:</strong> {active.email || "No sender email"}
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>
              <strong>Original:</strong> {active.message}
            </p>
            <div className="form-field">
              <label>Subject</label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div className="form-field">
              <label>Your reply (sent via Gmail SMTP)</label>
              <textarea rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
            </div>
            <button type="button" className="btn btn-primary" disabled={sending || !active.email} onClick={send}>
              {sending ? "Sending…" : "Send email"}
            </button>
          </div>
        )}
      </Drawer>
    </AdminLayout>
  );
}

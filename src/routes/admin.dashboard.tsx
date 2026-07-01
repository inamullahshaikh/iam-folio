import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import { getProjectsForAdmin, getCertificationsForAdmin, getMessages } from "../lib/api";

export const Route = createFileRoute("/admin/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, certs: 0, messages: 0 });
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    Promise.all([getProjectsForAdmin(), getCertificationsForAdmin(), getMessages()]).then(([p, c, m]) => {
      setStats({ projects: p.length, certs: c.length, messages: m.length });
      setMessages(m.slice(0, 10));
    });
  }, []);
  return (
    <AdminLayout>
      <div className="admin-head"><h1>Dashboard</h1></div>
      <div className="stat-grid">
        <div className="stat-card"><div className="label">Projects</div><div className="val">{stats.projects}</div></div>
        <div className="stat-card"><div className="label">Certifications</div><div className="val">{stats.certs}</div></div>
        <div className="stat-card"><div className="label">Messages</div><div className="val">{stats.messages}</div></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, margin: 0 }}>Recent messages</h2>
        <Link to="/admin/messages" className="btn btn-outline btn-sm">
          Open inbox
        </Link>
      </div>
      {messages.length === 0 ? (
        <div className="empty"><h3>No messages yet</h3><p>Contact form submissions will appear here.</p></div>
      ) : (
        <table className="table">
          <thead><tr><th>From</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>
          <tbody>
            {messages.map((m: any) => (
              <tr key={m.id || m._id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td style={{ maxWidth: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</td>
                <td>{m.created_at || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}

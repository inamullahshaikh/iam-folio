import { useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { getToken, clearToken } from "../../lib/api";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/site", label: "Site & resume" },
  { to: "/admin/messages", label: "Messages" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/certifications", label: "Certifications" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/skills", label: "Skills" },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const { location } = useRouterState();
  useEffect(() => {
    if (!getToken()) navigate({ to: "/admin/login" });
  }, [navigate]);
  const logout = () => { clearToken(); navigate({ to: "/admin/login" }); };
  return (
    <div className="admin-wrap">
      <aside className="admin-side">
        <div className="brand">IS · Admin</div>
        {NAV.map(n => (
          <Link key={n.to} to={n.to} className={location.pathname === n.to ? "active" : ""}>{n.label}</Link>
        ))}
        <button className="btn btn-ghost" onClick={logout} style={{ marginTop: "auto", justifyContent: "flex-start" }}>Logout</button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

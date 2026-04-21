import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../components/admin/AdminLayout";
import Drawer from "../components/admin/Drawer";
import TagInput from "../components/admin/TagInput";
import KVBuilder from "../components/admin/KVBuilder";
import Toggle from "../components/admin/Toggle";
import { getProjects, createProject, updateProject, deleteProject } from "../lib/api";
import { PlusIcon, EditIcon, TrashIcon } from "../components/icons/Icons";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
});

const CATS = ["AI & RAG SYSTEMS","COMPUTER VISION & ML","DEVOPS & INFRA","WEB & SOFTWARE","ACADEMIC"];
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const blank = () => ({ id: "", name: "", slug: "", category: CATS[0], short_description: "", long_description: "", what_it_does: "", tech_breakdown: {}, challenges: "", stack_tags: [], github_url: "", live_url: "", start_date: "", end_date: "", screenshots: [], featured: false, published: true });

function AdminProjects() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});

  const reload = () => { setLoading(true); getProjects().then(d => { setItems(d); setLoading(false); }); };
  useEffect(reload, []);

  const openNew = () => { setForm(blank()); setEditingId(null); setErrors({}); setOpen(true); };
  const openEdit = (p: any) => { setForm({ ...blank(), ...p }); setEditingId(p.id); setErrors({}); setOpen(true); };

  const set = (k: string, v: any) => setForm((f: any) => {
    const n = { ...f, [k]: v };
    if (k === "name" && !editingId) n.slug = slugify(v);
    return n;
  });

  const save = async () => {
    const e: any = {};
    if (!form.name.trim()) e.name = true;
    if (!form.slug.trim()) e.slug = true;
    if (!form.short_description.trim()) e.short_description = true;
    setErrors(e);
    if (Object.keys(e).length) { toast.error("Fill required fields"); return; }
    try {
      if (editingId) await updateProject(editingId, form); else await createProject(form);
      toast.success(editingId ? "Project updated" : "Project created");
      setOpen(false); reload();
    } catch (err: any) { toast.error(err.message || "Save failed"); }
  };

  const remove = async (p: any) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    try { await deleteProject(p.id); toast.success("Deleted"); reload(); }
    catch (err: any) { toast.error(err.message || "Delete failed"); }
  };

  return (
    <AdminLayout>
      <div className="admin-head">
        <h1>Projects</h1>
        <button className="btn btn-primary" onClick={openNew}><PlusIcon size={16}/> Add Project</button>
      </div>
      {loading ? <div className="sk" style={{ height: 200 }} /> : items.length === 0 ? (
        <div className="empty">
          <h3>No projects yet</h3><p>Add your first project to get started.</p>
          <button className="btn btn-primary" onClick={openNew}><PlusIcon size={16}/> Add First Project</button>
        </div>
      ) : (
        <table className="table">
          <thead><tr><th>Name</th><th>Category</th><th>Stack</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((p: any) => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td style={{ color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{p.category}</td>
                <td><div style={{ display:"flex", gap: 4, flexWrap:"wrap" }}>{(p.stack_tags || []).slice(0,3).map((t: string) => <span key={t} className="tag">{t}</span>)}</div></td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>{p.start_date} — {p.end_date}</td>
                <td><div className="table-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}><EditIcon size={14}/></button>
                  <button className="btn btn-ghost btn-sm" onClick={() => remove(p)}><TrashIcon size={14}/></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Drawer open={open} onClose={() => setOpen(false)} title={editingId ? "Edit Project" : "New Project"}
        footer={<>
          <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={save}>Save</button>
        </>}>
        <div className={`form-field ${errors.name ? "error" : ""}`}><label>Name</label><input value={form.name} onChange={e => set("name", e.target.value)} /></div>
        <div className={`form-field ${errors.slug ? "error" : ""}`}><label>Slug</label><input value={form.slug} onChange={e => set("slug", e.target.value)} /></div>
        <div className="form-field"><label>Category</label><select value={form.category} onChange={e => set("category", e.target.value)}>{CATS.map(c => <option key={c}>{c}</option>)}</select></div>
        <div className={`form-field ${errors.short_description ? "error" : ""}`}><label>Short description</label><input value={form.short_description} onChange={e => set("short_description", e.target.value)} /></div>
        <div className="form-field"><label>Long description</label><textarea rows={3} value={form.long_description} onChange={e => set("long_description", e.target.value)} /></div>
        <div className="form-field"><label>What it does (markdown)</label><textarea rows={4} value={form.what_it_does} onChange={e => set("what_it_does", e.target.value)} /></div>
        <div className="form-field"><label>Tech breakdown</label><KVBuilder value={form.tech_breakdown} onChange={(v: any) => set("tech_breakdown", v)} /></div>
        <div className="form-field"><label>Challenges (markdown)</label><textarea rows={4} value={form.challenges} onChange={e => set("challenges", e.target.value)} /></div>
        <div className="form-field"><label>Stack tags</label><TagInput value={form.stack_tags} onChange={(v: any) => set("stack_tags", v)} /></div>
        <div className="form-row">
          <div className="form-field"><label>GitHub URL</label><input value={form.github_url} onChange={e => set("github_url", e.target.value)} /></div>
          <div className="form-field"><label>Live URL</label><input value={form.live_url} onChange={e => set("live_url", e.target.value)} /></div>
        </div>
        <div className="form-row">
          <div className="form-field"><label>Start date</label><input value={form.start_date} onChange={e => set("start_date", e.target.value)} placeholder="2025-01" /></div>
          <div className="form-field"><label>End date</label><input value={form.end_date} onChange={e => set("end_date", e.target.value)} placeholder="2025-05" /></div>
        </div>
        <div className="form-field"><label>Screenshots (URLs)</label>
          <TagInput value={form.screenshots} onChange={(v: any) => set("screenshots", v)} placeholder="Paste image URL + Enter" />
        </div>
        <div className="form-field"><label>Featured</label><Toggle on={form.featured} onChange={(v: boolean) => set("featured", v)} /></div>
        <div className="form-field"><label>Published</label><Toggle on={form.published} onChange={(v: boolean) => set("published", v)} /></div>
      </Drawer>
    </AdminLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../components/admin/AdminLayout";
import Drawer from "../components/admin/Drawer";
import Toggle from "../components/admin/Toggle";
import { getCertifications, createCert, updateCert, deleteCert } from "../lib/api";
import { PlusIcon, EditIcon, TrashIcon } from "../components/icons/Icons";

export const Route = createFileRoute("/admin/certifications")({
  component: AdminCerts,
});

const blank = () => ({ id: "", name: "", issuer: "", year: "", url: "", in_progress: false });

function AdminCerts() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);
  const reload = () => { setLoading(true); getCertifications().then(d => { setItems(d); setLoading(false); }); };
  useEffect(reload, []);
  const openNew = () => { setForm(blank()); setEditingId(null); setOpen(true); };
  const openEdit = (c: any) => { setForm({ ...blank(), ...c }); setEditingId(c.id); setOpen(true); };
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = async () => {
    if (!form.name || !form.issuer) { toast.error("Name & issuer required"); return; }
    try { if (editingId) await updateCert(editingId, form); else await createCert(form); toast.success("Saved"); setOpen(false); reload(); }
    catch (err: any) { toast.error(err.message || "Failed"); }
  };
  const remove = async (c: any) => { if (!confirm(`Delete "${c.name}"?`)) return; try { await deleteCert(c.id); toast.success("Deleted"); reload(); } catch (e: any) { toast.error(e.message); } };
  return (
    <AdminLayout>
      <div className="admin-head"><h1>Certifications</h1><button className="btn btn-primary" onClick={openNew}><PlusIcon size={16}/> Add</button></div>
      {loading ? <div className="sk" style={{ height: 200 }} /> : items.length === 0 ? (
        <div className="empty"><h3>No certifications</h3><p>Add your first certification.</p><button className="btn btn-primary" onClick={openNew}><PlusIcon size={16}/> Add First Item</button></div>
      ) : (
        <table className="table">
          <thead><tr><th>Name</th><th>Issuer</th><th>Year</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>{items.map((c: any) => (
            <tr key={c.id}>
              <td><strong>{c.name}</strong></td>
              <td style={{ fontFamily:"var(--font-mono)", fontSize: 13, color:"var(--muted)" }}>{c.issuer}</td>
              <td>{c.year}</td>
              <td>{c.in_progress ? <span className="tag">In progress</span> : <span style={{ color: "var(--muted)" }}>Done</span>}</td>
              <td><div className="table-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}><EditIcon size={14}/></button>
                <button className="btn btn-ghost btn-sm" onClick={() => remove(c)}><TrashIcon size={14}/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      )}
      <Drawer open={open} onClose={() => setOpen(false)} title={editingId ? "Edit Certification" : "New Certification"}
        footer={<><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></>}>
        <div className="form-field"><label>Name</label><input value={form.name} onChange={e => set("name", e.target.value)} /></div>
        <div className="form-field"><label>Issuer</label><input value={form.issuer} onChange={e => set("issuer", e.target.value)} /></div>
        <div className="form-field"><label>Year</label><input value={form.year} onChange={e => set("year", e.target.value)} /></div>
        <div className="form-field"><label>URL</label><input value={form.url} onChange={e => set("url", e.target.value)} /></div>
        <div className="form-field"><label>In progress</label><Toggle on={form.in_progress} onChange={(v: boolean) => set("in_progress", v)} /></div>
      </Drawer>
    </AdminLayout>
  );
}

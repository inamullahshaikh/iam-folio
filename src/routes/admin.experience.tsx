import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../components/admin/AdminLayout";
import Drawer from "../components/admin/Drawer";
import ListBuilder from "../components/admin/ListBuilder";
import { getExperience, createExp, updateExp, deleteExp } from "../lib/api";
import { PlusIcon, EditIcon, TrashIcon } from "../components/icons/Icons";

export const Route = createFileRoute("/admin/experience")({
  component: AdminExp,
});

const blank = () => ({ id: "", company: "", role: "", location: "", start_date: "", end_date: "", bullets: [] });

function AdminExp() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);
  const reload = () => { setLoading(true); getExperience().then(d => { setItems(d); setLoading(false); }); };
  useEffect(reload, []);
  const openNew = () => { setForm(blank()); setEditingId(null); setOpen(true); };
  const openEdit = (x: any) => { setForm({ ...blank(), ...x }); setEditingId(x.id); setOpen(true); };
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  const save = async () => {
    if (!form.company || !form.role) { toast.error("Company & role required"); return; }
    try { if (editingId) await updateExp(editingId, form); else await createExp(form); toast.success("Saved"); setOpen(false); reload(); }
    catch (err: any) { toast.error(err.message || "Failed"); }
  };
  const remove = async (x: any) => { if (!confirm(`Delete "${x.company}"?`)) return; try { await deleteExp(x.id); toast.success("Deleted"); reload(); } catch (e: any) { toast.error(e.message); } };
  return (
    <AdminLayout>
      <div className="admin-head"><h1>Experience</h1><button className="btn btn-primary" onClick={openNew}><PlusIcon size={16}/> Add</button></div>
      {loading ? <div className="sk" style={{ height: 200 }} /> : items.length === 0 ? (
        <div className="empty"><h3>No experience yet</h3><p>Add your first role.</p><button className="btn btn-primary" onClick={openNew}><PlusIcon size={16}/> Add First Item</button></div>
      ) : (
        <table className="table">
          <thead><tr><th>Company</th><th>Role</th><th>Dates</th><th>Actions</th></tr></thead>
          <tbody>{items.map((x: any) => (
            <tr key={x.id}>
              <td><strong>{x.company}</strong></td>
              <td>{x.role}</td>
              <td style={{ fontFamily:"var(--font-mono)", fontSize: 12, color:"var(--muted)" }}>{x.start_date} — {x.end_date}</td>
              <td><div className="table-actions">
                <button className="btn btn-ghost btn-sm" onClick={() => openEdit(x)}><EditIcon size={14}/></button>
                <button className="btn btn-ghost btn-sm" onClick={() => remove(x)}><TrashIcon size={14}/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table>
      )}
      <Drawer open={open} onClose={() => setOpen(false)} title={editingId ? "Edit Experience" : "New Experience"}
        footer={<><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save</button></>}>
        <div className="form-field"><label>Company</label><input value={form.company} onChange={e => set("company", e.target.value)} /></div>
        <div className="form-field"><label>Role</label><input value={form.role} onChange={e => set("role", e.target.value)} /></div>
        <div className="form-field"><label>Location</label><input value={form.location} onChange={e => set("location", e.target.value)} /></div>
        <div className="form-row">
          <div className="form-field"><label>Start date</label><input value={form.start_date} onChange={e => set("start_date", e.target.value)} placeholder="Aug 2025" /></div>
          <div className="form-field"><label>End date</label><input value={form.end_date} onChange={e => set("end_date", e.target.value)} placeholder="Present" /></div>
        </div>
        <div className="form-field"><label>Bullets</label><ListBuilder value={form.bullets} onChange={(v: any) => set("bullets", v)} placeholder="One bullet point" /></div>
      </Drawer>
    </AdminLayout>
  );
}

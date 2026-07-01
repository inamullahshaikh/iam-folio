import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../components/admin/AdminLayout";
import Drawer from "../components/admin/Drawer";
import ListBuilder from "../components/admin/ListBuilder";
import { getEducationForAdmin, createEdu, updateEdu, deleteEdu } from "../lib/api";
import { PlusIcon, EditIcon, TrashIcon } from "../components/icons/Icons";

export const Route = createFileRoute("/admin/education")({
  component: AdminEducation,
});

const blank = () => ({ id: "", company: "", role: "", location: "", start_date: "", end_date: "", bullets: [], sort_order: 0 });

function AdminEducation() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = () => {
    setLoading(true);
    getEducationForAdmin().then((d) => {
      setItems(Array.isArray(d) ? d : []);
      setLoading(false);
    });
  };

  useEffect(reload, []);

  const openNew = () => {
    setForm(blank());
    setEditingId(null);
    setOpen(true);
  };
  const openEdit = (x: any) => {
    setForm({ ...blank(), ...x });
    setEditingId(x.id);
    setOpen(true);
  };
  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.company || !form.role) {
      toast.error("Institute and degree are required");
      return;
    }
    try {
      const payload = {
        company: String(form.company).trim(),
        role: String(form.role).trim(),
        location: String(form.location || "").trim(),
        start_date: String(form.start_date || "").trim(),
        end_date: String(form.end_date || "").trim(),
        bullets: Array.isArray(form.bullets) ? form.bullets : [],
        sort_order: Number(form.sort_order) || 0,
      };
      if (editingId) await updateEdu(editingId, payload);
      else await createEdu(payload);
      toast.success("Saved");
      setOpen(false);
      reload();
    } catch (err: any) {
      toast.error(err.message || "Failed");
    }
  };

  const remove = async (x: any) => {
    if (!confirm(`Delete "${x.company}"?`)) return;
    try {
      await deleteEdu(x.id);
      toast.success("Deleted");
      reload();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-head">
        <h1>Education</h1>
        <button className="btn btn-primary" onClick={openNew}>
          <PlusIcon size={16} /> Add
        </button>
      </div>
      {loading ? (
        <div className="sk" style={{ height: 200 }} />
      ) : items.length === 0 ? (
        <div className="empty">
          <h3>No education entries yet</h3>
          <p>Add your first education item.</p>
          <button className="btn btn-primary" onClick={openNew}>
            <PlusIcon size={16} /> Add First Item
          </button>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Institute</th>
              <th>Degree</th>
              <th>Dates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x: any) => (
              <tr key={x.id}>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{x.sort_order ?? 0}</td>
                <td>
                  <strong>{x.company}</strong>
                </td>
                <td>{x.role}</td>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
                  {x.start_date} — {x.end_date}
                </td>
                <td>
                  <div className="table-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => openEdit(x)}>
                      <EditIcon size={14} />
                    </button>
                    <button className="btn btn-ghost btn-sm" onClick={() => remove(x)}>
                      <TrashIcon size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title={editingId ? "Edit Education" : "New Education"}
        footer={
          <>
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={save}>
              Save
            </button>
          </>
        }
      >
        <div className="form-field">
          <label>Institute</label>
          <input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="FAST-NUCES" />
        </div>
        <div className="form-field">
          <label>Degree / Program</label>
          <input value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="BS Computer Science" />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input value={form.location} onChange={(e) => set("location", e.target.value)} />
        </div>
        <div className="form-row">
          <div className="form-field">
            <label>Start date</label>
            <input value={form.start_date} onChange={(e) => set("start_date", e.target.value)} placeholder="Aug 2022" />
          </div>
          <div className="form-field">
            <label>End date</label>
            <input value={form.end_date} onChange={(e) => set("end_date", e.target.value)} placeholder="Jun 2026" />
          </div>
        </div>
        <div className="form-field">
          <label>Sort order</label>
          <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value || 0))} />
        </div>
        <div className="form-field">
          <label>Bullets</label>
          <ListBuilder value={form.bullets} onChange={(v: any) => set("bullets", v)} placeholder="One bullet point" />
        </div>
      </Drawer>
    </AdminLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../components/admin/AdminLayout";
import Drawer from "../components/admin/Drawer";
import ListBuilder from "../components/admin/ListBuilder";
import { getSkillsForAdmin, createSkill, updateSkill, deleteSkill } from "../lib/api";
import { PlusIcon, EditIcon, TrashIcon } from "../components/icons/Icons";

export const Route = createFileRoute("/admin/skills")({
  component: AdminSkills,
});

const blank = () => ({ id: "", category: "", tags: [] as string[], sort_order: 0 });

function AdminSkills() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(blank());
  const [editingId, setEditingId] = useState<string | null>(null);

  const reload = () => {
    setLoading(true);
    getSkillsForAdmin()
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const openNew = () => {
    setForm(blank());
    setEditingId(null);
    setOpen(true);
  };

  const openEdit = (x: any) => {
    setForm({ ...blank(), ...x, tags: [...(x.tags || [])] });
    setEditingId(x.id);
    setOpen(true);
  };

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.category?.trim()) {
      toast.error("Category is required");
      return;
    }
    const tags = (form.tags || []).map((t: string) => String(t).trim()).filter(Boolean);
    const payload = {
      category: form.category.trim(),
      tags,
      sort_order: Number(form.sort_order) || 0,
    };
    try {
      if (editingId) await updateSkill(editingId, payload);
      else await createSkill(payload);
      toast.success("Saved");
      setOpen(false);
      reload();
    } catch (err: any) {
      toast.error(err.message || "Failed");
    }
  };

  const remove = async (x: any) => {
    if (!confirm(`Delete category "${x.category}"?`)) return;
    try {
      await deleteSkill(x.id);
      toast.success("Deleted");
      reload();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <AdminLayout>
      <div className="admin-head">
        <h1>Skills</h1>
        <button className="btn btn-primary" onClick={openNew}>
          <PlusIcon size={16} /> Add category
        </button>
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16, maxWidth: 640 }}>
        Each row is a category (left column on the site) and a list of tags. Lower <strong>Sort order</strong> appears first.
      </p>
      {loading ? (
        <div className="sk" style={{ height: 200 }} />
      ) : items.length === 0 ? (
        <div className="empty">
          <h3>No skill rows in the database</h3>
          <p>The public site may still show defaults until you add categories here.</p>
          <button className="btn btn-primary" onClick={openNew}>
            <PlusIcon size={16} /> Add first category
          </button>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x: any) => (
              <tr key={x.id}>
                <td style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>{x.sort_order ?? 0}</td>
                <td>
                  <strong>{x.category}</strong>
                </td>
                <td style={{ maxWidth: 360, fontSize: 12, color: "var(--muted)" }}>
                  {(x.tags || []).join(" · ")}
                </td>
                <td>
                  <div className="table-actions">
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(x)}>
                      <EditIcon size={14} />
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => remove(x)}>
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
        title={editingId ? "Edit skill category" : "New skill category"}
        footer={
          <>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={save}>
              Save
            </button>
          </>
        }
      >
        <div className="form-field">
          <label>Category name</label>
          <input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Backend" />
        </div>
        <div className="form-field">
          <label>Sort order</label>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => set("sort_order", e.target.value === "" ? 0 : Number(e.target.value))}
          />
        </div>
        <div className="form-field">
          <label>Tags</label>
          <ListBuilder value={form.tags || []} onChange={(v: string[]) => set("tags", v)} placeholder="Tag" />
        </div>
      </Drawer>
    </AdminLayout>
  );
}

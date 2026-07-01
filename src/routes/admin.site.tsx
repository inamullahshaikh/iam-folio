import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import AdminLayout from "../components/admin/AdminLayout";
import ListBuilder from "../components/admin/ListBuilder";
import { getSite, SEED_SITE, updateSite, uploadResume } from "../lib/api";

export const Route = createFileRoute("/admin/site")({
  component: AdminSite,
});

type Fact = { k: string; v: string };

function AdminSite() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({ ...SEED_SITE });
  const [uploading, setUploading] = useState(false);

  const reload = useCallback(() => {
    setLoading(true);
    getSite()
      .then((d) => setForm({ ...SEED_SITE, ...d }))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const set = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const setFact = (i: number, key: "k" | "v", val: string) => {
    const facts = [...(form.about_facts as Fact[])];
    facts[i] = { ...facts[i], [key]: val };
    set("about_facts", facts);
  };
  const addFact = () => set("about_facts", [...(form.about_facts || []), { k: "", v: "" }]);
  const removeFact = (i: number) =>
    set(
      "about_facts",
      (form.about_facts as Fact[]).filter((_, j) => j !== i),
    );

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        hero_title: form.hero_title,
        hero_subtitle: form.hero_subtitle,
        hero_stack_tags: form.hero_stack_tags,
        resume_url: form.resume_url || "",
        github_url: form.github_url,
        linkedin_url: form.linkedin_url,
        leetcode_url: form.leetcode_url,
        email: form.email,
        phone_tel: form.phone_tel,
        phone_display: form.phone_display,
        contact_heading: form.contact_heading,
        contact_sub: form.contact_sub,
        footer_text: form.footer_text,
        about_bio: form.about_bio,
        about_facts: (form.about_facts || []).filter((x: Fact) => x.k?.trim() || x.v?.trim()),
      };
      const next = await updateSite(payload);
      setForm({ ...SEED_SITE, ...next });
      toast.success("Site settings saved");
    } catch (e: any) {
      toast.error(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onResume = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0];
    ev.target.value = "";
    if (!f) return;
    if (f.type !== "application/pdf") {
      toast.error("Please choose a PDF file");
      return;
    }
    setUploading(true);
    try {
      const { resume_url } = await uploadResume(f);
      setForm((prev: any) => ({ ...prev, resume_url }));
      toast.success("Resume uploaded");
    } catch (e: any) {
      toast.error(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="sk" style={{ height: 240 }} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-head">
        <h1>Site &amp; resume</h1>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      <div className="admin-form-grid" style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 720 }}>
        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Hero</h2>
          <div className="form-field">
            <label>Title</label>
            <input value={form.hero_title} onChange={(e) => set("hero_title", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Short summary (subtitle)</label>
            <textarea rows={3} value={form.hero_subtitle} onChange={(e) => set("hero_subtitle", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Stack tags (hero row)</label>
            <ListBuilder value={form.hero_stack_tags || []} onChange={(v: string[]) => set("hero_stack_tags", v)} placeholder="Tag" />
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Links &amp; contact</h2>
          <div className="form-field">
            <label>GitHub URL</label>
            <input value={form.github_url} onChange={(e) => set("github_url", e.target.value)} />
          </div>
          <div className="form-field">
            <label>LinkedIn URL</label>
            <input value={form.linkedin_url} onChange={(e) => set("linkedin_url", e.target.value)} />
          </div>
          <div className="form-field">
            <label>LeetCode URL</label>
            <input value={form.leetcode_url} onChange={(e) => set("leetcode_url", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Email (mailto)</label>
            <input value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Phone (tel: link, E.164)</label>
            <input value={form.phone_tel} onChange={(e) => set("phone_tel", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Phone (display text)</label>
            <input value={form.phone_display} onChange={(e) => set("phone_display", e.target.value)} />
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Contact section</h2>
          <div className="form-field">
            <label>Heading</label>
            <input value={form.contact_heading} onChange={(e) => set("contact_heading", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Subtext</label>
            <textarea rows={2} value={form.contact_sub} onChange={(e) => set("contact_sub", e.target.value)} />
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>About</h2>
          <div className="form-field">
            <label>Bio</label>
            <textarea rows={5} value={form.about_bio} onChange={(e) => set("about_bio", e.target.value)} />
          </div>
          <div className="form-field">
            <label>Facts (label / value)</label>
            {(form.about_facts || []).map((row: Fact, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input
                  value={row.k}
                  onChange={(e) => setFact(i, "k", e.target.value)}
                  placeholder="Label"
                  style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px" }}
                />
                <input
                  value={row.v}
                  onChange={(e) => setFact(i, "v", e.target.value)}
                  placeholder="Value"
                  style={{ flex: 1, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px" }}
                />
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeFact(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline btn-sm" onClick={addFact}>
              Add fact row
            </button>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Footer</h2>
          <div className="form-field">
            <label>Footer line</label>
            <input value={form.footer_text} onChange={(e) => set("footer_text", e.target.value)} />
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Resume (Cloudflare R2)</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
            Configure R2 env vars on the API server, then upload a PDF. The public site uses the returned URL for download.
          </p>
          <div className="form-field">
            <label>Resume URL (read-only after upload; or paste CDN URL)</label>
            <input value={form.resume_url || ""} onChange={(e) => set("resume_url", e.target.value)} placeholder="https://…" />
          </div>
          <label className="btn btn-outline" style={{ display: "inline-flex", cursor: uploading ? "wait" : "pointer" }}>
            {uploading ? "Uploading…" : "Upload PDF"}
            <input type="file" accept="application/pdf" style={{ display: "none" }} disabled={uploading} onChange={onResume} />
          </label>
          {form.resume_url ? (
            <a className="btn btn-ghost" style={{ marginLeft: 8 }} href={form.resume_url} target="_blank" rel="noreferrer">
              Test link
            </a>
          ) : null}
        </section>
      </div>
    </AdminLayout>
  );
}

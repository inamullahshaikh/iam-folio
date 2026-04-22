import { useState } from "react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { sendContact } from "../../lib/api";
import { MailIcon, PhoneIcon, LinkedinIcon, GithubIcon, CodeIcon, ArrowRightIcon } from "../icons/Icons";

export default function Contact({ site }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await sendContact(form);
      toast.success("Message sent. I'll get back to you.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.message || "Failed to send. Try email instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <h2>{site?.contact_heading || "Let's build something."}</h2>
          <p className="contact-sub">{site?.contact_sub || ""}</p>
          <div className="contact-row">
            {site?.email ? <a href={`mailto:${site.email}`}><MailIcon size={16}/> {site.email}</a> : null}
            {site?.phone_tel && site?.phone_display ? (
              <a href={`tel:${site.phone_tel}`}><PhoneIcon size={16}/> {site.phone_display}</a>
            ) : null}
            {site?.linkedin_url ? <a href={site.linkedin_url} target="_blank" rel="noreferrer"><LinkedinIcon size={16}/> LinkedIn</a> : null}
            {site?.github_url ? <a href={site.github_url} target="_blank" rel="noreferrer"><GithubIcon size={16}/> GitHub</a> : null}
            {site?.leetcode_url ? <a href={site.leetcode_url} target="_blank" rel="noreferrer"><CodeIcon size={16}/> LeetCode</a> : null}
          </div>
          <form className="contact-form" onSubmit={submit} noValidate>
            <div className={`field ${errors.name ? "error" : ""}`}>
              <label>Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              {errors.name && <div className="field-err">{errors.name}</div>}
            </div>
            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              {errors.email && <div className="field-err">{errors.email}</div>}
            </div>
            <div className={`field ${errors.message ? "error" : ""}`}>
              <label>Message</label>
              <textarea rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              {errors.message && <div className="field-err">{errors.message}</div>}
            </div>
            <div>
              <button type="submit" className="btn btn-primary" disabled={sending}>
                {sending ? "Sending..." : <>Send <ArrowRightIcon size={16}/></>}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

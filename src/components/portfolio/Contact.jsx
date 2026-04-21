import { useState } from "react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { sendContact } from "../../lib/api";
import { MailIcon, PhoneIcon, LinkedinIcon, GithubIcon, CodeIcon, ArrowRightIcon } from "../icons/Icons";

export default function Contact() {
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
          <h2>Let's build something.</h2>
          <p className="contact-sub">Open to AI engineering roles, internships, and interesting problems.</p>
          <div className="contact-row">
            <a href="mailto:inam@example.com"><MailIcon size={16}/> inam@example.com</a>
            <a href="tel:+923000000000"><PhoneIcon size={16}/> +92 300 0000000</a>
            <a href="https://linkedin.com/in/inamshz" target="_blank" rel="noreferrer"><LinkedinIcon size={16}/> LinkedIn</a>
            <a href="https://github.com/inamshz" target="_blank" rel="noreferrer"><GithubIcon size={16}/> GitHub</a>
            <a href="https://leetcode.com/inamshz" target="_blank" rel="noreferrer"><CodeIcon size={16}/> LeetCode</a>
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

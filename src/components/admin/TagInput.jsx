import { useState } from "react";
export default function TagInput({ value = [], onChange, placeholder = "Type and press Enter" }) {
  const [v, setV] = useState("");
  const add = () => { const t = v.trim(); if (t && !value.includes(t)) onChange([...value, t]); setV(""); };
  return (
    <div className="tag-input-wrap">
      {value.map(t => (
        <span key={t} className="tag-pill">{t}<button type="button" onClick={() => onChange(value.filter(x => x !== t))}>×</button></span>
      ))}
      <input value={v} onChange={e => setV(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder={placeholder} />
    </div>
  );
}

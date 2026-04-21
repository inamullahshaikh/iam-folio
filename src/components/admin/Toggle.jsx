export default function Toggle({ on, onChange, label }) {
  return (
    <div className="toggle-row">
      <button type="button" className={`toggle ${on ? "on" : ""}`} onClick={() => onChange(!on)} aria-pressed={on} />
      {label && <span style={{ fontSize: 14 }}>{label}</span>}
    </div>
  );
}

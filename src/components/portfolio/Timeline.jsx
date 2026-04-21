export default function Timeline({ items }) {
  return (
    <div className="timeline">
      {items.map((it, i) => (
        <div className="timeline-item" key={it.id || i}>
          <div className="timeline-head">
            <div className="timeline-company">{it.company}</div>
            <div className="timeline-date">{it.start_date} — {it.end_date}</div>
          </div>
          <div className="timeline-role">{it.role}{it.location ? ` · ${it.location}` : ""}</div>
          {it.bullets && it.bullets.length > 0 && (
            <ul className="timeline-bullets">{it.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
          )}
        </div>
      ))}
    </div>
  );
}

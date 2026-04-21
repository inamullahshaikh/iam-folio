import { PlusIcon, TrashIcon } from "../icons/Icons";
export default function KVBuilder({ value = {}, onChange }) {
  const entries = Object.entries(value);
  const setKey = (i, k) => { const ne = [...entries]; ne[i] = [k, ne[i][1]]; onChange(Object.fromEntries(ne)); };
  const setVal = (i, v) => { const ne = [...entries]; ne[i] = [ne[i][0], v]; onChange(Object.fromEntries(ne)); };
  const add = () => { onChange({ ...value, [`Key ${entries.length + 1}`]: "" }); };
  const remove = (i) => { const ne = entries.filter((_, j) => j !== i); onChange(Object.fromEntries(ne)); };
  return (
    <div className="kv-builder">
      {entries.map(([k, v], i) => (
        <div className="kv-row" key={i}>
          <input value={k} onChange={e => setKey(i, e.target.value)} placeholder="Key" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px", color: "var(--text)" }} />
          <input value={v} onChange={e => setVal(i, e.target.value)} placeholder="Value" style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px", color: "var(--text)" }} />
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => remove(i)}><TrashIcon size={14}/></button>
        </div>
      ))}
      <button type="button" className="btn btn-outline btn-sm" onClick={add}><PlusIcon size={14}/> Add row</button>
    </div>
  );
}

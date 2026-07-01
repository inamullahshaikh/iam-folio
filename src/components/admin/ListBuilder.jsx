import { PlusIcon, TrashIcon } from "../icons/Icons";
export default function ListBuilder({ value = [], onChange, placeholder = "Item" }) {
  const set = (i, v) => { const n = [...value]; n[i] = v; onChange(n); };
  const add = () => onChange([...value, ""]);
  const remove = (i) => onChange(value.filter((_, j) => j !== i));
  return (
    <div className="list-builder">
      {value.map((v, i) => (
        <div className="list-row" key={i}>
          <input value={v} onChange={e => set(i, e.target.value)} placeholder={placeholder} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: "8px 10px", color: "var(--text)" }} />
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => remove(i)}><TrashIcon size={14}/></button>
        </div>
      ))}
      <button type="button" className="btn btn-outline btn-sm" onClick={add}><PlusIcon size={14}/> Add</button>
    </div>
  );
}

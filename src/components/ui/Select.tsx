import type { SelectHTMLAttributes } from 'react';
export function Select({ label, options, id, ...p }: SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: { value: string; label: string }[] }) {
  const k = id ?? `s-${label}`;
  return (
    <div>
      <label htmlFor={k} className="label">{label}</label>
      <select id={k} {...p} className="field">{options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
    </div>
  );
}

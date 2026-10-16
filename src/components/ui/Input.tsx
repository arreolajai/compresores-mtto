import type { InputHTMLAttributes } from 'react';
export function Input({ label, error, id, ...p }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const k = id ?? `f-${label}`;
  return (
    <div>
      <label htmlFor={k} className="label">{label}</label>
      <input id={k} {...p} className="field" aria-invalid={!!error} />
      {error && <p role="alert" className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}

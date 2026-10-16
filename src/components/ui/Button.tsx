import type { ButtonHTMLAttributes } from 'react';
type V = 'primary' | 'secondary' | 'danger' | 'ghost';
const cls: Record<V, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-white text-ink border border-steel/40 hover:bg-mist',
  danger: 'bg-danger text-white hover:opacity-90',
  ghost: 'text-brand hover:bg-brand-light'
};
export function Button({ variant = 'primary', className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: V }) {
  return <button type="button" {...p} className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-panel px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${cls[variant]} ${className}`} />;
}

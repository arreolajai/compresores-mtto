import type { ReactNode } from 'react';
const tone = { verde: 'bg-ok/15 text-ok', amarillo: 'bg-warn/20 text-[#7A5400]', rojo: 'bg-danger/15 text-danger', neutro: 'bg-mist text-steel' };
export function Badge({ tono = 'neutro', children }: { tono?: keyof typeof tone; children: ReactNode }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tone[tono]}`}>{children}</span>;
}

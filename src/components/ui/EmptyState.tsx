import type { ReactNode } from 'react';
export function EmptyState({ titulo, texto, accion }: { titulo: string; texto: string; accion?: ReactNode }) {
  return <div className="rounded-panel border border-dashed border-steel/40 p-8 text-center"><h3 className="font-semibold">{titulo}</h3><p className="mx-auto mt-1 max-w-sm text-sm text-steel">{texto}</p>{accion && <div className="mt-4">{accion}</div>}</div>;
}

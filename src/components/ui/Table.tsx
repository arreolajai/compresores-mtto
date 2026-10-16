import type { ReactNode } from 'react';
export interface Col<T> { clave: string; titulo: string; render: (r: T) => ReactNode; className?: string }
export function Table<T extends { id: string }>({ columnas, filas, onRow }: { columnas: Col<T>[]; filas: T[]; onRow?: (r: T) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead><tr className="border-b border-mist text-steel">{columnas.map((c) => <th key={c.clave} className={`px-3 py-2 font-medium ${c.className ?? ''}`}>{c.titulo}</th>)}</tr></thead>
        <tbody>{filas.map((r) => (
          <tr key={r.id} onClick={() => onRow?.(r)} className={`border-b border-mist/70 ${onRow ? 'cursor-pointer hover:bg-brand-light/40' : ''}`}>
            {columnas.map((c) => <td key={c.clave} className={`px-3 py-2.5 ${c.className ?? ''}`}>{c.render(r)}</td>)}
          </tr>))}</tbody>
      </table>
    </div>
  );
}

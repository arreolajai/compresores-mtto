import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
export function Modal({ abierto, titulo, onClose, children }: { abierto: boolean; titulo: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    if (!abierto) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [abierto, onClose]);
  if (!abierto) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 sm:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={titulo} onClick={(e) => e.stopPropagation()} className="max-h-[90%] w-full overflow-auto rounded-t-xl bg-white p-5 sm:max-w-lg sm:rounded-panel">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-semibold">{titulo}</h2><button aria-label="Cerrar" onClick={onClose} className="p-2"><X size={20} /></button></div>
        {children}
      </div>
    </div>
  );
}

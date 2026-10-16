import { useUI } from '@/store/uiStore';
const bg = { ok: 'bg-ok', error: 'bg-danger', info: 'bg-brand' };
export function Toaster() {
  const { toasts, dismiss } = useUI();
  return (
    <div aria-live="polite" className="fixed bottom-20 left-1/2 z-[60] flex w-[min(92%,420px)] -translate-x-1/2 flex-col gap-2 md:bottom-6">
      {toasts.map((t) => <button key={t.id} onClick={() => dismiss(t.id)} className={`rounded-panel px-4 py-3 text-left text-sm font-medium text-white ${bg[t.tipo]}`}>{t.texto}</button>)}
    </div>
  );
}

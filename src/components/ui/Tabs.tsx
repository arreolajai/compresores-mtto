export function Tabs({ tabs, activa, onChange }: { tabs: { id: string; label: string }[]; activa: string; onChange: (id: string) => void }) {
  return (
    <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-mist">
      {tabs.map((t) => <button key={t.id} role="tab" aria-selected={activa === t.id} onClick={() => onChange(t.id)} className={`min-h-[44px] whitespace-nowrap border-b-2 px-4 text-sm font-medium ${activa === t.id ? 'border-brand text-brand' : 'border-transparent text-steel'}`}>{t.label}</button>)}
    </div>
  );
}

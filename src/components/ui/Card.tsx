import type { ReactNode } from 'react';
export function Card({ title, actions, children, className = '' }: { title?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-panel border border-mist bg-white ${className}`}>
      {(title || actions) && (
        <header className="flex items-center justify-between border-b border-mist px-4 py-3">
          <h2 className="text-base font-semibold">{title}</h2>{actions}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

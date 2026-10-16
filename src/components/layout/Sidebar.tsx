import { NavLink } from 'react-router-dom';
import { NAV } from './nav';
export function Sidebar() {
  return (
    <nav aria-label="Principal" className="hidden w-60 shrink-0 flex-col gap-1 bg-brand-dark p-3 text-white md:flex">
      <div className="px-3 py-4 text-lg font-semibold">Compresores</div>
      {NAV.map(({ to, label, icon: I }) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex min-h-[44px] items-center gap-3 rounded-panel px-3 text-sm ${isActive ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'}`}><I size={18} />{label}</NavLink>
      ))}
    </nav>
  );
}

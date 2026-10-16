import { NavLink } from 'react-router-dom';
import { MOBILE_NAV } from './nav';
export function BottomNav() {
  return (
    <nav aria-label="Principal" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-mist bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
      {MOBILE_NAV.map(({ to, label, icon: I }) => (
        <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-xs ${isActive ? 'font-semibold text-brand' : 'text-steel'}`}><I size={20} />{label}</NavLink>
      ))}
    </nav>
  );
}

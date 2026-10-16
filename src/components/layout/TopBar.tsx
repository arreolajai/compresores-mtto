import { LogOut } from 'lucide-react';
import { useSession } from '@/store/sessionStore';
import { ROLE_LABEL } from '@/domain/enums';
export function TopBar() {
  const { user, logout } = useSession();
  return (
    <header className="flex items-center justify-between border-b border-mist bg-white px-4 py-2">
      <span className="font-semibold text-brand md:hidden">Compresores</span>
      <span className="hidden text-sm text-steel md:block">Mantenimiento de compresores</span>
      <div className="flex items-center gap-3 text-sm">
        <span>{user?.nombre} <span className="text-steel">({user ? ROLE_LABEL[user.rol] : ''})</span></span>
        <button onClick={logout} aria-label="Cerrar sesión" className="p-2 text-steel hover:text-ink"><LogOut size={18} /></button>
      </div>
    </header>
  );
}

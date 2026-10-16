import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db/database';
import { useSession } from '@/store/sessionStore';
import { ROLE_LABEL } from '@/domain/enums';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

export default function Login() {
  const { user, login } = useSession();
  const users = useLiveQuery(() => db.users.filter((u) => u.activo).toArray(), []);
  const [usuario, setUsuario] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  if (user) return <Navigate to="/" replace />;
  const sel = usuario || users?.[0]?.usuario || '';
  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <form className="w-full max-w-sm space-y-4 rounded-panel border border-mist bg-white p-6" onSubmit={async (e) => { e.preventDefault(); const r = await login(sel, pin); if (!r.ok) setError(r.error ?? 'No se pudo entrar.'); }}>
        <h1 className="text-xl font-semibold text-brand">Mantenimiento de compresores</h1>
        <Select label="Usuario" value={sel} onChange={(e) => setUsuario(e.target.value)} options={(users ?? []).map((u) => ({ value: u.usuario, label: `${u.nombre} · ${ROLE_LABEL[u.rol]}` }))} />
        <Input label="PIN" type="password" inputMode="numeric" autoComplete="current-password" value={pin} onChange={(e) => setPin(e.target.value)} error={error} />
        <Button type="submit" className="w-full" disabled={!sel || pin.length < 4}>Entrar</Button>
        <p className="text-xs text-steel">PIN de demostración: admin 1234, supervisor 2345, tecnico 3456, consulta 4567. Cámbialos en Ajustes.</p>
      </form>
    </div>
  );
}

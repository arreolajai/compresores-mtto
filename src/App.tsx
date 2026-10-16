import { useEffect, useState } from 'react';
import { AppRouter } from './router';
import { db } from '@/db/database';
import { ensureDefaultUsers } from '@/db/seed';
import { requestPersistence } from '@/db/persistence';

export default function App() {
  const [listo, setListo] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    ensureDefaultUsers(db).then(() => { setListo(true); void requestPersistence(); }).catch((e: unknown) => setError(String(e)));
  }, []);
  if (error) return <p role="alert" className="p-6 text-danger">No se pudo abrir la base de datos local: {error}</p>;
  return listo ? <AppRouter /> : <p className="p-6 text-steel">Abriendo base de datos…</p>;
}

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { useSession } from '@/store/sessionStore';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Pending from '@/pages/Pending';

const routes: [string, string, number][] = [
  ['equipos', 'Equipos', 2], ['horometros', 'Horómetros', 2], ['mantenimiento', 'Mantenimiento', 3],
  ['ordenes', 'Órdenes de trabajo', 4], ['inspecciones', 'Inspecciones', 4], ['fallas', 'Fallas', 4],
  ['reportes', 'Reportes', 5], ['ajustes', 'Ajustes', 6], ['mas', 'Más', 6]
];
function Protected() {
  const user = useSession((s) => s.user);
  return user ? <AppShell /> : <Navigate to="/login" replace />;
}
export function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route index element={<Dashboard />} />
          {routes.map(([p, t, f]) => <Route key={p} path={p} element={<Pending titulo={t} fase={f} />} />)}
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

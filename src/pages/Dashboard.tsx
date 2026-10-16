import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { db } from '@/db/database';
import { clearDemoData, loadDemoData } from '@/db/seed';
import { useUI } from '@/store/uiStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { COMPRESSOR_TYPE_LABEL } from '@/domain/enums';

export default function Dashboard() {
  const toast = useUI((s) => s.toast);
  const data = useLiveQuery(async () => ({
    equipos: await db.compressors.toArray(),
    sitios: await db.sites.toArray(),
    lecturas: await db.readings.count(),
    demo: !!(await db.settings.get('demo'))
  }), []);
  if (!data) return <p className="text-steel">Cargando…</p>;
  const sitio = (id: string) => data.sitios.find((s) => s.id === id)?.nombre ?? '—';
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Inicio</h1>
      {data.equipos.length === 0 ? (
        <EmptyState titulo="Aún no hay equipos" texto="Carga los datos de demostración para explorar la app o espera a la Fase 2 para dar de alta tus compresores."
          accion={<Button onClick={async () => { await loadDemoData(db); toast('ok', 'Datos de demostración cargados.'); }}>Cargar datos de demostración</Button>} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[['Equipos', data.equipos.length], ['Operando', data.equipos.filter((e) => e.estado === 'operando').length], ['Sitios', data.sitios.length], ['Lecturas', data.lecturas]].map(([t, v]) => (
              <Card key={t as string}><p className="text-sm text-steel">{t}</p><p className="text-3xl font-semibold">{v}</p></Card>
            ))}
          </div>
          <Card title="Equipos" actions={data.demo ? <Button variant="secondary" onClick={async () => { await clearDemoData(db); toast('info', 'Datos de demostración borrados.'); }}>Borrar demostración</Button> : undefined}>
            <Table filas={data.equipos} columnas={[
              { clave: 'tag', titulo: 'Equipo', render: (e) => <Link className="font-semibold text-brand" to="/equipos">{e.tag}</Link> },
              { clave: 'mod', titulo: 'Modelo', render: (e) => `${e.marca} ${e.modelo}` },
              { clave: 'tipo', titulo: 'Tipo', render: (e) => COMPRESSOR_TYPE_LABEL[e.tipo] },
              { clave: 'sitio', titulo: 'Sitio', render: (e) => sitio(e.siteId) },
              { clave: 'est', titulo: 'Estado', render: (e) => <Badge tono={e.estado === 'operando' ? 'verde' : 'neutro'}>{e.estado.replace('_', ' ')}</Badge> }
            ]} />
          </Card>
        </>
      )}
    </div>
  );
}

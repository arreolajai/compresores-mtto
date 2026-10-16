import { subDays, formatISO } from 'date-fns';
import type { AppDB } from './database';
import { hashPin, newSalt } from '@/services/crypto';
import type { Role } from '@/domain/enums';
import type { Compressor, HourmeterReading, PlanActivity, User } from '@/domain/types';

const DEMO_USERS: [string, string, Role, string][] = [
  ['Ana Ríos', 'admin', 'admin', '1234'],
  ['Luis Mendoza', 'supervisor', 'supervisor', '2345'],
  ['Carlos Pérez', 'tecnico', 'tecnico', '3456'],
  ['Marta Solís', 'consulta', 'consulta', '4567']
];

/** Crea los 4 usuarios iniciales solo si no existe ninguno. */
export async function ensureDefaultUsers(db: AppDB): Promise<void> {
  if ((await db.users.count()) > 0) return;
  const users: User[] = [];
  for (const [nombre, usuario, rol, pin] of DEMO_USERS) {
    const salt = newSalt();
    users.push({ id: `u-${usuario}`, nombre, usuario, rol, salt, pinHash: await hashPin(pin, salt), activo: true, intentosFallidos: 0 });
  }
  await db.users.bulkAdd(users);
}

const ISO = (d: Date) => formatISO(d);

/** Datos de demostración: 4 equipos, 2 planes y 46 lecturas diarias de horómetro por equipo. */
export async function loadDemoData(db: AppDB, now = new Date()): Promise<void> {
  await db.transaction('rw', [db.sites, db.compressors, db.readings, db.plans, db.activities, db.services, db.settings], async () => {
    await db.sites.bulkPut([
      { id: 's-qro', nombre: 'Planta Querétaro', ubicacion: 'Querétaro, Qro.' },
      { id: 's-slp', nombre: 'Planta San Luis', ubicacion: 'San Luis Potosí, SLP' }
    ]);
    await db.plans.bulkPut([
      { id: 'p-tornillo', nombre: 'Plan tornillo 8,000 h', tipo: 'tornillo', activo: true },
      { id: 'p-piston', nombre: 'Plan pistón 4,000 h', tipo: 'piston', activo: true }
    ]);
    const act = (id: string, planId: string, nombre: string, h: number, d?: number): PlanActivity =>
      ({ id, planId, nombre, intervaloHoras: h, intervaloDias: d, umbralAmarilloPct: 15, requiereParo: true });
    await db.activities.bulkPut([
      act('a-t1', 'p-tornillo', 'Cambio de filtro de aire', 2000, 365),
      act('a-t2', 'p-tornillo', 'Cambio de aceite y filtro de aceite', 4000, 365),
      act('a-t3', 'p-tornillo', 'Cambio de separador aire/aceite', 8000),
      act('a-p1', 'p-piston', 'Cambio de aceite', 1000, 180),
      act('a-p2', 'p-piston', 'Revisión de válvulas', 4000)
    ]);
    const stamp = ISO(now);
    type Seed = Pick<Compressor, 'id' | 'tag' | 'siteId' | 'marca' | 'modelo' | 'serie' | 'tipo' | 'potenciaHp' | 'anio' | 'horometroInicial' | 'planId'> & Partial<Compressor>;
    const base = (c: Seed): Compressor => ({ estado: 'operando', offsetHorometro: 0, creadoEn: stamp, actualizadoEn: stamp, ...c });
    const list: Compressor[] = [
      base({ id: 'c1', tag: 'CMP-001', siteId: 's-qro', marca: 'Atlas Copco', modelo: 'GA 75', serie: 'AIF123456', tipo: 'tornillo', potenciaHp: 100, anio: 2019, horometroInicial: 18200, planId: 'p-tornillo' }),
      base({ id: 'c2', tag: 'CMP-002', siteId: 's-qro', marca: 'Ingersoll Rand', modelo: 'R55i', serie: 'IR-77821', tipo: 'tornillo', potenciaHp: 75, anio: 2021, horometroInicial: 9400, planId: 'p-tornillo' }),
      base({ id: 'c3', tag: 'CMP-003', siteId: 's-slp', marca: 'Kaeser', modelo: 'ASD 40', serie: 'KS-33410', tipo: 'tornillo', potenciaHp: 30, anio: 2017, horometroInicial: 31050, estado: 'standby', planId: 'p-tornillo' }),
      base({ id: 'c4', tag: 'CMP-004', siteId: 's-slp', marca: 'Quincy', modelo: 'QT-10', serie: 'QN-90211', tipo: 'piston', potenciaHp: 10, anio: 2015, horometroInicial: 12600, planId: 'p-piston' })
    ];
    await db.compressors.bulkPut(list);

    const perDay: Record<string, number> = { c1: 20, c2: 14, c3: 4, c4: 8 };
    const readings: HourmeterReading[] = [];
    for (const c of list) {
      let h = c.horometroInicial;
      for (let i = 45; i >= 0; i--) {
        if (i < 45) h += perDay[c.id];
        readings.push({ id: `r-${c.id}-${i}`, compressorId: c.id, fecha: ISO(subDays(now, i)), horas: h, origen: i === 45 ? 'inicial' : 'manual', usuarioId: 'u-tecnico', esAjuste: false });
      }
    }
    await db.readings.bulkPut(readings);
    const svc = (id: string, c: string, a: string, back: number, hrs: number) =>
      ({ id, compressorId: c, activityId: a, fecha: ISO(subDays(now, back)), horasAlServicio: hrs });
    await db.services.bulkPut([
      svc('sv1', 'c1', 'a-t1', 45, 18200), svc('sv2', 'c1', 'a-t2', 45, 18200), svc('sv3', 'c1', 'a-t3', 45, 18200),
      svc('sv4', 'c2', 'a-t1', 45, 9400), svc('sv5', 'c4', 'a-p1', 45, 12600)
    ]);
    await db.settings.put({ clave: 'demo', valor: true });
  });
}

export async function clearDemoData(db: AppDB): Promise<void> {
  const tables = [db.sites, db.compressors, db.readings, db.plans, db.activities, db.services, db.workOrders, db.inspections, db.failures, db.attachments, db.signatures, db.alertStates];
  await db.transaction('rw', [...tables, db.settings], async () => {
    await Promise.all(tables.map((t) => t.clear()));
    await db.settings.delete('demo');
  });
}

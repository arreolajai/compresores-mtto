import 'fake-indexeddb/auto';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppDB } from '@/db/database';
import { clearDemoData, ensureDefaultUsers, loadDemoData } from '@/db/seed';
import { hashPin, newSalt, verifyPin } from '@/services/crypto';

let db: AppDB;
beforeEach(async () => { db = new AppDB(`t-${Math.random()}`); await db.open(); });

describe('base de datos', () => {
  it('crea 4 usuarios iniciales una sola vez', async () => {
    await ensureDefaultUsers(db); await ensureDefaultUsers(db);
    expect(await db.users.count()).toBe(4);
  });
  it('carga y borra datos de demostración', async () => {
    await loadDemoData(db);
    expect(await db.compressors.count()).toBe(4);
    expect(await db.readings.count()).toBe(4 * 46);
    await clearDemoData(db);
    expect(await db.compressors.count()).toBe(0);
    expect(await db.readings.count()).toBe(0);
  });
  it('los datos persisten al reabrir la base', async () => {
    await loadDemoData(db); const name = db.name; db.close();
    const again = new AppDB(name); await again.open();
    expect(await again.compressors.count()).toBe(4);
  });
  it('las lecturas demo nunca decrecen', async () => {
    await loadDemoData(db);
    const r = (await db.readings.where('compressorId').equals('c1').sortBy('fecha')).map((x) => x.horas);
    expect(r.every((h, i) => i === 0 || h >= r[i - 1])).toBe(true);
  });
});
describe('PIN', () => {
  it('verifica PIN correcto e incorrecto', async () => {
    const s = newSalt(); const h = await hashPin('1234', s);
    expect(await verifyPin('1234', s, h)).toBe(true);
    expect(await verifyPin('0000', s, h)).toBe(false);
  });
});

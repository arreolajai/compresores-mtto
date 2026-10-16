import { create } from 'zustand';
import type { User } from '@/domain/types';
import { db } from '@/db/database';
import { verifyPin } from '@/services/crypto';

type SessionUser = Pick<User, 'id' | 'nombre' | 'usuario' | 'rol'>;
interface SessionState {
  user: SessionUser | null;
  login: (usuario: string, pin: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
}
export const useSession = create<SessionState>((set) => ({
  user: null,
  async login(usuario, pin) {
    const u = await db.users.where('usuario').equals(usuario).first();
    if (!u || !u.activo) return { ok: false, error: 'Usuario no disponible.' };
    if (!(await verifyPin(pin, u.salt, u.pinHash))) return { ok: false, error: 'PIN incorrecto.' };
    set({ user: { id: u.id, nombre: u.nombre, usuario: u.usuario, rol: u.rol } });
    return { ok: true };
  },
  logout: () => set({ user: null })
}));

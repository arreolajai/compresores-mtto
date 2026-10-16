import { create } from 'zustand';
export interface ToastMsg { id: number; tipo: 'ok' | 'error' | 'info'; texto: string }
interface UIState { toasts: ToastMsg[]; toast: (tipo: ToastMsg['tipo'], texto: string) => void; dismiss: (id: number) => void }
let seq = 0;
export const useUI = create<UIState>((set) => ({
  toasts: [],
  toast: (tipo, texto) => {
    const id = ++seq;
    set((s) => ({ toasts: [...s.toasts, { id, tipo, texto }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 4000);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}));

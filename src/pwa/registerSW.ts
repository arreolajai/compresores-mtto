import { registerSW } from 'virtual:pwa-register';
import { create } from 'zustand';

interface SWState { needRefresh: boolean; offlineReady: boolean; apply: () => void; dismiss: () => void }
export const useSW = create<SWState>((set) => ({ needRefresh: false, offlineReady: false, apply: () => undefined, dismiss: () => set({ needRefresh: false, offlineReady: false }) }));

export function initServiceWorker(): void {
  const update = registerSW({
    onNeedRefresh: () => useSW.setState({ needRefresh: true }),
    onOfflineReady: () => useSW.setState({ offlineReady: true })
  });
  useSW.setState({ apply: () => void update(true) });
}

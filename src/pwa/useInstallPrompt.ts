import { useEffect, useState } from 'react';
interface BIPEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }
export function useInstallPrompt() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  useEffect(() => {
    const h = (e: Event) => { e.preventDefault(); setEvt(e as BIPEvent); };
    const done = () => setEvt(null);
    window.addEventListener('beforeinstallprompt', h);
    window.addEventListener('appinstalled', done);
    return () => { window.removeEventListener('beforeinstallprompt', h); window.removeEventListener('appinstalled', done); };
  }, []);
  return { canInstall: !!evt, install: async () => { if (!evt) return; await evt.prompt(); await evt.userChoice; setEvt(null); } };
}

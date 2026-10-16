import { useInstallPrompt } from '@/pwa/useInstallPrompt';
import { useSW } from '@/pwa/registerSW';
import { Button } from '../ui/Button';
export function InstallBanner() {
  const { canInstall, install } = useInstallPrompt();
  const { needRefresh, offlineReady, apply, dismiss } = useSW();
  if (needRefresh) return <div role="status" className="flex items-center justify-between gap-2 bg-brand px-4 py-2 text-sm text-white">Hay una versión nueva.<Button variant="secondary" onClick={apply}>Actualizar ahora</Button></div>;
  if (offlineReady) return <div role="status" className="flex items-center justify-between gap-2 bg-ok px-4 py-2 text-sm text-white">La app ya funciona sin Internet.<button onClick={dismiss} className="underline">Entendido</button></div>;
  if (canInstall) return <div className="flex items-center justify-between gap-2 bg-brand-light px-4 py-2 text-sm">Instala la app en este dispositivo.<Button onClick={() => void install()}>Instalar</Button></div>;
  return null;
}

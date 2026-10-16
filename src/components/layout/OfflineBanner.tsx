import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/pwa/useOnlineStatus';
export function OfflineBanner() {
  if (useOnlineStatus()) return null;
  return <div role="status" className="flex items-center gap-2 bg-warn px-4 py-1.5 text-sm font-medium text-ink"><WifiOff size={16} />Sin conexión. Todo sigue funcionando y se guarda en este dispositivo.</div>;
}

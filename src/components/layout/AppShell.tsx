import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';
import { OfflineBanner } from './OfflineBanner';
import { InstallBanner } from './InstallBanner';
import { Toaster } from '../ui/Toast';
export function AppShell() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <OfflineBanner /><InstallBanner /><TopBar />
        <main className="flex-1 overflow-auto p-4 pb-24 md:p-6 md:pb-6"><Outlet /></main>
      </div>
      <BottomNav /><Toaster />
    </div>
  );
}

import { Gauge, Home, ClipboardList, Wrench, Menu, Timer, Siren, Settings, FileText, Search } from 'lucide-react';
export const NAV = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/equipos', label: 'Equipos', icon: Gauge },
  { to: '/horometros', label: 'Horómetros', icon: Timer },
  { to: '/mantenimiento', label: 'Mantenimiento', icon: Wrench },
  { to: '/ordenes', label: 'Órdenes', icon: ClipboardList },
  { to: '/inspecciones', label: 'Inspecciones', icon: Search },
  { to: '/fallas', label: 'Fallas', icon: Siren },
  { to: '/reportes', label: 'Reportes', icon: FileText },
  { to: '/ajustes', label: 'Ajustes', icon: Settings }
] as const;
export const MOBILE_NAV = [NAV[0], NAV[1], NAV[2], NAV[4], { to: '/mas', label: 'Más', icon: Menu }] as const;

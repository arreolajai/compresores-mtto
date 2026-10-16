export const ROLES = ['admin', 'supervisor', 'tecnico', 'consulta'] as const;
export type Role = (typeof ROLES)[number];
export const ROLE_LABEL: Record<Role, string> = { admin: 'Administrador', supervisor: 'Supervisor', tecnico: 'Técnico', consulta: 'Consulta' };

export const COMPRESSOR_TYPES = ['tornillo', 'piston', 'centrifugo'] as const;
export type CompressorType = (typeof COMPRESSOR_TYPES)[number];
export const COMPRESSOR_TYPE_LABEL: Record<CompressorType, string> = { tornillo: 'Tornillo', piston: 'Pistón', centrifugo: 'Centrífugo' };

export const COMPRESSOR_STATUS = ['operando', 'standby', 'fuera_servicio', 'baja'] as const;
export type CompressorStatus = (typeof COMPRESSOR_STATUS)[number];

export const WO_TYPES = ['preventivo', 'correctivo', 'inspeccion'] as const;
export type WorkOrderType = (typeof WO_TYPES)[number];
export const WO_STATES = ['abierta', 'asignada', 'en_proceso', 'cerrada', 'cancelada'] as const;
export type WorkOrderState = (typeof WO_STATES)[number];
export const PRIORITIES = ['baja', 'media', 'alta', 'critica'] as const;
export type Priority = (typeof PRIORITIES)[number];
export const SEVERITIES = ['leve', 'moderada', 'grave'] as const;
export type Severity = (typeof SEVERITIES)[number];
export type ReadingSource = 'manual' | 'orden' | 'ajuste' | 'inicial';
export type Semaforo = 'verde' | 'amarillo' | 'rojo';

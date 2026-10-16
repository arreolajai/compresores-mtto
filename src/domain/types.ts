import type { CompressorStatus, CompressorType, Priority, ReadingSource, Role, Severity, WorkOrderState, WorkOrderType } from './enums';

export type ID = string;
export interface Site { id: ID; nombre: string; ubicacion: string }
export interface Compressor {
  id: ID; tag: string; siteId: ID; marca: string; modelo: string; serie: string;
  tipo: CompressorType; potenciaHp: number; anio: number; estado: CompressorStatus;
  horometroInicial: number; offsetHorometro: number; planId?: ID; notas?: string;
  creadoEn: string; actualizadoEn: string;
}
export interface HourmeterReading {
  id: ID; compressorId: ID; fecha: string; horas: number; origen: ReadingSource;
  usuarioId: ID; nota?: string; esAjuste: boolean;
}
export interface MaintenancePlan { id: ID; nombre: string; tipo: CompressorType; activo: boolean }
export interface PlanActivity {
  id: ID; planId: ID; nombre: string; intervaloHoras: number; intervaloDias?: number;
  umbralAmarilloPct: number; requiereParo: boolean;
}
export interface ServiceRecord {
  id: ID; compressorId: ID; activityId: ID; fecha: string; horasAlServicio: number; workOrderId?: ID;
}
export interface WorkOrderTask { id: ID; descripcion: string; hecha: boolean; activityId?: ID }
export interface WorkOrderPart { id: ID; descripcion: string; cantidad: number }
export interface WorkOrder {
  id: ID; folio: string; compressorId: ID; tipo: WorkOrderType; prioridad: Priority;
  estado: WorkOrderState; asignadoA?: ID; creadaEn: string; programadaPara?: string; cerradaEn?: string;
  descripcion: string; tareas: WorkOrderTask[]; refacciones: WorkOrderPart[]; fotoIds: ID[]; firmaIds: ID[];
}
export interface InspectionItem { id: ID; texto: string; tipo: 'ok' | 'valor'; unidad?: string; min?: number; max?: number }
export interface InspectionTemplate { id: ID; nombre: string; items: InspectionItem[] }
export interface InspectionResult { itemId: ID; resultado: 'ok' | 'no' | 'na'; valor?: number; observacion?: string }
export interface Inspection {
  id: ID; templateId: ID; compressorId: ID; fecha: string; usuarioId: ID;
  resultados: InspectionResult[]; observaciones?: string; fotoIds: ID[]; firmaIds: ID[];
}
export interface Failure {
  id: ID; compressorId: ID; fecha: string; sintoma: string; causa?: string;
  severidad: Severity; paroHoras: number; workOrderId?: ID; fotoIds: ID[];
}
export interface Attachment { id: ID; blob: Blob; mime: string; ownerType: string; ownerId: ID; creadoEn: string }
export interface Signature { id: ID; ownerType: string; ownerId: ID; nombreFirmante: string; rol: string; imagen: string; fecha: string }
export interface AlertState { id: ID; compressorId: ID; activityId: ID; estado: 'reconocida' | 'silenciada'; hasta?: string; usuarioId: ID; fecha: string }
export interface User { id: ID; nombre: string; usuario: string; rol: Role; pinHash: string; salt: string; activo: boolean; intentosFallidos: number; bloqueadoHasta?: string }
export interface AuditLog { id: ID; fecha: string; usuarioId: ID; accion: string; entidad: string; entidadId: ID; detalle?: string }
export interface Setting { clave: string; valor: unknown }

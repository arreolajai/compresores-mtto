/** Versiones del esquema. Agregar nuevas versiones sin modificar las anteriores. */
export const SCHEMA_V1 = {
  sites: 'id',
  compressors: 'id, tag, siteId, estado, planId',
  readings: 'id, compressorId, fecha, [compressorId+fecha]',
  plans: 'id, tipo',
  activities: 'id, planId',
  services: 'id, compressorId, activityId, fecha',
  workOrders: 'id, folio, compressorId, estado, tipo, asignadoA',
  inspectionTemplates: 'id',
  inspections: 'id, compressorId, templateId, fecha',
  failures: 'id, compressorId, fecha, workOrderId',
  attachments: 'id, [ownerType+ownerId]',
  signatures: 'id, [ownerType+ownerId]',
  alertStates: 'id, [compressorId+activityId]',
  users: 'id, &usuario',
  audit: 'id, fecha, usuarioId, entidad',
  settings: 'clave'
} as const;
export const SCHEMA_VERSION = 1;

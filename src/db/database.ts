import Dexie, { type Table } from 'dexie';
import type * as T from '@/domain/types';
import { SCHEMA_V1, SCHEMA_VERSION } from './migrations';

export class AppDB extends Dexie {
  sites!: Table<T.Site, string>;
  compressors!: Table<T.Compressor, string>;
  readings!: Table<T.HourmeterReading, string>;
  plans!: Table<T.MaintenancePlan, string>;
  activities!: Table<T.PlanActivity, string>;
  services!: Table<T.ServiceRecord, string>;
  workOrders!: Table<T.WorkOrder, string>;
  inspectionTemplates!: Table<T.InspectionTemplate, string>;
  inspections!: Table<T.Inspection, string>;
  failures!: Table<T.Failure, string>;
  attachments!: Table<T.Attachment, string>;
  signatures!: Table<T.Signature, string>;
  alertStates!: Table<T.AlertState, string>;
  users!: Table<T.User, string>;
  audit!: Table<T.AuditLog, string>;
  settings!: Table<T.Setting, string>;

  constructor(name = 'compresores-mtto') {
    super(name);
    this.version(SCHEMA_VERSION).stores(SCHEMA_V1);
  }
}
export const db = new AppDB();

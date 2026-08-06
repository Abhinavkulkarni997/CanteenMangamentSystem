export interface AuditUser {
  id: number;
  name: string;
}

export interface AuditEmployee {
  id: number;
  name: string;
  employeeId: string;
}

export interface AuditOrder {
  id: number;
  orderNumber: string;
  totalAmount: string;
  paymentStatus: string;
  orderStatus: string;

  user: AuditEmployee;
}

export interface AuditLog {
  id: number;
  scannedAt: string;
  device: string;
  ipAddress: string;

  admin: AuditUser;

  order: AuditOrder;
}

export interface AuditResponse {
  logs: AuditLog[];

  total: number;

  page: number;

  pages: number;
}
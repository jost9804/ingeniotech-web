export type UserRole = 'admin' | 'technician';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export type JobStatus = 'recibido' | 'en_diagnostico' | 'en_reparacion' | 'listo' | 'entregado';
export type DeviceType = 'computador' | 'celular' | 'camara' | 'otro';

export interface Job {
  id: number;
  client_name: string;
  client_phone: string;
  device_type: DeviceType;
  problem_description: string;
  status: JobStatus;
  assigned_to: number;
  progress: number;
  price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

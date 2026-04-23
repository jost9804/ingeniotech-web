import { JobStatus } from '@/types';

const statusColors: Record<JobStatus, string> = {
  recibido: 'bg-blue-100 text-blue-800',
  en_diagnostico: 'bg-yellow-100 text-yellow-800',
  en_reparacion: 'bg-purple-100 text-purple-800',
  listo: 'bg-green-100 text-green-800',
  entregado: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<JobStatus, string> = {
  recibido: 'Recibido',
  en_diagnostico: 'En Diagnóstico',
  en_reparacion: 'En Reparación',
  listo: 'Listo',
  entregado: 'Entregado',
};

export function JobStatusBadge({ status }: { status: JobStatus }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  );
}

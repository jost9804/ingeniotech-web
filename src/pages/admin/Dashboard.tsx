import { useJobs } from '../../hooks/useJobs';
import { Loader } from 'lucide-react';

export function Dashboard() {
  const { data, isLoading } = useJobs();

  const stats = data?.data.reduce(
    (acc, job) => {
      if (job.status === 'recibido') acc.received++;
      if (job.status === 'en_diagnostico' || job.status === 'en_reparacion') acc.inProgress++;
      if (job.status === 'listo' || job.status === 'entregado') acc.completed++;
      return acc;
    },
    { received: 0, inProgress: 0, completed: 0 }
  ) || { received: 0, inProgress: 0, completed: 0 };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard title="Recibidos" value={stats.received} color="blue" />
        <StatCard title="En Proceso" value={stats.inProgress} color="yellow" />
        <StatCard title="Completados" value={stats.completed} color="green" />
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Total de trabajos: {data?.total || 0}</h2>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-900',
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    green: 'bg-green-50 border-green-200 text-green-900',
  };

  return (
    <div className={`${colorClasses[color as keyof typeof colorClasses]} border rounded-lg p-6`}>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '@/hooks/useJobs';
import { JobStatusBadge } from '@/components/admin/JobStatusBadge';
import { Loader, Plus } from 'lucide-react';

export function Jobs() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { data, isLoading } = useJobs(page, statusFilter ? { status: statusFilter } : undefined);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Trabajos</h1>
        <Link
          to="/admin/trabajos/nuevo"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={20} />
          Nuevo trabajo
        </Link>
      </div>

      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Todos los estados</option>
          <option value="recibido">Recibido</option>
          <option value="en_diagnostico">En Diagnóstico</option>
          <option value="en_reparacion">En Reparación</option>
          <option value="listo">Listo</option>
          <option value="entregado">Entregado</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin" size={32} />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Dispositivo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Progreso</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((job) => (
                  <tr key={job.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{job.client_name}</p>
                        <p className="text-sm text-gray-500">{job.client_phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">{job.device_type}</td>
                    <td className="px-6 py-4">
                      <JobStatusBadge status={job.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{job.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/trabajos/${job.id}`}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Ver detalles
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data && (
            <div className="mt-6 flex gap-2 justify-center">
              {Array.from({ length: data.last_page }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-4 py-2 rounded-lg ${
                    page === p ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

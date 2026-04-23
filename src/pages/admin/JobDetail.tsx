import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJob, useUpdateJob, useDeleteJob } from '../../hooks/useJobs';
import { JobStatusBadge } from '../../components/admin/JobStatusBadge';
import { ArrowLeft, Loader, Trash2 } from 'lucide-react';
import { JobProgressBar } from '../../components/admin/JobProgressBar';

export function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const jobId = parseInt(id || '0');
  const { data: job, isLoading } = useJob(jobId);
  const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();
  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();

  const [formData, setFormData] = useState({
    status: 'recibido',
    progress: 0,
    price: 0,
    notes: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (job) {
      setFormData({
        status: job.status,
        progress: job.progress,
        price: job.price || 0,
        notes: job.notes || '',
      });
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    updateJob({ id: jobId, ...formData } as any, {
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Error al actualizar');
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este trabajo?')) {
      deleteJob(jobId, {
        onSuccess: () => {
          navigate('/admin/trabajos');
        },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' || name === 'price' ? parseFloat(value) : value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  if (!job) {
    return <div className="p-8 text-center">Trabajo no encontrado</div>;
  }

  return (
    <div className="p-8">
      <Link to="/admin/trabajos" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={20} />
        Volver
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{job.client_name}</h1>
        <p className="text-gray-600">{job.client_phone}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Estado</p>
          <JobStatusBadge status={job.status} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Progreso</p>
          <p className="text-3xl font-bold mb-2">{job.progress}%</p>
          <JobProgressBar progress={job.progress} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm mb-2">Precio</p>
          <p className="text-3xl font-bold">${job.price ? job.price.toLocaleString() : '0'}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Información</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-600">Dispositivo</p>
              <p className="font-medium capitalize">{job.device_type}</p>
            </div>
            <div>
              <p className="text-gray-600">Problema</p>
              <p className="font-medium">{job.problem_description}</p>
            </div>
            <div>
              <p className="text-gray-600">Creado</p>
              <p className="font-medium">{new Date(job.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Editar</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                <option value="recibido">Recibido</option>
                <option value="en_diagnostico">En Diagnóstico</option>
                <option value="en_reparacion">En Reparación</option>
                <option value="listo">Listo</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Progreso ({formData.progress}%)</label>
              <input
                type="range"
                name="progress"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 text-gray-900"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 rounded-lg transition"
            >
              {isUpdating ? 'Guardando...' : 'Guardar cambios'}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
            >
              {isDeleting && <Loader size={20} className="animate-spin" />}
              {isDeleting ? 'Eliminando...' : <>
                <Trash2 size={20} />
                Eliminar trabajo
              </>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

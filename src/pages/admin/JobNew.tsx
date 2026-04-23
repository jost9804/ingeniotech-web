import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateJob } from '@/hooks/useJobs';
import { ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

export function JobNew() {
  const navigate = useNavigate();
  const { mutate: createJob, isPending } = useCreateJob();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    device_type: 'computador',
    problem_description: '',
    status: 'recibido',
    assigned_to: 2,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    createJob(formData as any, {
      onSuccess: () => {
        navigate('/admin/trabajos');
      },
      onError: (err: any) => {
        setError(err.response?.data?.message || 'Error al crear trabajo');
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'assigned_to' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="p-8">
      <Link to="/admin/trabajos" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft size={20} />
        Volver
      </Link>

      <h1 className="text-4xl font-bold mb-8">Crear nuevo trabajo</h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del cliente</label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                name="client_phone"
                value={formData.client_phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de dispositivo</label>
              <select
                name="device_type"
                value={formData.device_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="computador">Computador</option>
                <option value="celular">Celular</option>
                <option value="camara">Cámara</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recibido">Recibido</option>
                <option value="en_diagnostico">En Diagnóstico</option>
                <option value="en_reparacion">En Reparación</option>
                <option value="listo">Listo</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del problema</label>
            <textarea
              name="problem_description"
              value={formData.problem_description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isPending && <Loader size={20} className="animate-spin" />}
            {isPending ? 'Creando...' : 'Crear trabajo'}
          </button>
        </form>
      </div>
    </div>
  );
}

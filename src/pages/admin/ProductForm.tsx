import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader, Sparkles, Upload } from 'lucide-react';
import {
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useGenerateDescription,
} from '../../hooks/useProducts';
import { CATEGORIES } from '../../data/products';

export function ProductForm() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const isEdit = id !== undefined;

  const { data: existing, isLoading: isLoadingProduct } = useProduct(id ?? NaN);
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const { mutate: generateDescription, isPending: isGenerating } =
    useGenerateDescription();

  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: CATEGORIES[0] as string,
    featured: false,
    is_active: true,
  });

  // Precargar datos al editar
  useEffect(() => {
    if (existing) {
      setForm({
        name: existing.name,
        description: existing.description,
        price: String(existing.price),
        category: existing.category,
        featured: Boolean(existing.featured),
        is_active: existing.is_active ?? true,
      });
      setPreview(existing.image ?? null);
    }
  }, [existing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target;
    const { name, value } = target;
    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : existing?.image ?? null);
  };

  const handleGenerate = () => {
    setError('');
    if (!form.name.trim()) {
      setError('Escribe primero el nombre del producto para generar la descripción.');
      return;
    }
    generateDescription(form.name.trim(), {
      onSuccess: (description) => setForm((prev) => ({ ...prev, description })),
      onError: () =>
        setError('No se pudo generar la descripción con IA. Intenta de nuevo.'),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('category', form.category);
    data.append('featured', form.featured ? '1' : '0');
    data.append('is_active', form.is_active ? '1' : '0');
    if (imageFile) data.append('image', imageFile);

    const onError = (err: any) => {
      const resp = err.response?.data;
      const firstError = resp?.errors ? Object.values(resp.errors)[0] : null;
      setError(
        (Array.isArray(firstError) ? firstError[0] : firstError) ||
          resp?.message ||
          'Error al guardar el producto',
      );
    };

    if (isEdit) {
      updateProduct(
        { id: id!, formData: data },
        { onSuccess: () => navigate('/admin/productos'), onError },
      );
    } else {
      createProduct(data, {
        onSuccess: () => navigate('/admin/productos'),
        onError,
      });
    }
  };

  const isPending = isCreating || isUpdating;

  if (isEdit && isLoadingProduct) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900';

  return (
    <div className="p-8">
      <Link
        to="/admin/productos"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Volver
      </Link>

      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        {isEdit ? 'Editar producto' : 'Nuevo producto'}
      </h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-900">Descripcion</label>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-blue-300"
              >
                {isGenerating ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <Sparkles size={16} />
                )}
                {isGenerating ? 'Generando...' : 'Generar con IA'}
              </button>
            </div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className={`${inputClass} h-28`}
              required
            />
            <p className="mt-1 text-xs text-gray-600">
              Escribe el nombre del producto y la IA buscará sus características para redactar la descripción.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Precio (COP)
              </label>
              <input
                type="number"
                name="price"
                min={0}
                step={1}
                value={form.price}
                onChange={handleChange}
                className={inputClass}
                placeholder="650000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Categoria</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Foto</label>
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 flex-shrink-0 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Vista previa" className="h-full w-full object-cover" />
                ) : (
                  <Upload size={22} className="text-gray-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="block text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-1 text-xs text-gray-600">JPG, PNG o WEBP. Max 4MB.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-gray-900">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Destacado
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Visible en la tienda
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isPending && <Loader size={20} className="animate-spin" />}
            {isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </form>
      </div>
    </div>
  );
}

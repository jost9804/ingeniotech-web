import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Camera, Loader, Plus, Sparkles, Trash2, Upload, X } from 'lucide-react';
import {
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useGenerateDescription,
} from '../../hooks/useProducts';
import { CATEGORIES } from '../../data/products';
import type { ProductSpec } from '../../data/products';
import { compressImage } from '../../lib/compressImage';

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
  const [compressing, setCompressing] = useState(false);
  const [specs, setSpecs] = useState<ProductSpec[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
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
      setSpecs(existing.specs ?? []);
      setGallery(existing.gallery ?? []);
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

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setImageFile(null);
      setPreview(existing?.image ?? null);
      return;
    }
    setError('');
    setCompressing(true);
    try {
      // Comprime fotos grandes (del celular) a ~1MB antes de subir.
      const optimized = await compressImage(file, { maxSizeMB: 1 });
      setImageFile(optimized);
      setPreview(URL.createObjectURL(optimized));
    } catch {
      // Si la compresión falla, intentamos subir el original tal cual.
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } finally {
      setCompressing(false);
    }
  };

  const handleGenerate = () => {
    setError('');
    if (!form.name.trim()) {
      setError('Escribe primero el nombre del producto para generar la información.');
      return;
    }
    generateDescription(form.name.trim(), {
      onSuccess: (info) => {
        setForm((prev) => ({ ...prev, description: info.description }));
        if (info.specs?.length) setSpecs(info.specs);
        // Agrega las imágenes nuevas que la IA encontró, sin duplicar.
        if (info.images?.length) {
          setGallery((prev) => Array.from(new Set([...prev, ...info.images])));
        }
      },
      onError: () =>
        setError('No se pudo generar la información con IA. Intenta de nuevo.'),
    });
  };

  // ─── Specs ───
  const addSpec = () => setSpecs((prev) => [...prev, { label: '', value: '' }]);
  const updateSpec = (i: number, field: keyof ProductSpec, value: string) =>
    setSpecs((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  const removeSpec = (i: number) =>
    setSpecs((prev) => prev.filter((_, idx) => idx !== i));

  // ─── Galería ───
  const addImageUrl = () => {
    const url = newImageUrl.trim();
    if (url && !gallery.includes(url)) setGallery((prev) => [...prev, url]);
    setNewImageUrl('');
  };
  const removeImage = (url: string) =>
    setGallery((prev) => prev.filter((u) => u !== url));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanSpecs = specs.filter((s) => s.label.trim() && s.value.trim());

    const data = new FormData();
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price);
    data.append('category', form.category);
    data.append('featured', form.featured ? '1' : '0');
    data.append('is_active', form.is_active ? '1' : '0');
    data.append('specs', JSON.stringify(cleanSpecs));
    data.append('gallery', JSON.stringify(gallery));
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
    <div className="p-4 sm:p-8">
      <Link
        to="/admin/productos"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft size={20} />
        Volver
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
        {isEdit ? 'Editar producto' : 'Nuevo producto'}
      </h1>

      <div className="bg-white rounded-lg shadow p-4 sm:p-8 max-w-2xl">
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
              Escribe el nombre y "Generar con IA" buscará en la web la descripción,
              las características y posibles imágenes del producto.
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
            <label className="block text-sm font-medium text-gray-900 mb-1">Foto principal</label>
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-24 w-24 flex-shrink-0 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                {compressing ? (
                  <Loader size={22} className="animate-spin text-gray-400" />
                ) : preview ? (
                  <img src={preview} alt="Vista previa" className="h-full w-full object-cover" />
                ) : (
                  <Upload size={22} className="text-gray-400" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {/* Tomar foto: en móvil abre la cámara directamente */}
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <Camera size={18} />
                    Tomar foto
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100">
                    <Upload size={18} />
                    Elegir archivo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFile}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-600">
                  {compressing
                    ? 'Optimizando imagen…'
                    : 'Se optimiza automáticamente para subir rápido.'}
                </p>
              </div>
            </div>
          </div>

          {/* Características técnicas */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-900">
                Características
              </label>
              <button
                type="button"
                onClick={addSpec}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Plus size={16} />
                Añadir
              </button>
            </div>
            {specs.length === 0 ? (
              <p className="text-xs text-gray-500">
                Sin características. Usa "Generar con IA" o añádelas manualmente.
              </p>
            ) : (
              <div className="space-y-2">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="flex flex-1 flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        value={spec.label}
                        onChange={(e) => updateSpec(i, 'label', e.target.value)}
                        placeholder="Ej: Pantalla"
                        className={`${inputClass} sm:w-1/3`}
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpec(i, 'value', e.target.value)}
                        placeholder='Ej: 6.5" Super AMOLED 90Hz'
                        className={`${inputClass} sm:flex-1`}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSpec(i)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600"
                      aria-label="Eliminar característica"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Galería de imágenes promocionales */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Imágenes promocionales
            </label>
            {gallery.length > 0 && (
              <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {gallery.map((url) => (
                  <div
                    key={url}
                    className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <img
                      src={url}
                      alt="Imagen del producto"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget.parentElement as HTMLElement).classList.add(
                          'ring-2',
                          'ring-red-400',
                        );
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                      aria-label="Quitar imagen"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
                placeholder="https://… (URL de una imagen)"
                className={`${inputClass} flex-1`}
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="flex-shrink-0 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
              >
                Añadir
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-600">
              La IA puede sugerirlas, pero <strong>revisa</strong> cada una: las que tengan
              borde rojo no cargaron, quítalas.
            </p>
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
            disabled={isPending || compressing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isPending && <Loader size={20} className="animate-spin" />}
            {isPending
              ? 'Guardando...'
              : compressing
                ? 'Optimizando imagen...'
                : isEdit
                  ? 'Guardar cambios'
                  : 'Crear producto'}
          </button>
        </form>
      </div>
    </div>
  );
}

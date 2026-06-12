import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Loader,
  Plus,
  Package,
  Laptop,
  Smartphone,
  Camera,
  Headphones,
} from 'lucide-react'
import { formatPrice } from '../data/products'
import type { ProductCategory } from '../data/products'
import { usePublicProduct } from '../hooks/useProducts'
import { useCart } from '../hooks/useCart'

const categoryIcon: Record<ProductCategory, typeof Package> = {
  Computadores: Laptop,
  Celulares: Smartphone,
  Cámaras: Camera,
  Accesorios: Headphones,
}

export default function ProductDetail() {
  const params = useParams()
  const id = Number(params.id)
  const { data: product, isLoading, isError } = usePublicProduct(id)
  const { add } = useCart()

  const [broken, setBroken] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<string | null>(null)

  // Todas las imágenes válidas: principal + galería, sin las rotas.
  const images = useMemo(() => {
    if (!product) return []
    const all = [product.image, ...(product.gallery ?? [])].filter(
      (u): u is string => Boolean(u),
    )
    return Array.from(new Set(all)).filter((u) => !broken.has(u))
  }, [product, broken])

  if (isLoading) {
    return (
      <div className="flex justify-center bg-surface-dark py-32">
        <Loader size={32} className="animate-spin text-brand" />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="bg-surface-dark py-32 text-center">
        <p className="mb-6 text-slate-400">No encontramos este producto.</p>
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark"
        >
          <ArrowLeft size={18} />
          Volver a productos
        </Link>
      </div>
    )
  }

  const Icon = categoryIcon[product.category] ?? Package
  const cover = selected && !broken.has(selected) ? selected : images[0] ?? null

  const markBroken = (url: string) =>
    setBroken((prev) => new Set(prev).add(url))

  return (
    <section className="bg-surface-dark py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/productos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-brand"
        >
          <ArrowLeft size={18} />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Galería */}
          <div>
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-surface-light">
              {cover ? (
                <img
                  src={cover}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  onError={() => markBroken(cover)}
                />
              ) : (
                <Icon size={72} className="text-slate-600" />
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {images.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setSelected(url)}
                    className={`aspect-square overflow-hidden rounded-lg border bg-surface-light transition-colors ${
                      cover === url
                        ? 'border-brand'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <img
                      src={url}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={() => markBroken(url)}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand">
              {product.category}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-3xl font-bold text-white">
              {formatPrice(product.price)}
            </p>

            <button
              onClick={() => add(product)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <Plus size={18} />
              Agregar al pedido
            </button>

            <p className="mt-8 whitespace-pre-line leading-relaxed text-slate-300">
              {product.description}
            </p>

            {/* Características */}
            {product.specs && product.specs.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 text-lg font-bold text-white">Características</h2>
                <dl className="divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-800">
                  {product.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 gap-4 px-4 py-3 odd:bg-surface/40"
                    >
                      <dt className="text-sm font-medium text-slate-400">
                        {spec.label}
                      </dt>
                      <dd className="col-span-2 text-sm text-slate-200">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

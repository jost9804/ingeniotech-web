import { useState } from 'react'
import { Laptop, Smartphone, Camera, Headphones, Package, Plus } from 'lucide-react'
import { products, formatPrice, CATEGORIES } from '../data/products'
import type { Product, ProductCategory } from '../data/products'
import { useCart } from '../hooks/useCart'

const categoryIcon: Record<ProductCategory, typeof Package> = {
  Computadores: Laptop,
  Celulares: Smartphone,
  Cámaras: Camera,
  Accesorios: Headphones,
}

function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const Icon = categoryIcon[product.category] ?? Package

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-surface transition-colors hover:border-brand/30">
      {/* Image / placeholder */}
      <div className="relative flex h-44 items-center justify-center bg-surface-light">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Icon size={48} className="text-slate-600" />
        )}
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-semibold text-white">
            Destacado
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-medium uppercase tracking-wide text-brand">
          {product.category}
        </span>
        <h3 className="mt-1 font-bold leading-snug text-white">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
          <button
            onClick={() => add(product)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            <Plus size={16} />
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const [active, setActive] = useState<ProductCategory | 'Todos'>('Todos')

  const filtered =
    active === 'Todos' ? products : products.filter((p) => p.category === active)

  const filters: (ProductCategory | 'Todos')[] = ['Todos', ...CATEGORIES]

  return (
    <>
      {/* Header */}
      <section className="border-b border-slate-800 bg-surface-dark py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-brand">
            Nuestro inventario
          </span>
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">Productos</h1>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            Arma tu pedido y envíalo por WhatsApp. Te confirmamos disponibilidad y forma de pago.
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-surface-dark py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === f
                    ? 'bg-brand text-white'
                    : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-slate-500">
              No hay productos en esta categoría por ahora.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

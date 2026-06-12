// ────────────────────────────────────────────────────────────────────────────
// TIPOS Y HELPERS DE PRODUCTOS
// Los productos ahora viven en el backend y se administran desde /admin/productos.
// Este archivo solo define el tipo, las categorías y el formato de precio.
// ────────────────────────────────────────────────────────────────────────────

export type ProductCategory = 'Computadores' | 'Celulares' | 'Cámaras' | 'Accesorios'

export const CATEGORIES: ProductCategory[] = [
  'Computadores',
  'Celulares',
  'Cámaras',
  'Accesorios',
]

export type Product = {
  id: number
  name: string
  description: string
  price: number // COP
  category: ProductCategory
  image?: string | null
  featured?: boolean
  is_active?: boolean
}

const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number): string {
  return cop.format(value)
}

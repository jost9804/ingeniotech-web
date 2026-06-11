// ────────────────────────────────────────────────────────────────────────────
// INVENTARIO DE PRODUCTOS
// Edita este archivo para poner tus productos reales.
// - price: en pesos colombianos, solo el número (sin puntos ni símbolo).
// - image: opcional. Pon la foto en /public/products/ y referencia "/products/archivo.jpg".
//   Si no hay imagen, se muestra un ícono según la categoría.
// - featured: true para destacarlo (aparece con la etiqueta "Destacado").
// ────────────────────────────────────────────────────────────────────────────

export type ProductCategory = 'Computadores' | 'Celulares' | 'Cámaras' | 'Accesorios'

export const CATEGORIES: ProductCategory[] = [
  'Computadores',
  'Celulares',
  'Cámaras',
  'Accesorios',
]

export type Product = {
  id: string
  name: string
  description: string
  price: number // COP
  category: ProductCategory
  image?: string
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 'portatil-hp-15',
    name: 'Portátil HP 15 — Ryzen 5, 8GB, 512GB SSD',
    description: 'Ideal para trabajo y estudio. Rápido, liviano y con garantía.',
    price: 1890000,
    category: 'Computadores',
    featured: true,
  },
  {
    id: 'pc-escritorio-i5',
    name: 'PC de Escritorio Intel i5 + Monitor 22"',
    description: 'Equipo completo listo para usar, ensamblado y configurado.',
    price: 2150000,
    category: 'Computadores',
  },
  {
    id: 'samsung-a15',
    name: 'Samsung Galaxy A15 128GB',
    description: 'Pantalla AMOLED, buena cámara y batería para todo el día.',
    price: 650000,
    category: 'Celulares',
  },
  {
    id: 'redmi-13c',
    name: 'Xiaomi Redmi 13C 128GB',
    description: 'Gran relación precio-calidad. Nuevo, con garantía.',
    price: 520000,
    category: 'Celulares',
  },
  {
    id: 'camara-ip-1080',
    name: 'Cámara IP WiFi 1080p Interior',
    description: 'Monitorea desde tu celular. Visión nocturna y detección de movimiento.',
    price: 95000,
    category: 'Cámaras',
    featured: true,
  },
  {
    id: 'kit-4-camaras',
    name: 'Kit 4 Cámaras + DVR 1TB',
    description: 'Sistema de videovigilancia completo. Incluye instalación opcional.',
    price: 850000,
    category: 'Cámaras',
  },
  {
    id: 'ssd-480',
    name: 'Disco SSD 480GB SATA',
    description: 'Dale nueva vida a tu equipo. Instalación incluida.',
    price: 165000,
    category: 'Accesorios',
  },
  {
    id: 'ram-8gb',
    name: 'Memoria RAM 8GB DDR4',
    description: 'Más velocidad y multitarea para tu computador.',
    price: 120000,
    category: 'Accesorios',
  },
  {
    id: 'combo-teclado-mouse',
    name: 'Combo Teclado + Mouse Inalámbrico',
    description: 'Cómodo y sin cables. Perfecto para tu escritorio.',
    price: 75000,
    category: 'Accesorios',
  },
]

const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatPrice(value: number): string {
  return cop.format(value)
}

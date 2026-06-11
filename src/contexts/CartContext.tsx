import React, { createContext, useState, useEffect, useCallback } from 'react'
import type { Product } from '../data/products'

export type CartItem = { product: Product; qty: number }

interface CartContextType {
  items: CartItem[]
  count: number
  total: number
  isOpen: boolean
  open: () => void
  close: () => void
  add: (product: Product) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'ingeniotech_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as CartItem[]) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const add = useCallback((product: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id)
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        )
      }
      return [...prev, { product, qty: 1 }]
    })
    setIsOpen(true)
  }, [])

  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((i) => i.product.id !== id)),
    [],
  )

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const count = items.reduce((n, i) => n + i.qty, 0)
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider
      value={{ items, count, total, isOpen, open, close, add, remove, setQty, clear }}
    >
      {children}
    </CartContext.Provider>
  )
}

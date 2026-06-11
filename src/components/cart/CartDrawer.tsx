import { Link } from 'react-router-dom'
import { X, Trash2, Plus, Minus, ShoppingCart, MessageCircle } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../data/products'
import type { CartItem } from '../../contexts/CartContext'
import { BUSINESS } from '../../config'

function buildWhatsAppUrl(items: CartItem[], total: number): string {
  const lines = items
    .map((i) => `• ${i.qty} × ${i.product.name} — ${formatPrice(i.product.price)} c/u`)
    .join('\n')
  const message =
    `Hola ${BUSINESS.name} 👋, quiero hacer este pedido:\n\n` +
    `${lines}\n\n` +
    `Total: ${formatPrice(total)}\n\n` +
    `¿Me confirman disponibilidad y forma de pago?`
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`
}

export default function CartDrawer() {
  const { items, isOpen, close, total, count, setQty, remove, clear } = useCart()

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className={`fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-surface-dark shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-white">
            <ShoppingCart size={20} className="text-brand" />
            Tu carrito
            {count > 0 && <span className="text-sm font-normal text-slate-400">({count})</span>}
          </h2>
          <button
            onClick={close}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </header>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingCart size={48} className="text-slate-700" />
            <p className="mt-4 font-medium text-slate-300">Tu carrito está vacío</p>
            <p className="mt-1 text-sm text-slate-500">Agrega productos para pedirlos por WhatsApp.</p>
            <Link
              to="/productos"
              onClick={close}
              className="mt-6 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 rounded-xl border border-slate-800 bg-surface p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{item.product.name}</p>
                  <p className="mt-0.5 text-sm text-brand">{formatPrice(item.product.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQty(item.product.id, item.qty - 1)}
                      className="rounded-md border border-slate-700 p-1 text-slate-300 transition-colors hover:bg-slate-800"
                      aria-label="Quitar uno"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-white">{item.qty}</span>
                    <button
                      onClick={() => setQty(item.product.id, item.qty + 1)}
                      className="rounded-md border border-slate-700 p-1 text-slate-300 transition-colors hover:bg-slate-800"
                      aria-label="Agregar uno"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => remove(item.product.id)}
                    className="rounded-md p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-red-400"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                  <span className="text-sm font-semibold text-white">
                    {formatPrice(item.product.price * item.qty)}
                  </span>
                </div>
              </div>
            ))}

            <button
              onClick={clear}
              className="mt-2 text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              Vaciar carrito
            </button>
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <footer className="border-t border-slate-800 px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-slate-400">Total</span>
              <span className="text-xl font-bold text-white">{formatPrice(total)}</span>
            </div>
            <a
              href={buildWhatsAppUrl(items, total)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 font-semibold text-white transition-colors hover:bg-[#1EBE57]"
            >
              <MessageCircle size={18} />
              Pedir por WhatsApp
            </a>
            <p className="mt-2 text-center text-xs text-slate-500">
              Te llevará a WhatsApp con tu pedido listo para enviar.
            </p>
          </footer>
        )}
      </aside>
    </>
  )
}

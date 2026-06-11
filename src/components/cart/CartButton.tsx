import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../hooks/useCart'

export default function CartButton() {
  const { count, open } = useCart()

  return (
    <button
      onClick={open}
      className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
      aria-label={`Ver carrito (${count} productos)`}
    >
      <ShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  )
}

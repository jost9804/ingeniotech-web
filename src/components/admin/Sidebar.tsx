import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, LayoutDashboard, Wrench, Package, X } from 'lucide-react';
import { api } from '../../lib/api';

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
    logout();
    window.location.href = '/admin/login';
  };

  const linkClass =
    'flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition';

  return (
    <>
      {/* Overlay (solo móvil, cuando el menú está abierto) */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 transform flex-col bg-gray-900 text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-start justify-between border-b border-gray-700 p-6">
          <div>
            <h2 className="text-2xl font-bold">Ingeniotech</h2>
            <p className="mt-2 text-sm text-gray-400">{user?.name}</p>
          </div>
          {/* Cerrar (solo móvil) */}
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-1 text-gray-400 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-6">
          <Link to="/admin/dashboard" onClick={onClose} className={linkClass}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/admin/trabajos" onClick={onClose} className={linkClass}>
            <Wrench size={20} />
            Trabajos
          </Link>
          <Link to="/admin/productos" onClick={onClose} className={linkClass}>
            <Package size={20} />
            Productos
          </Link>
        </nav>

        <div className="border-t border-gray-700 p-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-400 transition hover:bg-gray-800"
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}

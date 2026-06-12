import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Sidebar } from '../../components/admin/Sidebar';

export function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Barra superior (solo móvil) */}
        <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="p-1 text-gray-700"
          >
            <Menu size={24} />
          </button>
          <span className="text-lg font-bold text-gray-900">Ingeniotech</span>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

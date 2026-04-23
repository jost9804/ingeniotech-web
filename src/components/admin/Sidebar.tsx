import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, LayoutDashboard, Wrench } from 'lucide-react';
import { api } from '../../lib/api';

export function Sidebar() {
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

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Ingeniotech</h2>
        <p className="text-sm text-gray-400 mt-2">{user?.name}</p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>
        <Link
          to="/admin/trabajos"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          <Wrench size={20} />
          Trabajos
        </Link>
      </nav>

      <div className="p-6 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-800 transition text-red-400"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

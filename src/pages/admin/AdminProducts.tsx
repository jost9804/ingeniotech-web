import { Link } from 'react-router-dom';
import { useAdminProducts, useDeleteProduct } from '../../hooks/useProducts';
import { formatPrice } from '../../data/products';
import { Loader, Plus, Pencil, Trash2, Package, Star } from 'lucide-react';

export function AdminProducts() {
  const { data: products, isLoading } = useAdminProducts();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Eliminar "${name}"? Esta accion no se puede deshacer.`)) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Productos</h1>
        <Link
          to="/admin/productos/nuevo"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={20} />
          Nuevo producto
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader className="animate-spin" size={32} />
        </div>
      ) : !products || products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
          <Package size={40} className="mx-auto mb-4 text-gray-300" />
          Aun no hay productos. Crea el primero con "Nuevo producto".
        </div>
      ) : (
        <>
          {/* Desktop: tabla */}
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Producto</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Categoria</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Precio</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Estado</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                          ) : (
                            <Package size={20} className="text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                            {product.name}
                            {product.featured && <Star size={14} className="text-amber-500 fill-amber-500" />}
                          </p>
                          <p className="text-sm text-gray-700 line-clamp-2">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4">
                      {product.is_active ? (
                        <span className="inline-flex rounded-full bg-green-100 text-green-700 px-2.5 py-0.5 text-xs font-medium">
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-gray-200 text-gray-700 px-2.5 py-0.5 text-xs font-medium">
                          Oculto
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/productos/${product.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          aria-label="Editar"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={isDeleting}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cards */}
          <div className="lg:hidden space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                <div className="flex gap-3 mb-3">
                  <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    ) : (
                      <Package size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900 flex items-center gap-1.5">
                      {product.name}
                      {product.featured && <Star size={14} className="text-amber-500 fill-amber-500" />}
                    </p>
                    <p className="text-xs text-gray-600">{product.category}</p>
                    <p className="text-sm text-gray-700 mt-1 line-clamp-2">{product.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-lg font-semibold text-gray-900">{formatPrice(product.price)}</p>
                    {product.is_active ? (
                      <span className="inline-flex rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-medium mt-1">
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-200 text-gray-700 px-2 py-0.5 text-xs font-medium mt-1">
                        Oculto
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/productos/${product.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      aria-label="Editar"
                    >
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={isDeleting}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

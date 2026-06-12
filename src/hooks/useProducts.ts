import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Product } from '../data/products';

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } };

/** Catálogo público (solo productos activos). */
export function usePublicProducts(category?: string) {
  return useQuery({
    queryKey: ['products', 'public', category ?? 'Todos'],
    queryFn: async () => {
      const params =
        category && category !== 'Todos'
          ? `?category=${encodeURIComponent(category)}`
          : '';
      const { data } = await api.get<Product[]>(`/products${params}`);
      return data;
    },
  });
}

/** Listado completo para el panel admin (incluye inactivos). */
export function useAdminProducts() {
  return useQuery({
    queryKey: ['products', 'admin'],
    queryFn: async () => {
      const { data } = await api.get<Product[]>('/admin/products');
      return data;
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: Number.isFinite(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post<Product>('/products', formData, multipart);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const { data } = await api.post<Product>(`/products/${id}`, formData, multipart);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });
}

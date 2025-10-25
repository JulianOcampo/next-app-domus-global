
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi, Product, ProductUpsertRequest, GetProductsParams, PagedResponseProduct } from "@/lib/api";
import { useNotification } from "@/contexts/NotificationContext";

export function useProducts(params: GetProductsParams = {}) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const productsQuery = useQuery<PagedResponseProduct>({
    queryKey: ["products", params],
    queryFn: () => productsApi.getProducts(params),
  });

  const createProduct = useMutation({
    mutationFn: (product: ProductUpsertRequest) => productsApi.createProduct(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Producto creado exitosamente");
    },
    onError: () => {
      showError("Error al crear el producto");
    },
  });

  const updateProduct = useMutation({
    mutationFn: ({ id, product }: { id: number; product: ProductUpsertRequest }) => 
      productsApi.updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Producto actualizado exitosamente");
    },
    onError: () => {
      showError("Error al actualizar el producto");
    },
  });

  const deleteProduct = useMutation({
    mutationFn: (id: number) => productsApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Producto eliminado exitosamente");
    },
    onError: () => {
      showError("Error al eliminar el producto");
    },
  });

  return {
    products: productsQuery.data?.data ?? [],
    metadata: productsQuery.data?.metadata,
    isLoading: productsQuery.isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    showSuccess,
    showError,
  };
}

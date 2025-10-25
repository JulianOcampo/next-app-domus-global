import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080",
});

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ProductUpsertRequest {
  name: string;
  price: number;
}

export interface Metadata {
  page: number;
  size: number;
  total: number;
}

export interface PagedResponseProduct {
  data: Product[];
  metadata: Metadata;
}

export interface GetProductsParams {
  name?: string;
  page?: number;
  size?: number;
}

// API functions
export const productsApi = {
  getProducts: async (params: GetProductsParams = {}): Promise<PagedResponseProduct> => {
    const response = await api.get("/api/products", { params });
    return response.data;
  },

  createProduct: async (product: ProductUpsertRequest): Promise<Product> => {
    const response = await api.post("/api/products", product);
    return response.data;
  },

  updateProduct: async (id: number, product: ProductUpsertRequest): Promise<Product> => {
    const response = await api.put(`/api/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/api/products/${id}`);
  },
};

export default api;

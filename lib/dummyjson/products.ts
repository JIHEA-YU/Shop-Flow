import type { Product, ProductsResponse } from "@/types/product";

const DUMMYJSON_BASE_URL = "https://dummyjson.com";

async function fetchDummyJson<T>(path: string): Promise<T> {
  const res = await fetch(`${DUMMYJSON_BASE_URL}${path}`);

  if (!res.ok) {
    throw new Error(`DummyJSON request failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export function getProducts(): Promise<ProductsResponse> {
  return fetchDummyJson<ProductsResponse>("/products");
}

export function getProductById(id: number): Promise<Product> {
  return fetchDummyJson<Product>(`/products/${id}`);
}

export function searchProducts(query: string): Promise<ProductsResponse> {
  return fetchDummyJson<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
}

export function getProductCategories(): Promise<string[]> {
  return fetchDummyJson<string[]>("/products/category-list");
}

export function getProductsByCategory(category: string): Promise<ProductsResponse> {
  return fetchDummyJson<ProductsResponse>(`/products/category/${encodeURIComponent(category)}`);
}

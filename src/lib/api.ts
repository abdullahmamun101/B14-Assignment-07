import type { Product } from "@/types/product";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE_URL}/products?category=${category}`
    : `${BASE_URL}/products`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();

 
  if (Array.isArray(data)) return data;
  return data.products ?? data.data ?? [];
}
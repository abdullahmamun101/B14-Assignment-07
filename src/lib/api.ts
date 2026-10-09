import type { Product } from "@/types/product";

const BASE_URL = "https://api.abcz.workers.dev/api/bazardor/products";

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];

  const data = await res.json();

  if (Array.isArray(data)) return data;
  return data.products ?? data.data ?? [];
}

export async function getProduct(id: number | string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}
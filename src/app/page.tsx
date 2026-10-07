import Hero from "@/components/Hero";
import PriceChangeSection from "@/components/PriceChangeSection";
import AllProductsSection from "@/components/AllProductsSection";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

export default async function Home() {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Products API failed");
  }

  const data = await response.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : data.products ?? data.data ?? [];

  return (
    <>
      <Hero />

      <PriceChangeSection
        products={products}
        type="up"
      />

      <PriceChangeSection
        products={products}
        type="down"
      />

      <AllProductsSection
        products={products}
      />
    </>
  );
}
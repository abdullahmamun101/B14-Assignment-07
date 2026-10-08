"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import SortDropdown, { type SortOption } from "@/components/SortDropdown";
import { toBanglaNumber } from "@/lib/bangla";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = useMemo(() => {
    const items = [...products];
    if (sort === "low") items.sort((a, b) => a.today - b.today);
    if (sort === "high") items.sort((a, b) => b.today - a.today);
    return items;
  }, [products, sort]);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="text-5xl">🛒</div>
        <h2 className="mt-4 text-xl font-bold">কোনো পণ্য পাওয়া যায়নি</h2>
        <Link href="/" className="btn btn-success mt-6 text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          মোট {toBanglaNumber(sorted.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

type AllProductsSectionProps = {
  products: Product[];
};

function toBengaliNumber(value: number | string) {
  const digits: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return String(value).replace(/[0-9]/g, (digit) => digits[digit]);
}

function getUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    gm: "গ্রাম",
  };

  return units[unit] ?? unit;
}

export default function AllProductsSection({
  products,
}: AllProductsSectionProps) {
  const [sort, setSort] = useState("default");

  const sortedProducts = useMemo(() => {
    const items = [...products];

    if (sort === "low") {
      items.sort((a, b) => a.today - b.today);
    }

    if (sort === "high") {
      items.sort((a, b) => b.today - a.today);
    }

    return items;
  }, [products, sort]);

  return (
    <section
      id="সব-পণ্য"
      className="px-4 py-8 md:py-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              সব পণ্য দেখানো হচ্ছে
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              মোট {toBengaliNumber(products.length)}টি পণ্য
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="product-sort"
              className="text-sm text-gray-500"
            >
              সাজান
            </label>

            <select
              id="product-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="rounded-lg border border-gray-300 bg-[#fafcfa] px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low">দাম: কম থেকে বেশি</option>
              <option value="high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => {
              const isUp = product.change.dir === "up";
              const isDown = product.change.dir === "down";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group rounded-xl border border-gray-200 bg-[#fafcfa] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex min-h-105px items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-2xl">
                      {product.image}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-semibold text-gray-900">
                        {product.nameBn}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        প্রতি {getUnit(product.unit)}
                      </p>

                      <p className="mt-3 text-base font-bold text-gray-900">
                        {toBengaliNumber(product.today)} টাকা
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="mb-1 text-[10px] text-gray-400">
                        আজকের দাম
                      </p>

                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          isUp
                            ? "bg-red-50 text-red-600"
                            : isDown
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                        {toBengaliNumber(product.change.pct)}%
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-[#fafcfa] py-10 text-center">
            <p className="text-sm text-gray-500">
              কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";

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

type PriceChangeSectionProps = {
  products: Product[];
  type: "up" | "down";
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

export default function PriceChangeSection({
  products,
  type,
}: PriceChangeSectionProps) {
  const isUp = type === "up";

  const filteredProducts = products
    .filter((product) => product.change?.dir === type)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="px-4 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-center gap-2">
          <span
            className={`text-sm font-bold ${
              isUp ? "text-red-600" : "text-green-600"
            }`}
          >
            {isUp ? "▲" : "▼"}
          </span>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {isUp ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
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
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"}{" "}
                    {toBengaliNumber(product.change.pct)}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
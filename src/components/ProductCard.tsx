import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice, toBanglaNumber } from "@/lib/bangla";

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

export default function ProductCard({ product }: { product: Product }) {
  const { dir, pct } = product.change;
  const isFlat = pct === 0;
  const isUp = !isFlat && dir === "up";
  const isDown = !isFlat && dir === "down";

  const badgeStyle = isUp
    ? "bg-red-50 text-red-600"
    : isDown
      ? "bg-green-50 text-green-600"
      : "bg-gray-100 text-gray-500";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-xl border border-gray-200 bg-[#fafcfa] p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
    >
      <div className="flex items-center gap-4">
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
            {formatPrice(product.today)}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="mb-1 text-[10px] text-gray-400">আজকের দাম</p>
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${badgeStyle}`}
          >
            {arrow} {toBanglaNumber(pct.toFixed(1))}%
          </span>
        </div>
      </div>
    </Link>
  );
}
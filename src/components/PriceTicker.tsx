"use client";

import { useState } from "react";

type Product = {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
};

type PriceTickerProps = {
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

export default function PriceTicker({
  products,
}: PriceTickerProps) {
  const [isPaused, setIsPaused] = useState(false);

  const tickerProducts = products.slice(0, 8);

  if (!tickerProducts.length) {
    return null;
  }

  return (
    <div
      className="w-full overflow-hidden border-y border-gray-200 bg-[#fafcfa]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="ticker-track flex w-max"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* First group */}
        <div className="ticker-group flex shrink-0">
          {tickerProducts.map((product) => {
            const isUp = product.change.dir === "up";

            return (
              <div
                key={product.id}
                className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-5 py-2 text-[13px]"
              >
                <span className="text-base">
                  {product.image}
                </span>

                <span className="font-medium text-gray-700">
                  {product.nameBn}
                </span>

                <span className="text-gray-600">
                  {toBengaliNumber(product.today)} টাকা/
                  {getUnit(product.unit)}
                </span>

                <span
                  className={`font-semibold ${
                    isUp
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"}{" "}
                  {toBengaliNumber(product.change.pct)}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Duplicate group for seamless loop */}
        <div className="ticker-group flex shrink-0">
          {tickerProducts.map((product) => {
            const isUp = product.change.dir === "up";

            return (
              <div
                key={`duplicate-${product.id}`}
                className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-5 py-2 text-[13px]"
              >
                <span className="text-base">
                  {product.image}
                </span>

                <span className="font-medium text-gray-700">
                  {product.nameBn}
                </span>

                <span className="text-gray-600">
                  {toBengaliNumber(product.today)} টাকা/
                  {getUnit(product.unit)}
                </span>

                <span
                  className={`font-semibold ${
                    isUp
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"}{" "}
                  {toBengaliNumber(product.change.pct)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
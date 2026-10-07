"use client";

import { useState } from "react";

const tickerData = [
  {
    emoji: "🥩",
    name: "খাসির মাংস",
    price: "১,২৯০",
    unit: "টাকা/কেজি",
    change: "০.০%",
    up: false,
  },
  {
    emoji: "🍆",
    name: "বেগুন",
    price: "২৫",
    unit: "টাকা/কেজি",
    change: "০.৮%",
    up: false,
  },
  {
    emoji: "🥚",
    name: "ডিম",
    price: "১৫৫",
    unit: "টাকা/ডজন",
    change: "০.৯%",
    up: true,
  },
  {
    emoji: "🥛",
    name: "দুধ",
    price: "১০২",
    unit: "টাকা/লিটার",
    change: "২.০%",
    up: true,
  },
  {
    emoji: "🍚",
    name: "মিনিকেট চাল",
    price: "৯৯",
    unit: "টাকা/কেজি",
    change: "০.৬%",
    up: true,
  },
  {
    emoji: "🍗",
    name: "মুরগি",
    price: "৫৮",
    unit: "টাকা/কেজি",
    change: "০.০%",
    up: true,
  },
  {
    emoji: "🧅",
    name: "পেঁয়াজ",
    price: "১২৫",
    unit: "টাকা/কেজি",
    change: "৪.৮%",
    up: false,
  },
];

export default function PriceTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="w-full overflow-hidden border-y border-gray-200 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="ticker-track flex w-max"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* First set */}
        <div className="ticker-group flex shrink-0">
          {[...tickerData, ...tickerData].map((item, index) => (
            <div
              key={`first-${index}`}
              className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-5 py-2 text-[13px]"
            >
              <span className="text-base">{item.emoji}</span>

              <span className="font-medium text-gray-700">
                {item.name}
              </span>

              <span className="text-gray-600">
                {item.price} {item.unit}
              </span>

              <span
                className={`font-semibold ${
                  item.up ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.up ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* second set */}
        <div className="ticker-group flex shrink-0">
          {[...tickerData, ...tickerData].map((item, index) => (
            <div
              key={`second-${index}`}
              className="flex shrink-0 items-center gap-1.5 border-r border-gray-200 px-5 py-2 text-[13px]"
            >
              <span className="text-base">{item.emoji}</span>

              <span className="font-medium text-gray-700">
                {item.name}
              </span>

              <span className="text-gray-600">
                {item.price} {item.unit}
              </span>

              <span
                className={`font-semibold ${
                  item.up ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.up ? "▲" : "▼"} {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
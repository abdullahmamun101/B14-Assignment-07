import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

const bengaliFont = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

const API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

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

export const metadata: Metadata = {
  title: "বাজার দর — আজকের দাম",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম এক জায়গায়।",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let products: Product[] = [];

  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      products = Array.isArray(data)
        ? data
        : data.products ?? data.data ?? [];
    }
  } catch {
    products = [];
  }

  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${bengaliFont.className} flex min-h-screen flex-col bg-gray-50 text-gray-800`}
      >
        <Navbar />
        <ToasterProvider />

        <PriceTicker products={products} />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

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
  markets: Market[];
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
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

async function getProduct(slug: string): Promise<Product | null> {
  const response = await fetch(`${API_URL}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  const products: Product[] = Array.isArray(data)
    ? data
    : data.products ?? data.data ?? [];

  return products.find((product) => product.slug === slug) ?? null;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    const backTo = encodeURIComponent(`/product/${slug}`);
    redirect(`/signin?login=required&callbackUrl=${backTo}`);
  }

  const product = await getProduct(slug);

  
  if (!product) notFound();

  const unit = getUnit(product.unit);
  const isUp = product.change.dir === "up";

  const allPrices = [
    ...product.markets.map((market) => market.min),
    ...product.markets.map((market) => market.max),
  ];

  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const averagePrice =
    allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length;

  return (
    <main className="min-h-screen px-4 py-8 md:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-gray-700">{product.nameBn}</span>
        </div>

        
        <section className="rounded-2xl border border-gray-200 bg-[#fafcfa] p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-white text-4xl">
                {product.image}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unit} · {product.categoryNameBn}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  গতকালের তুলনায় আজকের দাম{" "}
                  <span
                    className={`font-semibold ${
                      isUp ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isUp ? "বেড়েছে" : "কমেছে"}{" "}
                    {toBengaliNumber(product.change.pct)}%
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full rounded-xl bg-[#f0f5f0] px-6 py-4 text-center md:w-40">
              <p className="text-sm text-gray-500">আজকের দাম</p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {toBengaliNumber(product.today)}
              </p>

              <p className="text-sm text-gray-500">টাকা / {unit}</p>

              <p
                className={`mt-1 text-sm font-semibold ${
                  isUp ? "text-red-600" : "text-green-600"
                }`}
              >
                {isUp ? "▲" : "▼"} {toBengaliNumber(product.change.pct)}%
              </p>
            </div>
          </div>
        </section>

       
        <section className="mt-6 rounded-2xl border border-gray-200 bg-[#fafcfa] p-5 md:p-6">
          <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-[#fafcfa] p-5">
              <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {toBengaliNumber(minPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">সবচেয়ে কম বাজার দর</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[#fafcfa] p-5">
              <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {toBengaliNumber(maxPrice)} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">সবচেয়ে বেশি বাজার দর</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[#fafcfa] p-5">
              <p className="text-sm text-gray-500">গড় দাম</p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {toBengaliNumber(averagePrice.toFixed(1))} টাকা
              </p>

              <p className="mt-1 text-xs text-gray-500">বাজারগুলোর গড় দাম</p>
            </div>
          </div>
        </section>

       
        <section className="mt-6 rounded-2xl border border-gray-200 bg-[#fafcfa] p-5 md:p-6">
          <h2 className="text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[700px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#f0f5f0]">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    বাজার
                  </th>

                  <th className="px-4 py-3 text-left font-semibold text-gray-600">
                    বিভাগ
                  </th>

                  <th className="px-4 py-3 text-right font-semibold text-gray-600">
                    সর্বনিম্ন
                  </th>

                  <th className="px-4 py-3 text-right font-semibold text-gray-600">
                    সর্বোচ্চ
                  </th>

                  <th className="px-4 py-3 text-right font-semibold text-gray-600">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => {
                  const average = (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {market.market}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-4 py-3 text-right text-gray-700">
                        {toBengaliNumber(market.min)} টাকা
                      </td>

                      <td className="px-4 py-3 text-right text-gray-700">
                        {toBengaliNumber(market.max)} টাকা
                      </td>

                      <td className="px-4 py-3 text-right font-medium text-gray-800">
                        {toBengaliNumber(average.toFixed(1))} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <Link
          href={`/category/${product.category}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-green-700"
        >
          {product.categoryIcon} {product.categoryNameBn}
        </Link>
      </div>
    </main>
  );
}
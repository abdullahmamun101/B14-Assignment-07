import { notFound } from "next/navigation";
import { categories } from "@/lib/categories";
import { getProducts } from "@/lib/api";
import { toBanglaNumber } from "@/lib/bangla";
import CategoryProducts from "@/components/CategoryProducts";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      
      <div className="mb-6 flex items-center gap-4 rounded-2xl border border-gray-200 bg-[#fafcfa] p-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-3xl">
          {category.emoji}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 ">{category.name}</h1>
          <p className="text-sm text-gray-600">
            {toBanglaNumber(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </div>
  );
}
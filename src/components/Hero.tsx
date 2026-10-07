import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#f0f5f0] px-4 py-6 md:py-8">
      <div className="mx-auto grid max-w-6xl items-center overflow-hidden rounded-3xl border border-gray-200 bg-[#fafcfa] px-5 py-8 md:grid-cols-2 md:px-8 md:py-10 lg:px-4 lg:py-10">
        
        {/* Left Content */}
        <div className="max-w-2xl">
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            বুধবার, ৭ অক্টোবর, ২০২৬
          </p>

          <h1 className="text-4xl font-bold leading-[1.05] text-gray-900 sm:text-5xl lg:text-[46px]">
            আজকের বাজারের দাম এক
            <br />
            নজরে
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-6 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-6 inline-flex rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={420}
            height={320}
            priority
            className="h-auto w-280px object-contain sm:w-330px md:w-360px lg:w-390px"
          />
        </div>
      </div>
    </section>
  );
}
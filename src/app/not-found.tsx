import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center">
      <div className="text-6xl">🛒</div>
      <h1 className="mt-4 text-3xl font-bold">৪০৪ — পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-600">
        আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।
      </p>
      <Link href="/" className="btn btn-success mt-6 text-white">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
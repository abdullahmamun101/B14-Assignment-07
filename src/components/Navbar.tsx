"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";
import AuthButtons from "@/components/AuthButtons";

export default function Navbar() {
    const pathname = usePathname();

    const today = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
    });

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-[#fafcfa]">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
                <Link href="/" className="flex items-center gap-2 leading-tight">
                    <Image
                        src="/logo-icon.png"
                        alt="বাজার দর"
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-xl object-contain"
                    />

                    <div>
                        <div className="text-xl font-bold text-black sm:text-2xl">
                            বাজার দর
                        </div>

                        <div className="text-xs text-gray-500">
                            {today}
                        </div>
                    </div>
                </Link>

                <AuthButtons />
            </div>

            <nav className="mx-auto max-w-6xl overflow-x-auto px-4 pb-3">
                <ul className="flex w-max gap-2">
                    {categories.map((cat) => {
                        const isActive = pathname === `/category/${cat.slug}`;
                        return (
                            <li key={cat.slug}>
                                <Link
                                    href={`/category/${cat.slug}`}
                                    className={`inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${isActive
                                            ? "font-semibold text-green-600"
                                            : "text-gray-700 hover:text-green-600"
                                        }`}
                                >
                                    {cat.emoji} {cat.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
}
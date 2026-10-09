"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim();
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));

    // Validation
    if (!name || !email || !password) {
      toast.error("সব ঘর পূরণ করুন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে!");
    router.push("/");
    router.refresh();
  }

  async function handleSocial(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-sm text-gray-600">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="mb-1 block text-sm font-medium">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="আবার লিখুন"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-success w-full text-white"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-gray-500">
          <div className="h-px flex-1 bg-gray-200" />
          অথবা
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            className="btn btn-outline btn-sm h-auto py-2 text-xs sm:text-sm"
          >
            <FcGoogle size={18} />
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => handleSocial("github")}
            className="btn btn-outline btn-sm h-auto py-2 text-xs sm:text-sm"
          >
            <FaGithub size={18} />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-green-700 underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-gray-600 underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
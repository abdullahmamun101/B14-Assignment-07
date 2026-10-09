import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/UpdateNameForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/signin?login=required&callbackUrl=%2Fprofile%2Fupdate");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm text-gray-600">আপনার নাম পরিবর্তন করুন।</p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <UpdateNameForm currentName={session.user.name} />
      </div>

      <p className="mt-6 text-sm">
        <Link href="/profile" className="text-gray-600 underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
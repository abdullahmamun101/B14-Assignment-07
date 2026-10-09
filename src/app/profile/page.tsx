import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  // Login na thakle /signin e pathabe
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?login=required&callbackUrl=%2Fprofile");

  const { name, email } = session.user;
  const initial = name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-600">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold text-gray-900">
                {name}
              </p>
              <p className="truncate text-sm text-gray-600">{email}</p>
            </div>
          </div>

          <SignOutButton />
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4">
          <Link
            href="/profile/update"
            className="btn btn-success btn-sm text-white sm:btn-md"
          >
            নাম হালনাগাদ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
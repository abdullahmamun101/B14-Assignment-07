"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

 
  function closeMenu() {
    (document.activeElement as HTMLElement | null)?.blur();
  }

  
  if (isPending) {
    return <div className="skeleton h-9 w-28 rounded-full" />;
  }

 
  if (!session) {
    return (
      <div className="flex gap-2">
        <Link href="/signin" className="btn btn-outline btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link
          href="/signup"
          className="btn btn-success btn-sm text-white sm:btn-md"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  
  const user = session.user;
  const initial = user.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
          {initial}
        </span>
        <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
          {user.name}
        </span>
        <span className="text-xs text-gray-500">▾</span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu z-50 mt-2 w-52 rounded-xl border border-gray-200 bg-white p-2 shadow"
      >
        <li className="truncate px-3 py-1 text-xs text-gray-500">
          {user.email}
        </li>
        <li>
          <Link href="/profile" onClick={closeMenu}>
            আমার প্রোফাইল
          </Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              closeMenu();
              handleSignOut();
            }}
          >
            সাইন আউট
          </button>
        </li>
      </ul>
    </div>
  );
}
import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/server";
import { ROUTES } from "@/constants/routes";

export default async function MyPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">My Page</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{user?.email}</p>

      <div className="mt-6 flex flex-col gap-2">
        <Link
          href={ROUTES.WISHLIST}
          className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
        >
          Wishlist
        </Link>
        <Link
          href={ROUTES.CART}
          className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
        >
          Cart
        </Link>
        <Link
          href={ROUTES.ORDERS}
          className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
        >
          Orders
        </Link>
      </div>
    </div>
  );
}

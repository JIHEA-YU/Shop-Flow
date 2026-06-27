import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Navbar } from "@/components/layout/Navbar";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getCurrentUser } from "@/lib/supabase/server";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href={ROUTES.HOME} className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
          ShopFlow
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Navbar />
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.MYPAGE}
                className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
              >
                My Page
              </Link>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.LOGIN}
                className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
              >
                Login
              </Link>
              <Link
                href={ROUTES.SIGNUP}
                className="text-sm font-medium text-zinc-950 dark:text-zinc-50"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

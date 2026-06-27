import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Navbar } from "@/components/layout/Navbar";

export function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href={ROUTES.HOME} className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
          ShopFlow
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Navbar />
          <Link href={ROUTES.LOGIN} className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

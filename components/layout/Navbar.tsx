import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const NAV_LINKS = [
  { label: "Products", href: ROUTES.PRODUCTS },
  { label: "Wishlist", href: ROUTES.WISHLIST },
  { label: "Cart", href: ROUTES.CART },
  { label: "Orders", href: ROUTES.ORDERS },
  { label: "My Page", href: ROUTES.MYPAGE },
];

export function Navbar() {
  return (
    <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-600 dark:text-zinc-300">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

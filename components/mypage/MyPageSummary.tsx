import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface MyPageSummaryProps {
  orderCount: number;
  wishlistCount: number;
  cartItemCount: number;
  cartTotalQuantity: number;
}

export function MyPageSummary({
  orderCount,
  wishlistCount,
  cartItemCount,
  cartTotalQuantity,
}: MyPageSummaryProps) {
  const cards = [
    { label: "주문 수", value: `${orderCount}건`, href: ROUTES.ORDERS },
    { label: "찜한 상품", value: `${wishlistCount}개`, href: ROUTES.WISHLIST },
    { label: "장바구니", value: `${cartItemCount}종 · ${cartTotalQuantity}개`, href: ROUTES.CART },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800"
        >
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{card.label}</span>
          <span className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
            {card.value}
          </span>
        </Link>
      ))}
    </div>
  );
}

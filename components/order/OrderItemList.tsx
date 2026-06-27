import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import type { OrderItem } from "@/types/order";

interface OrderItemListProps {
  items: OrderItem[];
}

export function OrderItemList({ items }: OrderItemListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 p-4 text-center dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">주문 항목을 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg border border-zinc-200 dark:border-zinc-800">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 border-b border-zinc-200 px-4 py-4 last:border-b-0 dark:border-zinc-800"
        >
          <Link
            href={ROUTES.PRODUCT_DETAIL(item.product_id)}
            className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900"
          >
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="64px"
                className="object-cover"
              />
            )}
          </Link>
          <div className="flex flex-1 flex-col gap-1">
            <Link
              href={ROUTES.PRODUCT_DETAIL(item.product_id)}
              className="line-clamp-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50"
            >
              {item.title}
            </Link>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              ${item.price.toFixed(2)} x {item.quantity}
            </span>
          </div>
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}

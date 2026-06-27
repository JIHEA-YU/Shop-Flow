import Image from "next/image";
import type { CartItem } from "@/types/cart";

interface CheckoutSummaryProps {
  items: CartItem[];
  total: number;
}

export function CheckoutSummary({ items, total }: CheckoutSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col rounded-lg border border-zinc-200 dark:border-zinc-800">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b border-zinc-200 px-4 py-4 last:border-b-0 dark:border-zinc-800"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900">
              {item.thumbnail && (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <span className="line-clamp-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                {item.title}
              </span>
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
      <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 text-base font-semibold text-zinc-950 dark:border-zinc-800 dark:text-zinc-50">
        <span>총 합계</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

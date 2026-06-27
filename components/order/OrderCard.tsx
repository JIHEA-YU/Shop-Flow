import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/constants/routes";
import { ORDER_STATUS_BADGE_VARIANT, ORDER_STATUS_LABEL } from "@/types/order";
import type { Order } from "@/types/order";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Link
      href={ROUTES.ORDER_DETAIL(order.id)}
      className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 p-4 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          주문 #{order.id}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {new Date(order.created_at).toLocaleString()}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant={ORDER_STATUS_BADGE_VARIANT[order.status]}>
          {ORDER_STATUS_LABEL[order.status]}
        </Badge>
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          ${order.total_price.toFixed(2)}
        </span>
      </div>
    </Link>
  );
}

import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_BADGE_VARIANT, ORDER_STATUS_LABEL } from "@/types/order";
import type { Order } from "@/types/order";

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          주문 #{order.id}
        </span>
        <Badge variant={ORDER_STATUS_BADGE_VARIANT[order.status]}>
          {ORDER_STATUS_LABEL[order.status]}
        </Badge>
      </div>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        {new Date(order.created_at).toLocaleString()}
      </span>
      <div className="mt-2 flex items-center justify-between text-base font-semibold text-zinc-950 dark:text-zinc-50">
        <span>총 합계</span>
        <span>${order.total_price.toFixed(2)}</span>
      </div>
    </div>
  );
}

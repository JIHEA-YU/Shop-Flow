import Link from "next/link";
import { OrderCard } from "@/components/order/OrderCard";
import { ROUTES } from "@/constants/routes";
import type { Order } from "@/types/order";

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">최근 주문</h2>
        <Link
          href={ROUTES.ORDERS}
          className="text-xs text-zinc-500 hover:underline dark:text-zinc-400"
        >
          전체 주문 보기
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          아직 주문 내역이 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

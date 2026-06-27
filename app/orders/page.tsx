import Link from "next/link";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getOrders } from "@/services/order-service";
import { OrderCard } from "@/components/order/OrderCard";
import { ROUTES } from "@/constants/routes";
import type { Order } from "@/types/order";

async function loadOrders(userId: string): Promise<{ orders: Order[]; hasError: boolean }> {
  try {
    const supabase = await createClient();
    const orders = await getOrders(supabase, userId);
    return { orders, hasError: false };
  } catch {
    return { orders: [], hasError: true };
  }
}

export default async function OrdersPage() {
  const user = await getCurrentUser();

  // proxy.ts가 /orders를 보호하므로 비로그인 상태로는 이 지점에 도달하지 않는다.
  if (!user) {
    return null;
  }

  const { orders, hasError } = await loadOrders(user.id);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Orders</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">주문 내역 {orders.length}건</p>

      <div className="mt-6">
        {hasError ? (
          <p className="text-sm text-red-600 dark:text-red-400">주문 내역을 불러오지 못했습니다.</p>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">주문 내역이 없습니다.</p>
            <Link
              href={ROUTES.PRODUCTS}
              className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
            >
              상품 목록 보러가기
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

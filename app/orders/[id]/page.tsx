import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getOrderById, getOrderItems } from "@/services/order-service";
import { OrderSummary } from "@/components/order/OrderSummary";
import { OrderItemList } from "@/components/order/OrderItemList";
import { ROUTES } from "@/constants/routes";
import type { Order, OrderItem } from "@/types/order";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

async function loadOrder(
  userId: string,
  orderId: number,
): Promise<{ order: Order | null; items: OrderItem[]; hasError: boolean }> {
  try {
    const supabase = await createClient();
    const order = await getOrderById(supabase, userId, orderId);

    if (!order) {
      return { order: null, items: [], hasError: false };
    }

    const items = await getOrderItems(supabase, order.id);
    return { order, items, hasError: false };
  } catch {
    return { order: null, items: [], hasError: true };
  }
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const user = await getCurrentUser();

  // proxy.ts가 /orders/[id]를 보호하므로 비로그인 상태로는 이 지점에 도달하지 않는다.
  if (!user) {
    return null;
  }

  const { order, items, hasError } = await loadOrder(user.id, numericId);

  if (hasError) {
    return (
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
        <Link
          href={ROUTES.ORDERS}
          className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
        >
          ← 주문 내역으로
        </Link>
        <p className="mt-6 text-sm text-red-600 dark:text-red-400">
          주문 정보를 불러오지 못했습니다.
        </p>
      </div>
    );
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
      <Link
        href={ROUTES.ORDERS}
        className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
      >
        ← 주문 내역으로
      </Link>
      <div className="mt-6 flex flex-col gap-6">
        <OrderSummary order={order} />
        <OrderItemList items={items} />
      </div>
    </div>
  );
}

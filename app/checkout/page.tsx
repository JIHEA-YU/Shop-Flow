import Link from "next/link";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getCartItems, getCartTotal } from "@/services/cart-service";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { CheckoutButton } from "@/components/checkout/CheckoutButton";
import { ROUTES } from "@/constants/routes";
import type { CartItem } from "@/types/cart";

async function loadCart(userId: string): Promise<{ items: CartItem[]; hasError: boolean }> {
  try {
    const supabase = await createClient();
    const items = await getCartItems(supabase, userId);
    return { items, hasError: false };
  } catch {
    return { items: [], hasError: true };
  }
}

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  // proxy.ts가 /checkout을 보호하므로 비로그인 상태로는 이 지점에 도달하지 않는다.
  if (!user) {
    return null;
  }

  const { items, hasError } = await loadCart(user.id);

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Checkout</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        주문 내용을 확인하고 결제를 진행하세요.
      </p>

      <div className="mt-6">
        {hasError ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            장바구니를 불러오지 못했습니다.
          </p>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">장바구니가 비어 있습니다.</p>
            <div className="flex gap-4">
              <Link
                href={ROUTES.PRODUCTS}
                className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
              >
                상품 목록 보러가기
              </Link>
              <Link
                href={ROUTES.CART}
                className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
              >
                장바구니로 가기
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <CheckoutSummary items={items} total={getCartTotal(items)} />
            <CheckoutButton />
          </div>
        )}
      </div>
    </div>
  );
}

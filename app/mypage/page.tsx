import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getOrders } from "@/services/order-service";
import { getWishlistItems } from "@/services/wishlist-service";
import { getCartItems } from "@/services/cart-service";
import { ProfileCard } from "@/components/mypage/ProfileCard";
import { MyPageSummary } from "@/components/mypage/MyPageSummary";
import { RecentOrders } from "@/components/mypage/RecentOrders";
import { LogoutButton } from "@/components/auth/LogoutButton";
import type { Order } from "@/types/order";
import type { WishlistItem } from "@/types/wishlist";
import type { CartItem } from "@/types/cart";

async function loadOrders(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ orders: Order[]; hasError: boolean }> {
  try {
    const orders = await getOrders(supabase, userId);
    return { orders, hasError: false };
  } catch {
    return { orders: [], hasError: true };
  }
}

async function loadWishlist(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ items: WishlistItem[]; hasError: boolean }> {
  try {
    const items = await getWishlistItems(supabase, userId);
    return { items, hasError: false };
  } catch {
    return { items: [], hasError: true };
  }
}

async function loadCart(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ items: CartItem[]; hasError: boolean }> {
  try {
    const items = await getCartItems(supabase, userId);
    return { items, hasError: false };
  } catch {
    return { items: [], hasError: true };
  }
}

export default async function MyPage() {
  const user = await getCurrentUser();

  // proxy.ts가 /mypage를 보호하므로 비로그인 상태로는 이 지점에 도달하지 않는다.
  if (!user) {
    return null;
  }

  const supabase = await createClient();

  const [
    { orders, hasError: ordersHasError },
    { items: wishlistItems, hasError: wishlistHasError },
    { items: cartItems, hasError: cartHasError },
  ] = await Promise.all([
    loadOrders(supabase, user.id),
    loadWishlist(supabase, user.id),
    loadCart(supabase, user.id),
  ]);

  const cartTotalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const hasPartialError = ordersHasError || wishlistHasError || cartHasError;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">My Page</h1>
        <LogoutButton />
      </div>

      <div className="mt-6 flex flex-col gap-6">
        <ProfileCard email={user.email ?? "이메일 정보 없음"} createdAt={user.created_at} />

        {hasPartialError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            일부 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
          </p>
        )}

        <MyPageSummary
          orderCount={orders.length}
          wishlistCount={wishlistItems.length}
          cartItemCount={cartItems.length}
          cartTotalQuantity={cartTotalQuantity}
        />

        <RecentOrders orders={orders.slice(0, 3)} />
      </div>
    </div>
  );
}

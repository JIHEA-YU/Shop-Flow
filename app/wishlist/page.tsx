import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getWishlistItems } from "@/services/wishlist-service";
import { WishlistGrid } from "@/components/wishlist/WishlistGrid";
import type { WishlistItem } from "@/types/wishlist";

async function loadWishlist(userId: string): Promise<{ items: WishlistItem[]; hasError: boolean }> {
  try {
    const supabase = await createClient();
    const items = await getWishlistItems(supabase, userId);
    return { items, hasError: false };
  } catch {
    return { items: [], hasError: true };
  }
}

export default async function WishlistPage() {
  const user = await getCurrentUser();

  // proxy.ts가 /wishlist를 보호하므로 비로그인 상태로는 이 지점에 도달하지 않는다.
  if (!user) {
    return null;
  }

  const { items, hasError } = await loadWishlist(user.id);

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Wishlist</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">찜한 상품 {items.length}개</p>

      <div className="mt-6">
        {hasError ? (
          <p className="text-sm text-red-600 dark:text-red-400">찜 목록을 불러오지 못했습니다.</p>
        ) : (
          <WishlistGrid userId={user.id} items={items} />
        )}
      </div>
    </div>
  );
}

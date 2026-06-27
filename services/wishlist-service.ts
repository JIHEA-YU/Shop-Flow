import type { SupabaseClient } from "@supabase/supabase-js";
import type { AddWishlistItemInput, WishlistItem } from "@/types/wishlist";

export async function getWishlistItems(
  supabase: SupabaseClient,
  userId: string,
): Promise<WishlistItem[]> {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`찜 목록을 불러오지 못했습니다: ${error.message}`);
  }

  return (data ?? []) as WishlistItem[];
}

export async function addWishlistItem(
  supabase: SupabaseClient,
  userId: string,
  product: AddWishlistItemInput,
): Promise<void> {
  const { error } = await supabase.from("wishlist").insert({
    user_id: userId,
    product_id: product.product_id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
  });

  if (error) {
    throw new Error(`찜 추가에 실패했습니다: ${error.message}`);
  }
}

export async function removeWishlistItem(
  supabase: SupabaseClient,
  userId: string,
  productId: number,
): Promise<void> {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    throw new Error(`찜 해제에 실패했습니다: ${error.message}`);
  }
}

export async function isWishlisted(
  supabase: SupabaseClient,
  userId: string,
  productId: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("wishlist")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    throw new Error(`찜 상태를 확인하지 못했습니다: ${error.message}`);
  }

  return data !== null;
}

export async function toggleWishlistItem(
  supabase: SupabaseClient,
  userId: string,
  product: AddWishlistItemInput,
): Promise<boolean> {
  const wishlisted = await isWishlisted(supabase, userId, product.product_id);

  if (wishlisted) {
    await removeWishlistItem(supabase, userId, product.product_id);
    return false;
  }

  await addWishlistItem(supabase, userId, product);
  return true;
}

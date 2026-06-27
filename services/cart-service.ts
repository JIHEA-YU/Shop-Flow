import type { SupabaseClient } from "@supabase/supabase-js";
import type { AddCartItemInput, AddCartItemResult, CartItem } from "@/types/cart";

export async function getCartItems(supabase: SupabaseClient, userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`장바구니를 불러오지 못했습니다: ${error.message}`);
  }

  return (data ?? []) as CartItem[];
}

export async function isInCart(
  supabase: SupabaseClient,
  userId: string,
  productId: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("cart_items")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    throw new Error(`장바구니 상태를 확인하지 못했습니다: ${error.message}`);
  }

  return data !== null;
}

export async function addCartItem(
  supabase: SupabaseClient,
  userId: string,
  product: AddCartItemInput,
): Promise<AddCartItemResult> {
  try {
    const alreadyInCart = await isInCart(supabase, userId, product.product_id);
    if (alreadyInCart) {
      return { status: "already_exists" };
    }

    const { error } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: product.product_id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });

    if (error) {
      if (error.code === "23505") {
        return { status: "already_exists" };
      }
      return { status: "error", message: error.message };
    }

    return { status: "added" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "장바구니 추가에 실패했습니다.";
    return { status: "error", message };
  }
}

export async function updateCartItemQuantity(
  supabase: SupabaseClient,
  userId: string,
  productId: number,
  quantity: number,
): Promise<void> {
  if (quantity < 1) {
    await removeCartItem(supabase, userId, productId);
    return;
  }

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    throw new Error(`수량 변경에 실패했습니다: ${error.message}`);
  }
}

export async function removeCartItem(
  supabase: SupabaseClient,
  userId: string,
  productId: number,
): Promise<void> {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    throw new Error(`상품 삭제에 실패했습니다: ${error.message}`);
  }
}

export async function clearCart(supabase: SupabaseClient, userId: string): Promise<void> {
  const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);

  if (error) {
    throw new Error(`장바구니 비우기에 실패했습니다: ${error.message}`);
  }
}

export function getCartTotal(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

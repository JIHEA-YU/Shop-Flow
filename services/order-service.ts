import type { SupabaseClient } from "@supabase/supabase-js";
import type { CreateOrderInput, Order, OrderItem } from "@/types/order";

export async function getOrders(supabase: SupabaseClient, userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`주문 목록을 불러오지 못했습니다: ${error.message}`);
  }

  return (data ?? []) as Order[];
}

export async function getOrderById(
  supabase: SupabaseClient,
  userId: string,
  orderId: number,
): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    throw new Error(`주문 정보를 불러오지 못했습니다: ${error.message}`);
  }

  return (data as Order | null) ?? null;
}

export async function getOrderItems(
  supabase: SupabaseClient,
  orderId: number,
): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`주문 상품 목록을 불러오지 못했습니다: ${error.message}`);
  }

  return (data ?? []) as OrderItem[];
}

export async function getOrderByStripeSessionId(
  supabase: SupabaseClient,
  userId: string,
  stripeSessionId: string,
): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .eq("stripe_session_id", stripeSessionId)
    .maybeSingle();

  if (error) {
    throw new Error(`주문 정보를 확인하지 못했습니다: ${error.message}`);
  }

  return (data as Order | null) ?? null;
}

export async function createOrderFromCart(
  supabase: SupabaseClient,
  userId: string,
  input: CreateOrderInput,
): Promise<Order> {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      stripe_session_id: input.stripe_session_id,
      total_price: input.total_price,
      status: input.status,
    })
    .select("*")
    .single();

  if (orderError || !order) {
    throw new Error(`주문 생성에 실패했습니다: ${orderError?.message ?? "알 수 없는 오류"}`);
  }

  const orderRow = order as Order;

  const { error: itemsError } = await supabase.from("order_items").insert(
    input.items.map((item) => ({
      order_id: orderRow.id,
      product_id: item.product_id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      thumbnail: item.thumbnail,
    })),
  );

  if (itemsError) {
    throw new Error(`주문 상품 저장에 실패했습니다: ${itemsError.message}`);
  }

  return orderRow;
}

export function getOrderTotal(orderItems: OrderItem[]): number {
  return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

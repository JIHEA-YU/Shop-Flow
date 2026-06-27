export type OrderStatus = "pending" | "paid" | "cancelled" | "refunded";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  cancelled: "취소됨",
  refunded: "환불됨",
};

export const ORDER_STATUS_BADGE_VARIANT: Record<
  OrderStatus,
  "default" | "secondary" | "destructive"
> = {
  pending: "secondary",
  paid: "default",
  cancelled: "destructive",
  refunded: "destructive",
};

export interface Order {
  id: number;
  user_id: string;
  stripe_session_id: string | null;
  total_price: number;
  status: OrderStatus;
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string | null;
  created_at: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export interface CreateOrderItemInput {
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string | null;
}

export interface CreateOrderInput {
  stripe_session_id: string;
  total_price: number;
  status: OrderStatus;
  items: CreateOrderItemInput[];
}

export type ConfirmOrderResult =
  | { status: "created"; order: Order }
  | { status: "already_exists"; order: Order }
  | { status: "payment_not_completed" }
  | { status: "invalid_session" }
  | { status: "error"; message: string };

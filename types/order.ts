export interface Order {
  id: number;
  user_id: string;
  stripe_session_id: string | null;
  total_price: number;
  status: "pending" | "paid" | "cancelled" | "refunded";
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

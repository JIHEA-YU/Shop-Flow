export interface CartItem {
  id: number;
  user_id: string;
  product_id: number;
  title: string;
  price: number;
  thumbnail: string | null;
  quantity: number;
  created_at: string;
  updated_at: string;
}

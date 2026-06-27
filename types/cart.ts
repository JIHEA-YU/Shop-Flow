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

export interface AddCartItemInput {
  product_id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface UpdateCartItemQuantityInput {
  product_id: number;
  quantity: number;
}

export type AddCartItemResult =
  { status: "added" } | { status: "already_exists" } | { status: "error"; message: string };

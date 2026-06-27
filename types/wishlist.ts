export interface WishlistItem {
  id: number;
  user_id: string;
  product_id: number;
  title: string | null;
  price: number | null;
  thumbnail: string | null;
  created_at: string;
}

export interface AddWishlistItemInput {
  product_id: number;
  title: string;
  price: number;
  thumbnail: string;
}

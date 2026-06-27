export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id: number | string) => `/products/${id}`,
  WISHLIST: "/wishlist",
  CART: "/cart",
  CHECKOUT: "/checkout",
  CHECKOUT_SUCCESS: "/checkout/success",
  ORDERS: "/orders",
  ORDER_DETAIL: (id: number | string) => `/orders/${id}`,
  LOGIN: "/login",
  SIGNUP: "/signup",
  MYPAGE: "/mypage",
} as const;

interface ProductsQuery {
  q?: string;
  category?: string;
}

export function buildProductsUrl({ q, category }: ProductsQuery): string {
  const searchParams = new URLSearchParams();

  if (q) {
    searchParams.set("q", q);
  }

  if (category) {
    searchParams.set("category", category);
  }

  const query = searchParams.toString();
  return query ? `${ROUTES.PRODUCTS}?${query}` : ROUTES.PRODUCTS;
}

export function isSafeRedirectPath(path: string | null | undefined): path is string {
  return !!path && path.startsWith("/") && !path.startsWith("//");
}

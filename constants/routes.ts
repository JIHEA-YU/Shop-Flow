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

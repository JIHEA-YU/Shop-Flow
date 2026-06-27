import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { ROUTES } from "@/constants/routes";

// Next.js 16부터 middleware.ts가 proxy.ts로 변경됨 (PROJECT_SPEC.md의 middleware.ts 역할을 대신함)
const PROTECTED_PATHS = [
  ROUTES.WISHLIST,
  ROUTES.CART,
  ROUTES.CHECKOUT,
  ROUTES.ORDERS,
  ROUTES.MYPAGE,
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  if (!user && isProtectedPath(request.nextUrl.pathname)) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

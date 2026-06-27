import { NextResponse } from "next/server";

// Next.js 16부터 middleware.ts가 proxy.ts로 변경됨 (PROJECT_SPEC.md의 middleware.ts 역할을 대신함)
// TODO: 인증 보호 라우트 구현 (PROJECT_SPEC.md 5. 인증이 필요한 페이지, 9.2)
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/wishlist",
    "/cart",
    "/checkout",
    "/checkout/success",
    "/orders",
    "/orders/:id",
    "/mypage",
  ],
};

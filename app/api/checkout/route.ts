import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/stripe";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { getCartItems } from "@/services/cart-service";
import { ROUTES } from "@/constants/routes";
import type { CartItem } from "@/types/cart";

// Stripe SDK는 Edge runtime의 Node.js API 제약과 충돌할 수 있어 Node.js runtime으로 고정한다.
export const runtime = "nodejs";

function buildLineItems(cartItems: CartItem[]): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return cartItems.map((item) => {
    if (typeof item.price !== "number" || !Number.isFinite(item.price)) {
      throw new Error(`상품 가격이 올바르지 않습니다: ${item.title}`);
    }

    const unitAmount = Math.round(item.price * 100);

    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.thumbnail ? [item.thumbnail] : undefined,
        },
        unit_amount: unitAmount,
      },
      quantity: item.quantity,
    };
  });
}

export async function POST() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_SITE_URL 환경 변수가 설정되어 있지 않습니다." },
      { status: 500 },
    );
  }

  let cartItems: CartItem[];
  try {
    const supabase = await createClient();
    cartItems = await getCartItems(supabase, user.id);
  } catch {
    return NextResponse.json({ error: "장바구니를 불러오지 못했습니다." }, { status: 500 });
  }

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "장바구니가 비어 있습니다." }, { status: 400 });
  }

  try {
    const lineItems = buildLineItems(cartItems);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}${ROUTES.CHECKOUT_SUCCESS}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${ROUTES.CHECKOUT}`,
      metadata: {
        user_id: user.id,
        product_ids: cartItems.map((item) => item.product_id).join(","),
        cart_item_ids: cartItems.map((item) => item.id).join(","),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "결제 페이지 생성에 실패했습니다." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "결제 세션 생성에 실패했습니다.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

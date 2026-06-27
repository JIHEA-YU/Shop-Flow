import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/stripe";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { clearCart, getCartItems, getCartTotal } from "@/services/cart-service";
import { createOrderFromCart, getOrderByStripeSessionId } from "@/services/order-service";
import type { CartItem } from "@/types/cart";

interface ConfirmOrderRequestBody {
  sessionId?: string;
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ status: "error", error: "로그인이 필요합니다." }, { status: 401 });
  }

  let sessionId: string | undefined;
  try {
    const body = (await request.json()) as ConfirmOrderRequestBody;
    sessionId = body.sessionId;
  } catch {
    sessionId = undefined;
  }

  if (!sessionId) {
    return NextResponse.json(
      { status: "error", error: "session_id가 필요합니다." },
      { status: 400 },
    );
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json(
      { status: "invalid_session", error: "결제 세션을 확인할 수 없습니다." },
      { status: 400 },
    );
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json(
      { status: "payment_not_completed", error: "결제가 완료되지 않았습니다." },
      { status: 400 },
    );
  }

  if (session.metadata?.user_id !== user.id) {
    return NextResponse.json(
      { status: "error", error: "본인의 결제 세션이 아닙니다." },
      { status: 403 },
    );
  }

  const supabase = await createClient();

  const existingOrder = await getOrderByStripeSessionId(supabase, user.id, sessionId);
  if (existingOrder) {
    return NextResponse.json({ status: "already_exists", orderId: existingOrder.id });
  }

  let cartItems: CartItem[];
  try {
    cartItems = await getCartItems(supabase, user.id);
  } catch {
    return NextResponse.json(
      { status: "error", error: "장바구니를 불러오지 못했습니다." },
      { status: 500 },
    );
  }

  if (cartItems.length === 0) {
    return NextResponse.json(
      { status: "error", error: "장바구니가 비어 있어 주문을 생성할 수 없습니다." },
      { status: 400 },
    );
  }

  const expectedAmountTotal = cartItems.reduce(
    (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
    0,
  );

  if (session.amount_total !== expectedAmountTotal) {
    return NextResponse.json(
      { status: "error", error: "결제 금액이 일치하지 않습니다." },
      { status: 400 },
    );
  }

  try {
    const order = await createOrderFromCart(supabase, user.id, {
      stripe_session_id: sessionId,
      total_price: getCartTotal(cartItems),
      status: "paid",
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        thumbnail: item.thumbnail,
      })),
    });

    await clearCart(supabase, user.id);

    return NextResponse.json({ status: "created", orderId: order.id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "주문 저장에 실패했습니다.";
    return NextResponse.json({ status: "error", error: message }, { status: 500 });
  }
}

// TODO: 실서비스에서는 checkout.session.completed webhook으로 주문 저장을 더 안정적으로 처리할 수 있다.
// 현재 MVP는 /checkout/success 방문 시점에 이 API를 호출해 주문을 저장한다.

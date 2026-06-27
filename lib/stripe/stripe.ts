import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    "STRIPE_SECRET_KEY 환경 변수가 설정되어 있지 않습니다. .env.local에 STRIPE_SECRET_KEY를 추가해주세요.",
  );
}

export const stripe = new Stripe(stripeSecretKey);

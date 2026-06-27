import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { session_id } = await searchParams;

  // TODO: 다음 단계에서 session_id로 결제 정보를 확인하고 orders/order_items를 저장한 뒤 장바구니를 비운다.

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        결제가 완료되었습니다.
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        결제가 정상적으로 처리되었습니다. 주문 내역은 다음 단계에서 확인할 수 있도록 구현할
        예정입니다.
      </p>
      {session_id && (
        <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
          결제 세션 ID: {session_id}
        </p>
      )}
      <div className="mt-6 flex gap-4">
        <Link
          href={ROUTES.ORDERS}
          className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
        >
          주문 내역 보기
        </Link>
        <Link
          href={ROUTES.PRODUCTS}
          className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
        >
          상품 목록으로
        </Link>
      </div>
    </div>
  );
}

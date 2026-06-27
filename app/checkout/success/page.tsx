import Link from "next/link";
import { ConfirmOrderOnSuccess } from "@/components/checkout/ConfirmOrderOnSuccess";
import { ROUTES } from "@/constants/routes";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">결제 결과</h1>

      <div className="mt-6">
        {session_id ? (
          <ConfirmOrderOnSuccess sessionId={session_id} />
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-red-600 dark:text-red-400">
              결제 세션 정보를 찾을 수 없습니다.
            </p>
            <Link
              href={ROUTES.CART}
              className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
            >
              장바구니로 돌아가기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

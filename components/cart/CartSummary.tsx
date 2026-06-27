"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface CartSummaryProps {
  itemCount: number;
  total: number;
}

export function CartSummary({ itemCount, total }: CartSummaryProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
        <span>상품 {itemCount}개</span>
      </div>
      <div className="flex items-center justify-between text-base font-semibold text-zinc-950 dark:text-zinc-50">
        <span>총 합계</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button
        type="button"
        onClick={() => router.push(ROUTES.CHECKOUT)}
        disabled={itemCount === 0}
      >
        결제하기
      </Button>
    </div>
  );
}

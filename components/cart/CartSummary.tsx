"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  itemCount: number;
  total: number;
}

export function CartSummary({ itemCount, total }: CartSummaryProps) {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-300">
        <span>상품 {itemCount}개</span>
      </div>
      <div className="flex items-center justify-between text-base font-semibold text-zinc-950 dark:text-zinc-50">
        <span>총 합계</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Button type="button" onClick={() => setShowNotice(true)} disabled={itemCount === 0}>
        결제하기
      </Button>
      {showNotice && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          다음 단계에서 결제 기능을 구현할 예정입니다.
        </p>
      )}
    </div>
  );
}

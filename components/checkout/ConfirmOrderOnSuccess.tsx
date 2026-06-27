"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

interface ConfirmOrderOnSuccessProps {
  sessionId: string;
}

interface ConfirmApiResponse {
  status: "created" | "already_exists" | "payment_not_completed" | "invalid_session" | "error";
  orderId?: number;
  error?: string;
}

type ViewState =
  | { phase: "loading" }
  | { phase: "success"; orderId: number; alreadyExists: boolean }
  | { phase: "error"; message: string };

export function ConfirmOrderOnSuccess({ sessionId }: ConfirmOrderOnSuccessProps) {
  const [state, setState] = useState<ViewState>({ phase: "loading" });
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (hasRequestedRef.current) {
      return;
    }
    hasRequestedRef.current = true;

    async function confirmOrder() {
      try {
        const response = await fetch("/api/orders/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = (await response.json()) as ConfirmApiResponse;

        if (!response.ok || (data.status !== "created" && data.status !== "already_exists")) {
          setState({
            phase: "error",
            message: data.error ?? "주문 처리 중 오류가 발생했습니다.",
          });
          return;
        }

        if (data.orderId == null) {
          setState({ phase: "error", message: "주문 정보를 확인하지 못했습니다." });
          return;
        }

        setState({
          phase: "success",
          orderId: data.orderId,
          alreadyExists: data.status === "already_exists",
        });
      } catch {
        setState({ phase: "error", message: "주문 처리 중 오류가 발생했습니다." });
      }
    }

    void confirmOrder();
  }, [sessionId]);

  if (state.phase === "loading") {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">주문 정보를 확인하는 중입니다...</p>
    );
  }

  if (state.phase === "error") {
    return <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        {state.alreadyExists
          ? "이미 처리된 주문입니다."
          : "결제가 완료되었고 주문이 저장되었습니다."}
      </p>
      <div className="flex gap-3">
        <Button render={<Link href={ROUTES.ORDER_DETAIL(state.orderId)} />}>주문 상세 보기</Button>
        <Button variant="outline" render={<Link href={ROUTES.PRODUCTS} />}>
          상품 목록으로
        </Button>
      </div>
    </div>
  );
}

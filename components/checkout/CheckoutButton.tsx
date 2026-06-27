"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CheckoutApiResponse {
  url?: string;
  error?: string;
}

export function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = (await response.json()) as CheckoutApiResponse;

      if (!response.ok || !data.url) {
        setError(data.error ?? "결제 페이지로 이동하지 못했습니다.");
        setIsLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("결제 페이지로 이동하지 못했습니다.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <Button type="button" onClick={handleClick} disabled={isLoading} className="w-full">
        {isLoading ? "이동 중..." : "Stripe로 결제하기"}
      </Button>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

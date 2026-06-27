"use client";

import { useState, type MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { addCartItem } from "@/services/cart-service";
import { ROUTES } from "@/constants/routes";

interface AddToCartButtonProps {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  userId: string | null;
  className?: string;
}

export function AddToCartButton({
  productId,
  title,
  price,
  thumbnail,
  userId,
  className,
}: AddToCartButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    tone: "success" | "info" | "error";
  } | null>(null);

  async function handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!userId) {
      router.push(`${ROUTES.LOGIN}?redirectTo=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const result = await addCartItem(supabase, userId, {
        product_id: productId,
        title,
        price,
        thumbnail,
      });

      if (result.status === "added") {
        setMessage({ text: "장바구니에 담았습니다.", tone: "success" });
      } else if (result.status === "already_exists") {
        setMessage({ text: "이미 장바구니에 담긴 상품입니다.", tone: "info" });
      } else {
        setMessage({ text: "장바구니 추가 중 오류가 발생했습니다.", tone: "error" });
      }
    } catch {
      setMessage({ text: "장바구니 추가 중 오류가 발생했습니다.", tone: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <Button type="button" onClick={handleClick} disabled={isLoading} className={className}>
        <ShoppingCart className="size-4" />
        장바구니 담기
      </Button>
      {message && (
        <p
          className={
            message.tone === "success"
              ? "text-xs text-green-600 dark:text-green-400"
              : message.tone === "info"
                ? "text-xs text-zinc-500 dark:text-zinc-400"
                : "text-xs text-red-600 dark:text-red-400"
          }
        >
          {message.text}
        </p>
      )}
    </div>
  );
}

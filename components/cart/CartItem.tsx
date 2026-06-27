"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { removeCartItem, updateCartItemQuantity } from "@/services/cart-service";
import { ROUTES } from "@/constants/routes";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  userId: string;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItem({ item, userId, onQuantityChange, onRemove }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleQuantityChange(nextQuantity: number) {
    setIsUpdating(true);
    setError(null);

    try {
      const supabase = createClient();

      if (nextQuantity < 1) {
        await removeCartItem(supabase, userId, item.product_id);
        onRemove(item.product_id);
        return;
      }

      await updateCartItemQuantity(supabase, userId, item.product_id, nextQuantity);
      onQuantityChange(item.product_id, nextQuantity);
    } catch {
      setError("수량 변경에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleRemove() {
    setIsUpdating(true);
    setError(null);

    try {
      const supabase = createClient();
      await removeCartItem(supabase, userId, item.product_id);
      onRemove(item.product_id);
    } catch {
      setError("삭제에 실패했습니다.");
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex items-center gap-4 border-b border-zinc-200 py-4 last:border-b-0 dark:border-zinc-800">
      <Link
        href={ROUTES.PRODUCT_DETAIL(item.product_id)}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900"
      >
        {item.thumbnail && (
          <Image src={item.thumbnail} alt={item.title} fill sizes="80px" className="object-cover" />
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <Link
          href={ROUTES.PRODUCT_DETAIL(item.product_id)}
          className="line-clamp-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50"
        >
          {item.title}
        </Link>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">${item.price.toFixed(2)}</span>
        {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="수량 감소"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isUpdating}
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-6 text-center text-sm text-zinc-950 dark:text-zinc-50">
          {item.quantity}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="수량 증가"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isUpdating}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="w-20 text-right text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="삭제"
        onClick={handleRemove}
        disabled={isUpdating}
      >
        <Trash2 className="size-4 text-zinc-500 dark:text-zinc-400" />
      </Button>
    </div>
  );
}

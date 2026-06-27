"use client";

import { useState } from "react";
import Link from "next/link";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { ROUTES } from "@/constants/routes";
import { getCartTotal } from "@/services/cart-service";
import type { CartItem as CartItemType } from "@/types/cart";

interface CartListProps {
  userId: string;
  items: CartItemType[];
}

export function CartList({ userId, items: initialItems }: CartListProps) {
  const [items, setItems] = useState(initialItems);

  function handleQuantityChange(productId: number, quantity: number) {
    setItems((current) =>
      current.map((item) => (item.product_id === productId ? { ...item, quantity } : item)),
    );
  }

  function handleRemove(productId: number) {
    setItems((current) => current.filter((item) => item.product_id !== productId));
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">장바구니가 비어 있습니다.</p>
        <Link
          href={ROUTES.PRODUCTS}
          className="text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
        >
          상품 목록 보러가기
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="flex flex-col rounded-lg border border-zinc-200 px-4 dark:border-zinc-800">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            userId={userId}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        ))}
      </div>
      <CartSummary itemCount={items.length} total={getCartTotal(items)} />
    </div>
  );
}

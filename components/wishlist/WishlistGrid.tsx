"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ROUTES } from "@/constants/routes";
import type { WishlistItem } from "@/types/wishlist";

interface WishlistGridProps {
  userId: string;
  items: WishlistItem[];
}

export function WishlistGrid({ userId, items: initialItems }: WishlistGridProps) {
  const [items, setItems] = useState(initialItems);

  function handleToggle(productId: number, wishlisted: boolean) {
    if (!wishlisted) {
      setItems((current) => current.filter((item) => item.product_id !== productId));
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">찜한 상품이 없습니다.</p>
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
        >
          <div className="absolute top-2 right-2 z-10">
            <WishlistButton
              productId={item.product_id}
              title={item.title ?? ""}
              price={item.price ?? 0}
              thumbnail={item.thumbnail ?? ""}
              initialWishlisted
              userId={userId}
              onToggle={(wishlisted) => handleToggle(item.product_id, wishlisted)}
            />
          </div>
          <Link
            href={ROUTES.PRODUCT_DETAIL(item.product_id)}
            className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-900"
          >
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title ?? "상품 이미지"}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            )}
          </Link>
          <div className="flex flex-1 flex-col gap-2 p-3">
            <Link
              href={ROUTES.PRODUCT_DETAIL(item.product_id)}
              className="line-clamp-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50"
            >
              {item.title}
            </Link>
            {item.price != null && (
              <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                ${item.price.toFixed(2)}
              </span>
            )}
            <div className="mt-auto">
              <AddToCartButton
                productId={item.product_id}
                title={item.title ?? ""}
                price={item.price ?? 0}
                thumbnail={item.thumbnail ?? ""}
                userId={userId}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

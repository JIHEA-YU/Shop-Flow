"use client";

import { useState, type MouseEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { toggleWishlistItem } from "@/services/wishlist-service";
import { ROUTES } from "@/constants/routes";

interface WishlistButtonProps {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  initialWishlisted?: boolean;
  userId: string | null;
}

export function WishlistButton({
  productId,
  title,
  price,
  thumbnail,
  initialWishlisted = false,
  userId,
}: WishlistButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (!userId) {
      router.push(`${ROUTES.LOGIN}?redirectTo=${encodeURIComponent(pathname)}`);
      return;
    }

    setIsLoading(true);
    setError(null);
    const previous = isWishlisted;
    setIsWishlisted(!previous);

    try {
      const supabase = createClient();
      const nowWishlisted = await toggleWishlistItem(supabase, userId, {
        product_id: productId,
        title,
        price,
        thumbnail,
      });
      setIsWishlisted(nowWishlisted);
    } catch {
      setIsWishlisted(previous);
      setError("찜 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={isWishlisted ? "찜 해제" : "찜하기"}
        onClick={handleClick}
        disabled={isLoading}
      >
        <Heart className={isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-500"} />
      </Button>
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

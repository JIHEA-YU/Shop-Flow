import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { ROUTES } from "@/constants/routes";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={ROUTES.PRODUCT_DETAIL(product.id)}
      className="group flex flex-col overflow-hidden rounded-lg border border-zinc-200 transition-shadow hover:shadow-md dark:border-zinc-800"
    >
      <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
          {product.category}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
          {product.title}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}

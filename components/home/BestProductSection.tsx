import { HomeProductCard } from "@/components/home/HomeProductCard";
import type { Product } from "@/types/product";

interface BestProductSectionProps {
  products: Product[];
  hasError: boolean;
}

export function BestProductSection({ products, hasError }: BestProductSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Best Products</h2>
      {hasError ? (
        <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          인기 상품을 불러오지 못했습니다.
        </p>
      ) : products.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          표시할 상품이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <HomeProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

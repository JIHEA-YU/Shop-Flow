import { getProducts } from "@/lib/dummyjson/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { Product } from "@/types/product";

async function loadProducts(): Promise<{ products: Product[]; hasError: boolean }> {
  try {
    const { products } = await getProducts();
    return { products, hasError: false };
  } catch {
    return { products: [], hasError: true };
  }
}

export default async function ProductsPage() {
  const { products, hasError } = await loadProducts();

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Products</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        DummyJSON에서 가져온 상품 목록입니다.
      </p>
      <div className="mt-6">
        {hasError ? (
          <p className="text-sm text-red-600 dark:text-red-400">상품을 불러오지 못했습니다.</p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}

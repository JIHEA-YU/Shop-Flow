import Link from "next/link";
import { getProducts, searchProducts } from "@/lib/dummyjson/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchBar } from "@/components/product/SearchBar";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function loadProducts(query: string): Promise<{ products: Product[]; hasError: boolean }> {
  try {
    const { products } = query ? await searchProducts(query) : await getProducts();
    return { products, hasError: false };
  } catch {
    return { products: [], hasError: true };
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const { products, hasError } = await loadProducts(query);

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Products</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        DummyJSON에서 가져온 상품 목록입니다.
      </p>

      <div className="mt-6">
        <SearchBar defaultValue={query} />
      </div>

      <div className="mt-6">
        {hasError ? (
          <p className="text-sm text-red-600 dark:text-red-400">상품을 불러오지 못했습니다.</p>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {query
                  ? `'${query}' 검색 결과 (${products.length}개)`
                  : `전체 상품 (${products.length}개)`}
              </p>
              {query && (
                <Link
                  href={ROUTES.PRODUCTS}
                  className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
                >
                  전체 상품 보기
                </Link>
              )}
            </div>
            <ProductGrid products={products} />
          </>
        )}
      </div>
    </div>
  );
}

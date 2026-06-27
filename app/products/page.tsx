import Link from "next/link";
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
  getProductCategories,
} from "@/lib/dummyjson/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SearchBar } from "@/components/product/SearchBar";
import { ProductFilter, formatCategoryLabel } from "@/components/product/ProductFilter";
import { ROUTES, buildProductsUrl } from "@/constants/routes";
import type { Product } from "@/types/product";

interface ProductsPageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

async function loadProducts(
  query: string,
  category: string,
): Promise<{ products: Product[]; hasError: boolean }> {
  try {
    let products: Product[];

    if (query && category) {
      const { products: searched } = await searchProducts(query);
      products = searched.filter((product) => product.category === category);
    } else if (query) {
      ({ products } = await searchProducts(query));
    } else if (category) {
      ({ products } = await getProductsByCategory(category));
    } else {
      ({ products } = await getProducts());
    }

    return { products, hasError: false };
  } catch {
    return { products: [], hasError: true };
  }
}

async function loadCategories(): Promise<{ categories: string[]; hasError: boolean }> {
  try {
    const categories = await getProductCategories();
    return { categories, hasError: false };
  } catch {
    return { categories: [], hasError: true };
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { q, category: categoryParam } = await searchParams;
  const query = q?.trim() ?? "";
  const category = categoryParam?.trim() ?? "";

  const [{ products, hasError }, { categories, hasError: categoriesHasError }] = await Promise.all([
    loadProducts(query, category),
    loadCategories(),
  ]);

  const statusText = [
    query ? `'${query}' 검색 결과` : null,
    category ? `${formatCategoryLabel(category)} 카테고리` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Products</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        DummyJSON에서 가져온 상품 목록입니다.
      </p>

      <div className="mt-6">
        <SearchBar defaultValue={query} category={category} />
      </div>

      <div className="mt-4">
        {categoriesHasError ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            카테고리 목록을 불러오지 못했습니다.
          </p>
        ) : (
          <ProductFilter categories={categories} selectedCategory={category} query={query} />
        )}
      </div>

      <div className="mt-6">
        {hasError ? (
          <p className="text-sm text-red-600 dark:text-red-400">상품을 불러오지 못했습니다.</p>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {statusText || "전체 상품"} ({products.length}개)
              </p>
              <div className="flex gap-3">
                {query && (
                  <Link
                    href={buildProductsUrl({ category })}
                    className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
                  >
                    검색 초기화
                  </Link>
                )}
                {(query || category) && (
                  <Link
                    href={ROUTES.PRODUCTS}
                    className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
                  >
                    전체 초기화
                  </Link>
                )}
              </div>
            </div>
            <ProductGrid
              products={products}
              emptyMessage={query || category ? "조건에 맞는 상품이 없습니다." : undefined}
            />
          </>
        )}
      </div>
    </div>
  );
}

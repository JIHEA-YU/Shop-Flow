import Link from "next/link";
import { getProductCategories, getProducts } from "@/lib/dummyjson/products";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { HomeCategorySelector } from "@/components/home/HomeCategorySelector";
import { BestProductSection } from "@/components/home/BestProductSection";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types/product";

const BEST_PRODUCT_COUNT = 8;
const HOME_CATEGORY_COUNT = 10;

async function loadBestProducts(): Promise<{ products: Product[]; hasError: boolean }> {
  try {
    const { products } = await getProducts();
    const bestProducts = [...products]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, BEST_PRODUCT_COUNT);
    return { products: bestProducts, hasError: false };
  } catch {
    return { products: [], hasError: true };
  }
}

async function loadCategories(): Promise<{ categories: string[]; hasError: boolean }> {
  try {
    const categories = await getProductCategories();
    return { categories: categories.slice(0, HOME_CATEGORY_COUNT), hasError: false };
  } catch {
    return { categories: [], hasError: true };
  }
}

export default async function Home() {
  const [
    { products: bestProducts, hasError: productsHasError },
    { categories, hasError: categoriesHasError },
  ] = await Promise.all([loadBestProducts(), loadCategories()]);

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-8">
      <section className="flex flex-col items-center gap-3 py-8 text-center">
        <h1 className="text-3xl font-bold text-zinc-950 sm:text-4xl dark:text-zinc-50">ShopFlow</h1>
        <div className="mt-4 w-full">
          <HomeSearchBar />
        </div>
      </section>

      <section className="mt-6">
        {categoriesHasError ? (
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            카테고리 목록을 불러오지 못했습니다.
          </p>
        ) : (
          <HomeCategorySelector categories={categories} />
        )}
      </section>

      <section className="mt-12">
        <BestProductSection products={bestProducts} hasError={productsHasError} />
      </section>

      <div className="mt-10 flex justify-center">
        <Button size="lg" nativeButton={false} render={<Link href={ROUTES.PRODUCTS} />}>
          상품 더 둘러보기
        </Button>
      </div>
    </div>
  );
}

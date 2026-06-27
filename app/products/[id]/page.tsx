import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/dummyjson/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ROUTES } from "@/constants/routes";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { isWishlisted } from "@/services/wishlist-service";
import type { Product } from "@/types/product";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

async function loadProduct(id: number): Promise<{ product: Product | null; hasError: boolean }> {
  try {
    const product = await getProductById(id);
    return { product, hasError: false };
  } catch {
    return { product: null, hasError: true };
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const { product, hasError } = await loadProduct(numericId);

  if (hasError) {
    return (
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
        <Link
          href={ROUTES.PRODUCTS}
          className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
        >
          ← 상품 목록으로
        </Link>
        <p className="mt-6 text-sm text-red-600 dark:text-red-400">상품을 불러오지 못했습니다.</p>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const user = await getCurrentUser();
  let initialWishlisted = false;

  if (user) {
    try {
      const supabase = await createClient();
      initialWishlisted = await isWishlisted(supabase, user.id, product.id);
    } catch {
      initialWishlisted = false;
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <Link
        href={ROUTES.PRODUCTS}
        className="text-sm text-zinc-500 hover:underline dark:text-zinc-400"
      >
        ← 상품 목록으로
      </Link>
      <div className="mt-6">
        <ProductDetail
          product={product}
          initialWishlisted={initialWishlisted}
          userId={user?.id ?? null}
        />
      </div>
    </div>
  );
}

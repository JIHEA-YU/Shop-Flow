import type { Product } from "@/types/product";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { WishlistButton } from "@/components/wishlist/WishlistButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const isOutOfStock = product.stock <= 0;
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <ProductImageGallery
        title={product.title}
        thumbnail={product.thumbnail}
        images={product.images}
      />

      <div className="flex flex-col gap-4">
        <div>
          <span className="text-xs font-medium text-zinc-500 uppercase dark:text-zinc-400">
            {product.category}
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
            {product.title}
          </h1>
          {product.brand && (
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{product.brand}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
            ${discountedPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <>
              <span className="text-sm text-zinc-400 line-through dark:text-zinc-500">
                ${product.price.toFixed(2)}
              </span>
              <Badge variant="secondary">{product.discountPercentage.toFixed(0)}% OFF</Badge>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
          <span>★ {product.rating.toFixed(1)}</span>
          <Badge variant={isOutOfStock ? "destructive" : "secondary"}>
            {isOutOfStock ? "Out of stock" : `Stock: ${product.stock}`}
          </Badge>
          {product.availabilityStatus && <span>{product.availabilityStatus}</span>}
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-300">{product.description}</p>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <Button type="button" disabled>
              장바구니 담기
            </Button>
            <WishlistButton />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            로그인 후 이용할 수 있는 기능입니다.
          </p>
        </div>

        {(product.shippingInformation || product.warrantyInformation || product.returnPolicy) && (
          <dl className="flex flex-col gap-2 border-t border-zinc-200 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
            {product.shippingInformation && (
              <div className="flex gap-2">
                <dt className="font-medium text-zinc-950 dark:text-zinc-50">배송 정보</dt>
                <dd>{product.shippingInformation}</dd>
              </div>
            )}
            {product.warrantyInformation && (
              <div className="flex gap-2">
                <dt className="font-medium text-zinc-950 dark:text-zinc-50">보증 정보</dt>
                <dd>{product.warrantyInformation}</dd>
              </div>
            )}
            {product.returnPolicy && (
              <div className="flex gap-2">
                <dt className="font-medium text-zinc-950 dark:text-zinc-50">반품 정책</dt>
                <dd>{product.returnPolicy}</dd>
              </div>
            )}
          </dl>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">리뷰</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {product.reviews.map((review) => (
                <li
                  key={`${review.reviewerEmail}-${review.date}`}
                  className="text-sm text-zinc-600 dark:text-zinc-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-950 dark:text-zinc-50">
                      {review.reviewerName}
                    </span>
                    <span>★ {review.rating}</span>
                  </div>
                  <p className="mt-1">{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

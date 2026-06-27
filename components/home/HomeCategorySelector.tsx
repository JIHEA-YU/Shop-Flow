import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { formatCategoryLabel } from "@/components/product/ProductFilter";
import { ROUTES, buildProductsUrl } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface HomeCategorySelectorProps {
  categories: string[];
}

export function HomeCategorySelector({ categories }: HomeCategorySelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible">
      <Link
        href={ROUTES.PRODUCTS}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
      >
        전체
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={buildProductsUrl({ category })}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
        >
          {formatCategoryLabel(category)}
        </Link>
      ))}
    </div>
  );
}

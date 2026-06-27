import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { buildProductsUrl } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  query: string;
}

export function formatCategoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ProductFilter({ categories, selectedCategory, query }: ProductFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
      <Link
        href={buildProductsUrl({ q: query })}
        className={cn(
          buttonVariants({ variant: selectedCategory ? "outline" : "default", size: "sm" }),
          "shrink-0",
        )}
      >
        전체
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={buildProductsUrl({ q: query, category })}
          className={cn(
            buttonVariants({
              variant: category === selectedCategory ? "default" : "outline",
              size: "sm",
            }),
            "shrink-0",
          )}
        >
          {formatCategoryLabel(category)}
        </Link>
      ))}
    </div>
  );
}

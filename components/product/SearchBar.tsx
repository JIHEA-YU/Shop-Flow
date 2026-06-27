import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  defaultValue?: string;
  category?: string;
}

export function SearchBar({ defaultValue, category }: SearchBarProps) {
  return (
    <form action={ROUTES.PRODUCTS} method="get" className="flex gap-2">
      {category && <input type="hidden" name="category" value={category} />}
      <Input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder="상품명을 검색해보세요"
        className="flex-1"
      />
      <Button type="submit">검색</Button>
    </form>
  );
}

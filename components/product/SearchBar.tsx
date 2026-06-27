import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  defaultValue?: string;
}

export function SearchBar({ defaultValue }: SearchBarProps) {
  return (
    <form action={ROUTES.PRODUCTS} method="get" className="flex gap-2">
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

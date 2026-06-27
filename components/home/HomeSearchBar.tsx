"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildProductsUrl } from "@/constants/routes";

export function HomeSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(buildProductsUrl({ q: trimmed || undefined }));
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl gap-2">
      <Input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="찾고 싶은 상품을 검색해보세요"
        className="h-12 flex-1 text-base"
      />
      <Button type="submit" size="lg" className="h-12 px-6">
        검색
      </Button>
    </form>
  );
}

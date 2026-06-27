import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export default function ProductNotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
        상품을 찾을 수 없습니다.
      </h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        요청한 상품이 존재하지 않거나 삭제되었습니다.
      </p>
      <Link
        href={ROUTES.PRODUCTS}
        className="mt-6 inline-block text-sm font-medium text-zinc-950 underline dark:text-zinc-50"
      >
        상품 목록으로 돌아가기
      </Link>
    </div>
  );
}

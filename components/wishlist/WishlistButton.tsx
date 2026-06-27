import { Button } from "@/components/ui/button";

// TODO: Supabase 찜 기능 연동 (PROJECT_SPEC.md 9.3, 18.5)
export function WishlistButton() {
  return (
    <Button type="button" variant="outline" disabled>
      찜하기
    </Button>
  );
}

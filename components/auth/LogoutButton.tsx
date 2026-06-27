"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(ROUTES.PRODUCTS);
    router.refresh();
  }

  return (
    <Button type="button" variant="ghost" size="sm" onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? "로그아웃 중..." : "Logout"}
    </Button>
  );
}

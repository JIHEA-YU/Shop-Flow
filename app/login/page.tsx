import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { ROUTES } from "@/constants/routes";

interface LoginPageProps {
  searchParams: Promise<{ redirectTo?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { redirectTo } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-sm flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Login</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        이메일과 비밀번호로 로그인하세요.
      </p>
      <div className="mt-6">
        <LoginForm redirectTo={redirectTo} />
      </div>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        계정이 없으신가요?{" "}
        <Link
          href={ROUTES.SIGNUP}
          className="font-medium text-zinc-950 underline dark:text-zinc-50"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}

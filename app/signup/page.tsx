import Link from "next/link";
import { SignupForm } from "@/components/auth/SignupForm";
import { ROUTES } from "@/constants/routes";

export default function SignupPage() {
  return (
    <div className="mx-auto w-full max-w-sm flex-1 px-4 py-8 sm:px-8">
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Sign Up</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        이메일과 비밀번호로 회원가입하세요.
      </p>
      <div className="mt-6">
        <SignupForm />
      </div>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        이미 계정이 있으신가요?{" "}
        <Link href={ROUTES.LOGIN} className="font-medium text-zinc-950 underline dark:text-zinc-50">
          로그인
        </Link>
      </p>
    </div>
  );
}

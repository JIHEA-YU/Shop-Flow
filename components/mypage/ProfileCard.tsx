interface ProfileCardProps {
  email: string;
  createdAt: string;
}

export function ProfileCard({ email, createdAt }: ProfileCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">{email}</span>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        가입일: {new Date(createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}

-- PROJECT_SPEC.md 10.3 wishlist 테이블 + 11장 RLS 정책
-- Supabase SQL Editor에서 직접 실행한다. 코드에서 자동 실행하지 않는다.

create table if not exists wishlist (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id integer not null,
  title text,
  price numeric,
  thumbnail text,
  created_at timestamptz default now(),

  unique (user_id, product_id)
);

alter table wishlist enable row level security;

drop policy if exists "Users can view their own wishlist" on wishlist;
create policy "Users can view their own wishlist"
  on wishlist for select
  using (user_id = auth.uid());

drop policy if exists "Users can insert their own wishlist items" on wishlist;
create policy "Users can insert their own wishlist items"
  on wishlist for insert
  with check (user_id = auth.uid());

drop policy if exists "Users can delete their own wishlist items" on wishlist;
create policy "Users can delete their own wishlist items"
  on wishlist for delete
  using (user_id = auth.uid());

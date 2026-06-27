-- PROJECT_SPEC.md 10.4 cart_items 테이블 + 11장 RLS 정책
-- Supabase SQL Editor에서 직접 실행한다. 코드에서 자동 실행하지 않는다.

create table if not exists cart_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id integer not null,
  title text,
  price numeric,
  thumbnail text,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  unique (user_id, product_id)
);

create index if not exists cart_items_user_id_idx on cart_items (user_id);

alter table cart_items enable row level security;

drop policy if exists "Users can view their own cart items" on cart_items;
create policy "Users can view their own cart items"
  on cart_items for select
  using (user_id = auth.uid());

drop policy if exists "Users can insert their own cart items" on cart_items;
create policy "Users can insert their own cart items"
  on cart_items for insert
  with check (user_id = auth.uid());

drop policy if exists "Users can update their own cart items" on cart_items;
create policy "Users can update their own cart items"
  on cart_items for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "Users can delete their own cart items" on cart_items;
create policy "Users can delete their own cart items"
  on cart_items for delete
  using (user_id = auth.uid());

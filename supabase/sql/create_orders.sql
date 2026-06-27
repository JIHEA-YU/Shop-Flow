-- PROJECT_SPEC.md 10.5 orders/order_items 테이블 + 11장 RLS 정책
-- Supabase SQL Editor에서 직접 실행한다. 코드에서 자동 실행하지 않는다.

create table if not exists orders (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_session_id text,
  total_price numeric not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'cancelled', 'refunded')),
  created_at timestamptz default now(),

  unique (stripe_session_id)
);

create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_id integer not null,
  title text not null,
  price numeric not null,
  quantity integer not null check (quantity > 0),
  thumbnail text,
  created_at timestamptz default now()
);

create index if not exists orders_user_id_idx on orders (user_id);
create index if not exists order_items_order_id_idx on order_items (order_id);

alter table orders enable row level security;
alter table order_items enable row level security;

drop policy if exists "Users can view their own orders" on orders;
create policy "Users can view their own orders"
  on orders for select
  using (user_id = auth.uid());

drop policy if exists "Users can insert their own orders" on orders;
create policy "Users can insert their own orders"
  on orders for insert
  with check (user_id = auth.uid());

drop policy if exists "Users can view their own order items" on order_items;
create policy "Users can view their own order items"
  on order_items for select
  using (
    exists (
      select 1
      from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

drop policy if exists "Users can insert their own order items" on order_items;
create policy "Users can insert their own order items"
  on order_items for insert
  with check (
    exists (
      select 1
      from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

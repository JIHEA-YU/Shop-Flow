# PROJECT_SPEC.md

# ShopFlow - Vibe Coding 쇼핑몰 예제 프로젝트

## 1. 프로젝트 개요

### 프로젝트 이름

ShopFlow

### 프로젝트 목적

이 프로젝트는 Vibe Coding으로 웹 애플리케이션을 만드는 전 과정을 경험하고, 다른 사람들에게 가이드 예제로 소개하기 위한 쇼핑몰 MVP 프로젝트이다.

단순한 정적 웹페이지가 아니라 다음 흐름을 모두 포함하는 실전형 예제를 목표로 한다.

상품 조회 → 상품 상세 → 찜 → 장바구니 → 로그인 → 결제 테스트 → 주문 저장 → 주문 내역 확인

### 핵심 목표

- Next.js 기반 쇼핑몰 웹페이지 구현
- DummyJSON API를 사용한 상품 데이터 조회
- Supabase Auth를 사용한 로그인/회원가입
- Supabase Database를 사용한 사용자별 데이터 저장
- Stripe Test Mode를 사용한 테스트 결제 연동
- Vercel을 통한 배포
- Vibe Coding 학습용으로 설명하기 쉬운 구조 유지

---

## 2. 기술 스택

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

### Product Data

- DummyJSON Products API

### Authentication

- Supabase Auth

### Database

- Supabase Database

### Optional Storage

- Supabase Storage

### Payment

- Stripe Checkout
- Stripe Test Mode

### Deployment

- Vercel

---

## 3. 각 도구의 역할

| 도구              | 역할                                         |
| ----------------- | -------------------------------------------- |
| Next.js           | 웹 애플리케이션 프레임워크                   |
| TypeScript        | 타입 안정성 확보                             |
| Tailwind CSS      | 스타일링                                     |
| shadcn/ui         | UI 컴포넌트                                  |
| DummyJSON         | 상품 데이터 제공                             |
| Supabase Auth     | 회원가입, 로그인, 로그아웃, 현재 사용자 확인 |
| Supabase Database | 찜, 장바구니, 주문, 주문 상품 저장           |
| Supabase Storage  | 이미지 업로드 기능이 필요할 경우 사용        |
| Stripe Checkout   | 테스트 결제                                  |
| Vercel            | 배포                                         |

---

## 4. MVP 범위

### 포함할 기능

| 기능               | 포함 여부 |
| ------------------ | --------- |
| 홈 페이지          | 포함      |
| 상품 목록          | 포함      |
| 상품 상세          | 포함      |
| 상품 검색          | 포함      |
| 카테고리 필터      | 포함      |
| 상품 정렬          | 포함      |
| 회원가입           | 포함      |
| 로그인             | 포함      |
| 로그아웃           | 포함      |
| 찜 목록            | 포함      |
| 장바구니           | 포함      |
| 장바구니 수량 변경 | 포함      |
| 장바구니 상품 삭제 | 포함      |
| Stripe 테스트 결제 | 포함      |
| 결제 성공 페이지   | 포함      |
| 주문 저장          | 포함      |
| 주문 내역          | 포함      |
| 주문 상세          | 포함      |
| 마이페이지         | 포함      |
| Vercel 배포        | 포함      |

### MVP에서 제외할 기능

| 기능                | 제외 이유                             |
| ------------------- | ------------------------------------- |
| 관리자 페이지       | MVP 범위 초과                         |
| 상품 등록/수정/삭제 | 상품 데이터는 DummyJSON 사용          |
| 실제 결제           | Stripe Test Mode만 사용               |
| 실제 배송 조회      | MVP 범위 초과                         |
| 쿠폰                | MVP 범위 초과                         |
| 리뷰 작성           | MVP 범위 초과                         |
| 판매자 기능         | MVP 범위 초과                         |
| 재고 관리           | DummyJSON의 stock 값 표시 정도만 사용 |

---

## 5. 페이지 구조

### 전체 페이지 목록

| URL                 | 역할                        |
| ------------------- | --------------------------- |
| `/`                 | 홈 페이지                   |
| `/products`         | 상품 목록, 검색, 필터, 정렬 |
| `/products/[id]`    | 상품 상세 페이지            |
| `/wishlist`         | 찜 목록                     |
| `/cart`             | 장바구니                    |
| `/checkout`         | 주문 확인 및 결제 시작      |
| `/checkout/success` | 결제 성공 처리              |
| `/orders`           | 주문 내역                   |
| `/orders/[id]`      | 주문 상세                   |
| `/login`            | 로그인                      |
| `/signup`           | 회원가입                    |
| `/mypage`           | 마이페이지                  |

### 사용자 흐름

```text
홈
→ 상품 목록
→ 상품 상세
→ 찜 또는 장바구니 담기
→ 장바구니
→ 체크아웃
→ Stripe 테스트 결제
→ 결제 성공
→ 주문 내역 확인
```

### 인증이 필요한 페이지

아래 페이지는 로그인한 사용자만 접근할 수 있다.

```text
/wishlist
/cart
/checkout
/orders
/orders/[id]
/mypage
```

비로그인 사용자가 접근하면 `/login` 페이지로 이동시킨다.

---

## 6. Next.js App Router 구조

```text
app/
  layout.tsx
  page.tsx
  globals.css

  products/
    page.tsx
    [id]/
      page.tsx

  wishlist/
    page.tsx

  cart/
    page.tsx

  checkout/
    page.tsx
    success/
      page.tsx

  orders/
    page.tsx
    [id]/
      page.tsx

  login/
    page.tsx

  signup/
    page.tsx

  mypage/
    page.tsx

  api/
    checkout/
      route.ts
```

---

## 7. 추천 프로젝트 폴더 구조

```text
shopflow/
  app/
    layout.tsx
    page.tsx
    globals.css

    products/
      page.tsx
      [id]/
        page.tsx

    wishlist/
      page.tsx

    cart/
      page.tsx

    checkout/
      page.tsx
      success/
        page.tsx

    orders/
      page.tsx
      [id]/
        page.tsx

    login/
      page.tsx

    signup/
      page.tsx

    mypage/
      page.tsx

    api/
      checkout/
        route.ts

  components/
    layout/
      Header.tsx
      Footer.tsx
      Navbar.tsx

    product/
      ProductCard.tsx
      ProductGrid.tsx
      ProductDetail.tsx
      ProductImageGallery.tsx
      ProductFilter.tsx
      ProductSort.tsx
      SearchBar.tsx

    cart/
      CartItem.tsx
      CartSummary.tsx

    wishlist/
      WishlistButton.tsx
      WishlistGrid.tsx

    order/
      OrderCard.tsx
      OrderItemList.tsx
      OrderSummary.tsx

    auth/
      LoginForm.tsx
      SignupForm.tsx

    ui/
      shadcn/ui components

  lib/
    supabase/
      client.ts
      server.ts
      middleware.ts

    stripe/
      stripe.ts

    dummyjson/
      products.ts
      carts.ts

    utils.ts

  services/
    product-service.ts
    cart-service.ts
    wishlist-service.ts
    order-service.ts

  hooks/
    useCart.ts
    useWishlist.ts
    useUser.ts

  types/
    product.ts
    cart.ts
    wishlist.ts
    order.ts
    user.ts

  constants/
    routes.ts
    categories.ts

  middleware.ts
  .env.local
  README.md
  PROJECT_SPEC.md
  PROMPTS.md
```

---

## 8. 폴더별 역할

| 폴더             | 역할                       |
| ---------------- | -------------------------- |
| `app/`           | 페이지, 라우팅, API Route  |
| `components/`    | 재사용 가능한 UI 컴포넌트  |
| `components/ui/` | shadcn/ui 컴포넌트         |
| `lib/`           | 외부 서비스 연결 코드      |
| `lib/dummyjson/` | DummyJSON API 호출 함수    |
| `lib/supabase/`  | Supabase client 설정       |
| `lib/stripe/`    | Stripe 설정                |
| `services/`      | DB/API 요청 비즈니스 로직  |
| `hooks/`         | 클라이언트 상태 관리 hook  |
| `types/`         | TypeScript 타입 정의       |
| `constants/`     | 라우트, 카테고리 등 고정값 |
| `middleware.ts`  | 인증 보호 라우트 처리      |

---

## 9. 데이터 소스 설계

## 9.1 DummyJSON

DummyJSON은 상품 데이터 전용으로 사용한다.

### 사용 범위

- 상품 목록
- 상품 상세
- 상품 검색
- 카테고리 목록
- 카테고리별 상품
- 상품 이미지
- 상품 평점
- 상품 리뷰 데이터 표시

### 사용하지 않는 범위

- 실제 사용자 인증
- 실제 찜 목록 저장
- 실제 장바구니 저장
- 실제 주문 저장
- 실제 결제

### 주요 엔드포인트

```text
GET https://dummyjson.com/products
GET https://dummyjson.com/products/{id}
GET https://dummyjson.com/products/search?q=phone
GET https://dummyjson.com/products/category-list
GET https://dummyjson.com/products/category/{category}
```

### 상품 데이터에서 사용할 주요 필드

```text
id
title
description
price
discountPercentage
rating
stock
brand
category
thumbnail
images
reviews
```

### 상품 테이블 생성 여부

Supabase에 `products` 테이블은 만들지 않는다.

이유:

- 상품 원본 데이터는 DummyJSON에서 가져온다.
- 이 프로젝트는 상품 관리 서비스가 아니라 쇼핑몰 흐름을 구현하는 MVP이다.
- 단, 주문 시점의 상품명, 가격, 이미지는 주문 기록 보존을 위해 `order_items` 테이블에 복사 저장한다.

---

## 9.2 Supabase Auth

Supabase Auth는 다음 기능에 사용한다.

- 회원가입
- 로그인
- 로그아웃
- 현재 사용자 확인
- 로그인한 사용자별 데이터 구분

### 인증 규칙

- 로그인한 사용자의 고유 ID는 Supabase Auth의 `user.id`를 사용한다.
- 사용자별 데이터는 항상 `user_id` 기준으로 조회한다.
- 비로그인 사용자가 인증이 필요한 페이지에 접근하면 `/login`으로 이동한다.
- 로그인 성공 후에는 가능하면 이전에 접근하려던 페이지 또는 `/mypage`로 이동한다.

---

## 9.3 Supabase Database

Supabase Database는 사용자별 데이터 저장에 사용한다.

### 저장 대상

```text
profiles
wishlist
cart_items
orders
order_items
```

### 저장하지 않는 대상

```text
products
categories
```

상품과 카테고리는 DummyJSON API에서 가져온다.

---

## 10. DB 설계

## 10.1 ERD 개념 구조

```text
auth.users
   ↓
profiles

auth.users
   ↓
wishlist

auth.users
   ↓
cart_items

auth.users
   ↓
orders
   ↓
order_items
```

---

## 10.2 profiles

Supabase Auth 유저의 추가 정보를 저장한다.

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  avatar_url text,
  created_at timestamptz default now()
);
```

### 컬럼 설명

| 컬럼         | 설명                    |
| ------------ | ----------------------- |
| `id`         | Supabase Auth의 user.id |
| `email`      | 사용자 이메일           |
| `name`       | 사용자 이름             |
| `avatar_url` | 프로필 이미지 URL       |
| `created_at` | 생성일                  |

---

## 10.3 wishlist

사용자의 찜 목록을 저장한다.

```sql
create table wishlist (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id integer not null,
  title text,
  price numeric,
  thumbnail text,
  created_at timestamptz default now(),

  unique (user_id, product_id)
);
```

### 규칙

- 한 사용자가 같은 상품을 중복으로 찜할 수 없다.
- `product_id`는 DummyJSON의 상품 ID를 사용한다.
- 화면 표시를 빠르게 하기 위해 `title`, `price`, `thumbnail`을 함께 저장한다.

---

## 10.4 cart_items

사용자의 장바구니 상품을 저장한다.

```sql
create table cart_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id integer not null,
  title text not null,
  price numeric not null,
  thumbnail text,
  quantity integer not null default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  unique (user_id, product_id),
  check (quantity > 0)
);
```

### 규칙

- 한 사용자의 장바구니에는 같은 상품이 중복 row로 들어가지 않는다.
- 이미 담긴 상품을 다시 담으면 `quantity`를 증가시킨다.
- `quantity`는 항상 1 이상이어야 한다.
- 장바구니에 저장된 가격은 UI 표시와 결제 금액 계산에 사용한다.

---

## 10.5 orders

주문 1건의 대표 정보를 저장한다.

```sql
create table orders (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_session_id text unique,
  total_price numeric not null,
  status text not null default 'paid',
  created_at timestamptz default now()
);
```

### 주문 상태값

```text
pending
paid
cancelled
refunded
```

### MVP 기본값

Stripe 테스트 결제 성공 후 생성되는 주문의 기본 상태는 `paid`로 한다.

---

## 10.6 order_items

주문에 포함된 상품 목록을 저장한다.

```sql
create table order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_id integer not null,
  title text not null,
  price numeric not null,
  quantity integer not null,
  thumbnail text,
  created_at timestamptz default now(),

  check (quantity > 0)
);
```

### 규칙

- 주문 당시의 상품 정보를 저장한다.
- DummyJSON의 상품 정보가 나중에 바뀌어도 주문 내역은 유지되어야 한다.
- 주문 내역 화면에서는 `order_items`의 데이터를 우선 사용한다.

---

## 11. Supabase RLS 정책 원칙

Supabase 테이블에는 Row Level Security를 활성화한다.

### 기본 원칙

- 사용자는 자신의 데이터만 조회할 수 있다.
- 사용자는 자신의 데이터만 추가할 수 있다.
- 사용자는 자신의 데이터만 수정할 수 있다.
- 사용자는 자신의 데이터만 삭제할 수 있다.
- `user_id = auth.uid()` 조건을 기본으로 사용한다.

### RLS 적용 대상

```text
profiles
wishlist
cart_items
orders
order_items
```

### 주의 사항

- `SUPABASE_SERVICE_ROLE_KEY`는 서버에서만 사용한다.
- 클라이언트 코드에서는 절대 Service Role Key를 사용하지 않는다.
- 일반적인 사용자 데이터 조회/수정은 Supabase anon key와 RLS 정책을 사용한다.

---

## 12. Stripe 결제 설계

## 12.1 Stripe 사용 범위

Stripe는 테스트 결제에만 사용한다.

- Stripe Checkout 사용
- Stripe Test Mode 사용
- 실제 결제 금액 청구 없음
- 테스트 카드로 성공/실패 흐름 확인

## 12.2 결제 흐름

```text
장바구니 페이지
→ 결제하기 버튼 클릭
→ /checkout 페이지에서 주문 내용 확인
→ app/api/checkout/route.ts 호출
→ Stripe Checkout Session 생성
→ Stripe 결제 페이지 이동
→ 테스트 카드 입력
→ 결제 성공
→ /checkout/success 이동
→ Supabase orders 생성
→ Supabase order_items 생성
→ 장바구니 비우기
→ 주문 내역에서 확인
```

## 12.3 Stripe API 규칙

- Stripe Secret Key는 서버에서만 사용한다.
- `STRIPE_SECRET_KEY`는 클라이언트 컴포넌트에서 import하지 않는다.
- Checkout Session 생성은 `app/api/checkout/route.ts`에서 처리한다.
- 클라이언트가 전달한 금액을 무조건 신뢰하지 않는다.
- 가능하면 서버에서 장바구니 데이터를 다시 조회한 뒤 결제 금액을 계산한다.
- 결제 성공 후 주문 저장 시 `stripe_session_id`를 함께 저장한다.

## 12.4 테스트 카드

Stripe Test Mode에서 사용할 기본 성공 카드:

```text
카드 번호: 4242 4242 4242 4242
만료일: 미래 날짜 아무거나
CVC: 아무 3자리
우편번호: 아무 값
```

---

## 13. 환경 변수 규칙

`.env.local`에 아래 값을 저장한다.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 환경 변수 보안 규칙

- `NEXT_PUBLIC_`이 붙은 값만 클라이언트에서 사용할 수 있다.
- `STRIPE_SECRET_KEY`는 서버에서만 사용한다.
- `SUPABASE_SERVICE_ROLE_KEY`는 서버에서만 사용한다.
- `.env.local`은 Git에 올리지 않는다.
- `.gitignore`에 `.env.local`이 포함되어 있어야 한다.

---

## 14. API 사용 규칙

## 14.1 DummyJSON API 규칙

- DummyJSON은 상품 데이터 전용으로 사용한다.
- DummyJSON 응답 타입은 `types/product.ts`에 정의한다.
- DummyJSON 호출 함수는 `lib/dummyjson/products.ts` 또는 `services/product-service.ts`에 작성한다.
- 컴포넌트 내부에 긴 fetch 로직을 직접 작성하지 않는다.

### 예시 함수

```text
getProducts()
getProductById(id)
searchProducts(query)
getProductCategories()
getProductsByCategory(category)
```

---

## 14.2 Supabase API 규칙

- Supabase Auth는 로그인, 회원가입, 로그아웃, 현재 사용자 확인에 사용한다.
- Supabase Database는 찜, 장바구니, 주문 저장에 사용한다.
- 모든 사용자 데이터는 `user_id` 기준으로 처리한다.
- 로그인하지 않은 사용자는 사용자 데이터를 생성할 수 없다.
- Supabase 관련 코드는 `lib/supabase/`와 `services/`에 분리한다.

### 예시 함수

```text
getCurrentUser()
getWishlist(userId)
addWishlistItem(userId, product)
removeWishlistItem(userId, productId)

getCartItems(userId)
addCartItem(userId, product)
updateCartItemQuantity(userId, productId, quantity)
removeCartItem(userId, productId)
clearCart(userId)

createOrder(userId, cartItems, stripeSessionId)
getOrders(userId)
getOrderById(userId, orderId)
```

---

## 14.3 Stripe API 규칙

- Stripe Checkout Session 생성은 서버에서만 처리한다.
- Stripe Secret Key는 `lib/stripe/stripe.ts`에서만 직접 사용한다.
- 결제 생성 API는 `app/api/checkout/route.ts`를 사용한다.
- 결제 성공 페이지에서는 session id를 확인하고 주문 저장을 처리한다.

---

## 15. TypeScript 타입 설계

## 15.1 Product 타입

`types/product.ts`

```ts
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: ProductReview[];
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
```

## 15.2 Cart 타입

`types/cart.ts`

```ts
export interface CartItem {
  id: number;
  user_id: string;
  product_id: number;
  title: string;
  price: number;
  thumbnail: string | null;
  quantity: number;
  created_at: string;
  updated_at: string;
}
```

## 15.3 Wishlist 타입

`types/wishlist.ts`

```ts
export interface WishlistItem {
  id: number;
  user_id: string;
  product_id: number;
  title: string | null;
  price: number | null;
  thumbnail: string | null;
  created_at: string;
}
```

## 15.4 Order 타입

`types/order.ts`

```ts
export interface Order {
  id: number;
  user_id: string;
  stripe_session_id: string | null;
  total_price: number;
  status: "pending" | "paid" | "cancelled" | "refunded";
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string | null;
  created_at: string;
}
```

---

## 16. 코딩 규칙

## 16.1 TypeScript 규칙

- TypeScript strict mode를 사용한다.
- `any` 타입을 사용하지 않는다.
- API 응답 타입은 `types/` 폴더에 정의한다.
- 함수의 인자와 반환 타입을 명확히 작성한다.
- 알 수 없는 외부 데이터는 필요한 경우 타입 가드 또는 검증 로직을 사용한다.

## 16.2 Next.js 규칙

- App Router를 사용한다.
- 기본은 Server Component로 작성한다.
- `useState`, `useEffect`, `onClick`, 브라우저 API가 필요한 경우에만 Client Component를 사용한다.
- Client Component 파일 상단에는 `"use client"`를 작성한다.
- 페이지 파일은 `app/**/page.tsx`에 작성한다.
- API Route는 `app/api/**/route.ts`에 작성한다.

## 16.3 컴포넌트 규칙

- 공통 UI는 `components/`에 분리한다.
- 상품 관련 컴포넌트는 `components/product/`에 둔다.
- 장바구니 관련 컴포넌트는 `components/cart/`에 둔다.
- 주문 관련 컴포넌트는 `components/order/`에 둔다.
- 인증 관련 컴포넌트는 `components/auth/`에 둔다.
- shadcn/ui 컴포넌트는 `components/ui/`에 둔다.
- 컴포넌트 이름은 PascalCase를 사용한다.

### 컴포넌트 이름 예시

```text
ProductCard
ProductGrid
ProductDetail
WishlistButton
CartItem
CartSummary
OrderCard
OrderSummary
LoginForm
SignupForm
```

## 16.4 데이터 요청 규칙

- DummyJSON 요청 함수는 `lib/dummyjson/`에 작성한다.
- Supabase DB 요청 함수는 `services/`에 작성한다.
- Stripe 관련 코드는 `lib/stripe/`에 작성한다.
- 컴포넌트 내부에 긴 API 호출 로직을 직접 작성하지 않는다.
- 서버에서 가져올 수 있는 데이터는 Server Component에서 가져온다.
- 사용자 인터랙션이 필요한 데이터 변경은 Client Component 또는 Server Action/API Route를 사용한다.

## 16.5 스타일 규칙

- Tailwind CSS를 사용한다.
- shadcn/ui 컴포넌트를 우선 사용한다.
- 인라인 style 사용을 최소화한다.
- 반응형 디자인을 기본 적용한다.
- 모바일 → 태블릿 → 데스크톱 순서로 설계한다.
- 버튼, 카드, 입력창 등은 일관된 디자인을 유지한다.

## 16.6 상태 관리 규칙

- 서버에서 가져올 수 있는 데이터는 Server Component에서 처리한다.
- 장바구니 버튼, 찜 버튼처럼 즉시 반응이 필요한 부분만 Client Component로 처리한다.
- 전역 상태가 꼭 필요한 경우 Zustand를 사용할 수 있다.
- 단순 폼 상태는 `useState`를 사용한다.
- 서버 데이터와 클라이언트 상태를 불필요하게 중복 저장하지 않는다.

## 16.7 에러 처리 규칙

모든 주요 기능에는 아래 상태를 고려한다.

- 로딩 상태
- 에러 상태
- 빈 데이터 상태
- 비로그인 상태
- 권한 없음 상태

### 사용자 메시지 예시

```text
상품을 불러오는 중입니다.
상품을 불러오지 못했습니다.
상품이 없습니다.
장바구니가 비어 있습니다.
찜한 상품이 없습니다.
로그인이 필요한 기능입니다.
결제 처리 중 오류가 발생했습니다.
주문 내역이 없습니다.
```

## 16.8 보안 규칙

- 사용자는 자신의 데이터만 조회/수정/삭제할 수 있어야 한다.
- Supabase RLS를 활성화한다.
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 전용으로만 사용한다.
- `STRIPE_SECRET_KEY`는 서버 전용으로만 사용한다.
- 클라이언트가 전달한 결제 금액을 무조건 신뢰하지 않는다.
- 결제 전 서버에서 장바구니 데이터를 다시 확인한다.
- `.env.local`은 Git에 올리지 않는다.

---

## 17. UI/디자인 가이드

## 17.1 디자인 컨셉

깔끔하고 설명하기 쉬운 미니멀 쇼핑몰 디자인을 사용한다.

기본 컨셉:

```text
Modern
Minimal
Clean
Responsive
Card-based
```

## 17.2 브랜드 기본값

```text
브랜드명: ShopFlow
슬로건: Simple shopping experience.
```

## 17.3 주요 UI 요소

- 상단 Header
- 로고
- 상품 검색창
- 카테고리 필터
- 상품 카드
- 상품 상세 이미지 영역
- 찜 버튼
- 장바구니 버튼
- 주문 요약 카드
- 로그인/회원가입 폼
- 마이페이지 메뉴

## 17.4 Header 구성

Header에는 아래 항목을 포함한다.

```text
Logo
Products
Wishlist
Cart
Orders
My Page
Login / Logout
```

로그인 상태에 따라 Login 또는 Logout 버튼을 다르게 보여준다.

---

## 18. 주요 기능별 구현 기준

## 18.1 상품 목록

### 기능

- DummyJSON에서 상품 목록 조회
- 상품 카드 표시
- 상품명, 가격, 평점, 썸네일 표시
- 상품 상세 페이지로 이동

### 완료 기준

- `/products`에서 상품 목록이 보인다.
- 상품 카드 클릭 시 `/products/[id]`로 이동한다.
- 로딩, 에러, 빈 상태 UI가 있다.

---

## 18.2 상품 검색

### 기능

- 검색어 입력
- DummyJSON search API 호출
- 검색 결과 표시

### 완료 기준

- 검색어 입력 후 해당 상품 목록이 표시된다.
- 검색 결과가 없을 때 빈 상태 메시지가 표시된다.

---

## 18.3 카테고리 필터

### 기능

- DummyJSON 카테고리 목록 조회
- 카테고리 선택 시 해당 카테고리 상품 표시

### URL 방식

```text
/products?category=beauty
/products?category=fragrances
```

### 완료 기준

- 카테고리 선택 시 상품 목록이 변경된다.
- 전체 상품 보기로 돌아갈 수 있다.

---

## 18.4 상품 상세

### 기능

- 상품 이미지 표시
- 상품명, 설명, 가격, 평점, 재고 표시
- 장바구니 담기
- 찜하기

### 완료 기준

- `/products/[id]`에서 상품 상세 정보가 보인다.
- 로그인 사용자는 찜과 장바구니 담기가 가능하다.
- 비로그인 사용자는 로그인 안내를 받는다.

---

## 18.5 찜 목록

### 기능

- 상품 찜 추가
- 상품 찜 제거
- 내 찜 목록 조회

### 완료 기준

- 로그인 사용자는 상품을 찜할 수 있다.
- 같은 상품이 중복으로 찜되지 않는다.
- `/wishlist`에서 찜한 상품 목록을 볼 수 있다.
- 찜 목록에서 상품을 제거할 수 있다.

---

## 18.6 장바구니

### 기능

- 장바구니 담기
- 수량 변경
- 상품 삭제
- 총액 계산

### 완료 기준

- 로그인 사용자는 상품을 장바구니에 담을 수 있다.
- 같은 상품을 다시 담으면 수량이 증가한다.
- 수량을 변경할 수 있다.
- 상품을 삭제할 수 있다.
- 총 결제 금액이 계산된다.

---

## 18.7 체크아웃

### 기능

- 주문 예정 상품 확인
- 총 결제 금액 확인
- 결제하기 버튼 클릭
- Stripe Checkout 이동

### 완료 기준

- `/checkout`에서 장바구니 상품과 총액을 확인할 수 있다.
- 결제하기 버튼 클릭 시 Stripe Checkout 페이지로 이동한다.
- 장바구니가 비어 있으면 결제를 진행할 수 없다.

---

## 18.8 결제 성공

### 기능

- Stripe 결제 성공 후 `/checkout/success`로 이동
- 주문 데이터 저장
- 주문 상품 데이터 저장
- 장바구니 비우기

### 완료 기준

- 결제 성공 후 `orders` row가 생성된다.
- 결제 성공 후 `order_items` row가 생성된다.
- 결제 성공 후 장바구니가 비워진다.
- 주문 완료 메시지가 표시된다.

---

## 18.9 주문 내역

### 기능

- 내 주문 목록 조회
- 주문 상세 조회

### 완료 기준

- `/orders`에서 내 주문 목록을 볼 수 있다.
- 주문 클릭 시 `/orders/[id]`로 이동한다.
- `/orders/[id]`에서 주문 상품 목록과 총액을 볼 수 있다.
- 다른 사용자의 주문은 볼 수 없다.

---

## 18.10 마이페이지

### 기능

- 현재 로그인 사용자 정보 표시
- 주문 내역 이동
- 찜 목록 이동
- 장바구니 이동
- 로그아웃

### 완료 기준

- `/mypage`에서 사용자 이메일 또는 이름을 볼 수 있다.
- 주요 페이지로 이동할 수 있다.
- 로그아웃할 수 있다.

---

## 19. 개발 순서

Vibe Coding으로 구현할 때는 한 번에 전체 쇼핑몰을 만들지 않는다. 아래 순서대로 작은 단위로 구현한다.

```text
1. 프로젝트 초기화
2. Tailwind CSS 설정
3. shadcn/ui 설정
4. 기본 폴더 구조 생성
5. 공통 Layout, Header, Footer 구현
6. DummyJSON API 연결
7. 상품 목록 페이지 구현
8. 상품 상세 페이지 구현
9. 상품 검색 구현
10. 카테고리 필터 구현
11. Supabase 프로젝트 연결
12. Supabase Auth 구현
13. 인증 보호 라우트 구현
14. wishlist 테이블 및 찜 기능 구현
15. cart_items 테이블 및 장바구니 구현
16. checkout 페이지 구현
17. Stripe Checkout 연동
18. 결제 성공 후 orders/order_items 저장
19. 주문 내역 페이지 구현
20. 주문 상세 페이지 구현
21. 마이페이지 구현
22. 로딩/에러/빈 상태 보완
23. 반응형 UI 점검
24. Vercel 배포
25. README.md 작성
26. PROMPTS.md 작성
```

---

## 20. AI에게 줄 기본 개발 규칙 프롬프트

아래 프롬프트를 Vibe Coding 도구에서 프로젝트 시작 시 사용한다.

```text
이 프로젝트는 ShopFlow라는 Vibe Coding 학습용 쇼핑몰 MVP 프로젝트다.

반드시 PROJECT_SPEC.md를 기준으로 구현한다.

기술 스택:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- DummyJSON API
- Supabase Auth
- Supabase Database
- Stripe Checkout Test Mode
- Vercel

규칙:
- TypeScript strict mode를 지킨다.
- any를 사용하지 않는다.
- 기본은 Server Component로 작성한다.
- useState, useEffect, onClick이 필요한 경우에만 "use client"를 사용한다.
- DummyJSON은 상품 데이터에만 사용한다.
- Supabase는 Auth와 사용자 데이터 저장에 사용한다.
- Stripe Secret Key는 서버 코드에서만 사용한다.
- API 요청 함수는 lib/ 또는 services/에 분리한다.
- 컴포넌트는 역할별로 components/ 하위 폴더에 분리한다.
- Tailwind CSS와 shadcn/ui를 사용하고 인라인 스타일은 피한다.
- 모든 로그인 사용자 데이터는 user_id 기준으로 처리한다.
- 에러, 로딩, 빈 상태 UI를 반드시 구현한다.
- 기존 구조를 깨지 말고 작은 단위로 구현한다.
- 구현 후 어떤 파일을 만들고 수정했는지 요약한다.
```

---

## 21. 커밋 메시지 규칙

### 커밋 타입

```text
feat: 새로운 기능
fix: 버그 수정
refactor: 구조 개선
style: UI/스타일 변경
docs: 문서 수정
chore: 설정 변경
deploy: 배포
```

### 커밋 예시

```text
chore: initialize project
docs: add project specification
feat: add basic layout
feat: add product list page
feat: add product detail page
feat: implement product search
feat: integrate Supabase Auth
feat: add wishlist feature
feat: add cart feature
feat: add Stripe checkout
feat: add order history page
fix: prevent duplicate wishlist items
deploy: publish to Vercel
```

---

## 22. PROMPTS.md 작성 규칙

이 프로젝트는 Vibe Coding 가이드 예제이므로, 실제로 사용한 프롬프트를 `PROMPTS.md`에 기록한다.

### 기록 형식

```markdown
# PROMPTS.md

## Prompt 01 - 프로젝트 초기화

### 입력한 프롬프트

...

### 결과

...

### 수정한 점

...

---

## Prompt 02 - 상품 목록 구현

### 입력한 프롬프트

...

### 결과

...

### 수정한 점

...
```

### 기록해야 할 내용

- 어떤 프롬프트를 입력했는지
- 어떤 파일이 생성되었는지
- 어떤 문제가 있었는지
- 어떻게 수정했는지
- 다음 프롬프트에서 무엇을 요청했는지

---

## 23. Definition of Done

이 프로젝트의 MVP 완료 기준은 다음과 같다.

### 기능 완료 기준

- 사용자는 상품 목록을 볼 수 있다.
- 사용자는 상품을 검색할 수 있다.
- 사용자는 카테고리별 상품을 볼 수 있다.
- 사용자는 상품 상세 페이지를 볼 수 있다.
- 사용자는 회원가입할 수 있다.
- 사용자는 로그인/로그아웃할 수 있다.
- 로그인 사용자는 상품을 찜할 수 있다.
- 로그인 사용자는 장바구니에 상품을 담을 수 있다.
- 로그인 사용자는 장바구니 수량을 변경할 수 있다.
- 로그인 사용자는 Stripe 테스트 결제를 진행할 수 있다.
- 결제 성공 후 주문이 Supabase에 저장된다.
- 사용자는 주문 내역을 볼 수 있다.
- 사용자는 주문 상세를 볼 수 있다.
- 사용자는 마이페이지를 볼 수 있다.

### 품질 완료 기준

- TypeScript 오류가 없다.
- ESLint 오류가 없다.
- 주요 페이지에 로딩 상태가 있다.
- 주요 페이지에 에러 상태가 있다.
- 주요 페이지에 빈 상태 UI가 있다.
- 모바일 화면에서도 기본 사용이 가능하다.
- 환경 변수가 코드에 직접 노출되지 않는다.
- 사용자는 자신의 데이터만 볼 수 있다.
- Vercel에 배포되어 접속 가능하다.

---

## 24. 주의할 점

### Vibe Coding 진행 시 주의

- 한 번에 전체 기능을 만들라고 요청하지 않는다.
- 항상 작은 단위로 요청한다.
- 기능 구현 전에 관련 파일 구조를 먼저 확인하게 한다.
- 구현 후에는 수정된 파일 목록과 역할을 요약하게 한다.
- 오류가 나면 오류 메시지를 그대로 전달하고 수정하게 한다.
- AI가 기존 구조를 무시하면 PROJECT_SPEC.md 기준으로 다시 맞추게 한다.

### 기술적 주의

- DummyJSON은 외부 API이므로 장애나 응답 변경 가능성을 고려한다.
- Stripe Secret Key는 절대 클라이언트에 노출하지 않는다.
- Supabase Service Role Key는 절대 클라이언트에 노출하지 않는다.
- 주문 데이터는 결제 성공 후 안정적으로 저장되어야 한다.
- 주문 상품 정보는 DummyJSON에서 다시 가져오기보다 주문 시점 정보를 `order_items`에 저장한다.

---

## 25. 최종 목표

이 프로젝트의 최종 결과물은 단순한 쇼핑몰 코드가 아니다.

최종 목표는 다음 3가지이다.

1. 실제로 동작하는 쇼핑몰 MVP
2. Vibe Coding으로 웹을 만드는 전체 과정의 예제
3. 다른 친구들이 따라 할 수 있는 재현 가능한 가이드

따라서 코드뿐 아니라 다음 문서도 함께 완성한다.

```text
PROJECT_SPEC.md
PROMPTS.md
README.md
```

README.md에는 프로젝트 소개, 기술 스택, 실행 방법, 환경 변수 설정, 주요 기능, 배포 링크를 정리한다.

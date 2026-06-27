# ShopFlow

Next.js, Supabase, Stripe, DummyJSON으로 만든 미니 쇼핑몰 웹 애플리케이션입니다. 상품 탐색, 찜, 장바구니, 테스트 결제, 주문 내역 조회 기능을 제공합니다.

## 주요 기능

- [x] 상품 목록
- [x] 상품 검색
- [x] 카테고리 필터
- [x] 상품 상세
- [x] 회원가입 / 로그인 / 로그아웃
- [x] 찜 목록
- [x] 장바구니
- [x] Stripe 테스트 결제
- [x] 주문 저장
- [x] 주문 내역
- [x] 마이페이지

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| 프레임워크 | Next.js (App Router), TypeScript |
| 스타일 | Tailwind CSS, shadcn/ui |
| 상품 데이터 | DummyJSON API |
| 인증 | Supabase Auth |
| 데이터베이스 | Supabase (PostgreSQL) |
| 결제 | Stripe Checkout (Test Mode) |
| 배포 | Vercel |

## 프로젝트 구조

```text
app/            라우트 (페이지, API Route)
components/     화면 단위 컴포넌트
lib/            DummyJSON, Supabase, Stripe 클라이언트
services/       Supabase 데이터 조회/조작 함수
types/          공용 타입 정의
supabase/sql/   Supabase 테이블/RLS 정책 SQL
```

## Stripe 테스트 결제

결제는 Stripe **Test Mode**의 secret key를 사용합니다. 실제 결제가 이루어지지 않으며, 아래 테스트 카드로 결제 흐름을 확인할 수 있습니다.

```text
카드 번호: 4242 4242 4242 4242
만료일: 미래의 임의 날짜
CVC / 우편번호: 임의 값
```

## 제한 사항

- 상품 데이터는 DummyJSON 샘플 API를 사용합니다.
- 결제는 실제 결제가 아닌 Stripe Test Mode 기준입니다.
- 배송, 쿠폰, 관리자 기능은 제공하지 않습니다.
- 현재는 결제 성공 페이지 방문 시점에 주문을 저장하며, 실서비스에서는 Stripe webhook 기반 처리가 권장됩니다.

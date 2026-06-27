### 1. 프로젝트 이해
PROJECT_SPEC.md을 읽고 프로젝트 구조를 이해해. 앞으로 모든 구현은 이 문서를 기준으로 진행해. 구현 전 항상 기존 구조를 유지하고, 새로운 기능이 기존 구조를 깨지 않도록 해.

### 2. 프로젝트 초기화
PROJECT_SPEC.md를 기준으로 프로젝트를 초기화해. 다음 조건을 만족해. 
- Next.js(App Router)
TypeScript
Tailwind CSS
ESLint
Prettier
shadcn/ui
src 폴더는 사용하지 않는다. 
- npm을 사용한다. 
- 폴더 구조는 PROJECT_SPEC.md를 따른다. 
- 아직 기능은 구현하지 말고 프로젝트 구조만 만든다.

### 3. 초기화 상태 점검
PROJECT_SPEC.md를 기준으로 현재 프로젝트 초기화 상태를 점검해줘. 

목표: 
- 아직 본격적인 기능 구현은 하지 않는다. 
- 프로젝트 구조가 PROJECT_SPEC.md와 맞는지 확인한다. 
- 필요한 기본 폴더와 파일을 생성한다. 
- 공통 레이아웃과 페이지 라우트 뼈대만 만든다. 

확인할 것: 
- Next.js App Router 구조가 맞는지 
- TypeScript 설정이 되어 있는지
- Tailwind CSS가 정상 설정되어 있는지 
- shadcn/ui를 사용할 준비가 되어 있는지 
- app/, components/, lib/, services/, hooks/, types/, constants/ 폴더가 있는지 
- PROJECT_SPEC.md 기준으로 필요한 페이지 라우트가 있는지 

생성할 것: 
- components/layout/Header.tsx 
- components/layout/Footer.tsx 
- components/layout/Navbar.tsx 
- constants/routes.ts 
- app/products/page.tsx 
- app/products/[id]/page.tsx 
- app/wishlist/page.tsx 
- app/cart/page.tsx 
- app/checkout/page.tsx 
- app/checkout/success/page.tsx 
- app/orders/page.tsx 
- app/orders/[id]/page.tsx 
- app/login/page.tsx 
- app/signup/page.tsx 
- app/mypage/page.tsx 

규칙: 
- 아직 Supabase, Stripe, DummyJSON 기능은 구현하지 않는다. 
- 각 페이지는 임시 제목과 간단한 설명만 표시한다. 
- Header에는 Logo, Products, Wishlist, Cart, Orders, My Page, Login 링크를 넣는다. 
- Tailwind CSS로 기본적인 반응형 레이아웃을 만든다. 
- TypeScript strict mode를 지킨다. 
- any를 사용하지 않는다. 
- 구현 후 수정/생성한 파일 목록을 요약해줘.

### 4. DummyJSON API 연결
PROJECT_SPEC.md를 기준으로 DummyJSON 상품 API 연결을 구현해줘. 

DummyJSON 공식 문서: https://dummyjson.com/docs/products 

사용할 Base URL: https://dummyjson.com 

사용할 엔드포인트: 
- GET /products 
- GET /products/{id} 
- GET /products/search?q={query} 
- GET /products/category-list 
- GET /products/category/{category} 

목표: 
- 상품 목록 데이터를 DummyJSON에서 가져온다. 
- 상품 상세 데이터를 DummyJSON에서 가져온다. 
- 상품 관련 TypeScript 타입을 정의한다. 
- 상품 API 요청 함수를 분리한다. 
- /products 페이지에서 상품 목록을 보여준다. 

생성/수정할 파일: 
- types/product.ts 
- lib/dummyjson/products.ts 
- components/product/ProductCard.tsx 
- components/product/ProductGrid.tsx 
- app/products/page.tsx 

규칙: 
- DummyJSON은 상품 데이터에만 사용한다. 
- DummyJSON은 설치하는 패키지가 아니다. 
- API Key나 환경 변수는 필요 없다. 
- Supabase는 이 단계에서 사용하지 않는다. 
- Stripe도 이 단계에서 사용하지 않는다. 
- fetch를 사용해서 DummyJSON REST API를 호출한다. 
- API 응답 타입을 명확히 정의한다. 
- any를 사용하지 않는다. 
- 상품 카드에는 썸네일, 상품명, 가격, 평점, 카테고리를 표시한다. 
- 상품 카드를 클릭하면 /products/[id]로 이동하게 한다. 
- 로딩, 에러, 빈 상태를 고려한다. 
- 구현 후 생성/수정한 파일 목록을 요약해줘.

### 5.상품 목록 페이지 구현
PROJECT_SPEC.md를 기준으로 상품 목록 페이지를 구현해줘.

현재 상태:
- 프로젝트 초기화 완료
- 공통 Layout(Header, Footer) 구현 완료
- DummyJSON 연결 코드 구현 완료

이번 작업 목표:
- /products 페이지에서 DummyJSON 상품 목록을 화면에 표시한다.
- 상품 목록은 카드 그리드 형태로 보여준다.
- 아직 상품 상세, 검색, 카테고리 필터, Supabase, Stripe는 구현하지 않는다.

작업 전 확인:
- 기존에 작성된 DummyJSON 연결 파일과 Product 타입이 있다면 재사용해.
- 기존 구조를 무시하고 새로 만들지 말고, 현재 프로젝트 구조를 먼저 확인한 뒤 필요한 부분만 수정해.
- PROJECT_SPEC.md의 폴더 구조와 코딩 규칙을 지켜줘.

구현할 내용:
- /products 페이지에서 상품 목록 데이터를 가져온다.
- 상품 카드를 그리드로 보여준다.
- 상품 카드에는 다음 정보를 표시한다.
  - 상품 썸네일
  - 상품명
  - 가격
  - 평점
  - 카테고리
  - 재고 상태 또는 stock
- 상품 카드를 클릭하면 /products/[id] 페이지로 이동할 수 있게 한다.
- 로딩 상태를 고려한다.
- 에러 상태를 고려한다.
- 상품이 없을 때 빈 상태 UI를 제공한다.
- 반응형 그리드로 구현한다.
  - 모바일: 1열
  - 태블릿: 2열
  - 데스크톱: 3~4열

생성 또는 수정할 수 있는 파일:
- app/products/page.tsx
- components/product/ProductCard.tsx
- components/product/ProductGrid.tsx
- lib/dummyjson/products.ts
- types/product.ts
- next.config.ts 또는 next.config.mjs, 필요한 경우

주의:
- DummyJSON은 상품 데이터에만 사용한다.
- Supabase는 이번 단계에서 사용하지 않는다.
- Stripe는 이번 단계에서 사용하지 않는다.
- 검색 기능은 아직 구현하지 않는다.
- 카테고리 필터는 아직 구현하지 않는다.
- 상품 상세 페이지의 실제 내용은 아직 구현하지 않는다. 링크 이동만 가능하게 해도 된다.
- TypeScript strict mode를 지킨다.
- any를 사용하지 않는다.
- 기본은 Server Component로 구현한다.
- useState, useEffect가 꼭 필요한 경우가 아니면 "use client"를 사용하지 않는다.
- Tailwind CSS와 shadcn/ui를 사용한다.
- PROMPTS.md는 수정하지 마.
- README.md도 아직 수정하지 마.

작업 완료 후:
- 생성/수정한 파일 목록을 요약해줘.
- 구현한 내용을 요약해줘.
- 내가 확인해야 할 실행 명령과 테스트 방법을 알려줘.

### 6. 상품 상세 페이지 구현
PROJECT_SPEC.md를 기준으로 상품 상세 페이지를 구현해줘.

현재 상태:
- 프로젝트 초기화 완료
- 공통 Layout(Header, Footer) 구현 완료
- DummyJSON 연결 코드 구현 완료
- /products 상품 목록 페이지 구현 완료
- 상품 카드 클릭 시 /products/[id]로 이동하는 구조가 있음

이번 작업 목표:
- /products/[id] 페이지에서 DummyJSON의 단일 상품 상세 데이터를 가져와서 화면에 표시한다.
- 상품 목록에서 클릭한 상품의 id를 기반으로 상세 데이터를 조회한다.
- 아직 검색, 카테고리 필터, Supabase Auth, 찜 기능, 장바구니 기능, Stripe는 구현하지 않는다.
- 단, 이후 찜/장바구니 기능을 붙이기 쉽도록 UI 위치만 준비한다.

참고 문서:
- DummyJSON Products Docs: https://dummyjson.com/docs/products
- 사용할 단일 상품 API: GET https://dummyjson.com/products/{id}

작업 전 확인:
- 기존에 작성된 Product 타입과 DummyJSON API 함수가 있다면 재사용해.
- 기존 구조를 무시하고 새로 만들지 말고, 현재 프로젝트 구조를 먼저 확인한 뒤 필요한 부분만 수정해.
- PROJECT_SPEC.md의 폴더 구조와 코딩 규칙을 지켜줘.
- /products/[id]/page.tsx가 이미 임시 페이지로 있다면 실제 상세 페이지로 교체해줘.

구현할 내용:
1. 단일 상품 조회 함수 구현 또는 보완
   - lib/dummyjson/products.ts에 getProductById(id) 함수가 없으면 추가해.
   - 이미 있다면 기존 함수를 재사용하거나 타입 안정성을 보완해.
   - id는 number로 변환해서 사용해.
   - 잘못된 id, API 실패, 상품 없음 상황을 처리해.

2. 상품 상세 페이지 구현
   - app/products/[id]/page.tsx에서 params.id를 읽어 상품 상세 데이터를 가져온다.
   - Next.js App Router 기준으로 Server Component로 구현한다.
   - 가능한 경우 params 타입은 최신 Next.js 방식에 맞게 Promise 형태로 처리해.
   - 상품이 없거나 잘못된 id일 경우 notFound() 또는 사용자 친화적인 오류 UI를 사용한다.

3. 상품 상세 UI 구성
   아래 정보를 표시해.
   - 상품 이미지
   - 상품명
   - 설명
   - 가격
   - 할인율
   - 평점
   - 브랜드
   - 카테고리
   - 재고 수량
   - availabilityStatus가 있으면 재고 상태
   - shippingInformation이 있으면 배송 정보
   - warrantyInformation이 있으면 보증 정보
   - returnPolicy가 있으면 반품 정책
   - 리뷰 목록이 있으면 리뷰 섹션

4. 이미지 영역
   - product.thumbnail과 product.images를 활용해 상품 이미지 영역을 구성해.
   - 아직 복잡한 이미지 슬라이더는 만들지 않아도 된다.
   - 대표 이미지 1개와 하단 썸네일 목록 정도로 구현해.
   - next/image를 사용할 경우 DummyJSON 이미지 도메인이 허용되어 있는지 확인하고, 필요하면 next.config 파일을 수정해.
   - 이미지가 없을 때 깨지지 않도록 fallback UI를 제공해.

5. 버튼 영역
   - "찜하기" 버튼과 "장바구니 담기" 버튼 UI를 배치한다.
   - 단, 이번 단계에서는 실제 Supabase 저장 기능은 구현하지 않는다.
   - 버튼 클릭 기능은 아직 연결하지 말고 disabled 또는 임시 안내 상태로 둔다.
   - 버튼 주변에 "로그인 후 이용 가능" 같은 안내 문구를 넣어도 된다.
   - 실제 찜/장바구니 기능은 이후 단계에서 구현할 예정이다.

6. 이동 링크
   - 상품 목록으로 돌아가기 링크를 제공한다.
   - 카테고리 텍스트를 클릭 가능한 링크로 만들 필요는 아직 없다.
   - 다음 단계에서 검색/카테고리 기능을 따로 구현할 예정이다.

생성 또는 수정할 수 있는 파일:
- app/products/[id]/page.tsx
- app/products/[id]/loading.tsx, 필요한 경우
- app/products/[id]/not-found.tsx, 필요한 경우
- components/product/ProductDetail.tsx
- components/product/ProductImageGallery.tsx
- lib/dummyjson/products.ts
- types/product.ts
- next.config.ts 또는 next.config.mjs, 이미지 설정이 필요한 경우

주의:
- DummyJSON은 상품 데이터에만 사용한다.
- Supabase는 이번 단계에서 사용하지 않는다.
- Stripe는 이번 단계에서 사용하지 않는다.
- 검색 기능은 아직 구현하지 않는다.
- 카테고리 필터는 아직 구현하지 않는다.
- 찜 기능의 실제 저장은 아직 구현하지 않는다.
- 장바구니 기능의 실제 저장은 아직 구현하지 않는다.
- TypeScript strict mode를 지킨다.
- any를 사용하지 않는다.
- 기본은 Server Component로 구현한다.
- useState, useEffect, onClick이 꼭 필요한 경우가 아니면 "use client"를 사용하지 않는다.
- Tailwind CSS와 shadcn/ui를 사용한다.

작업 완료 후:
- 생성/수정한 파일 목록을 요약해줘.
- 구현한 내용을 요약해줘.
- 내가 확인해야 할 실행 명령과 테스트 방법을 알려줘.
- 다음 단계인 검색 기능 구현 전에 확인해야 할 사항을 알려줘.
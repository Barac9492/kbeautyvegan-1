# Feature-First 아키텍처 가이드

**본 문서는 Feature-First 아키텍처의 명확한 규칙과 원칙을 정의합니다. 확장 가능하고 유지보수 가능한 애플리케이션을 위한 범용적 가이드입니다.**

## 목차
1. [핵심 아키텍처 원칙](#1-핵심-아키텍처-원칙)
2. [코드 조직화 및 라우팅 전략](#2-코드-조직화-및-라우팅-전략)
3. [App 디렉토리 라우팅 전략](#3-app-디렉토리-라우팅-전략)
4. [Features 계층 구현 가이드](#4-features-계층-구현-가이드)
5. [레이아웃 관리 전략](#5-레이아웃-관리-전략)
6. [UI 컴포넌트 디자인 및 구현](#6-ui-컴포넌트-디자인-및-구현)
7. [테마 및 스타일 관리](#7-테마-및-스타일-관리)
8. [Shared 모듈 구조](#8-shared-모듈-구조)
9. [상태 관리 계층 구조](#9-상태-관리-계층-구조)
10. [동적 라우팅 패턴](#10-동적-라우팅-패턴)
11. [네이밍 컨벤션](#11-네이밍-컨벤션)

## 1. 핵심 아키텍처 원칙

### 1.1 아키텍처 기본 원칙
- **Feature-First**: 기능 중심의 코드 조직화
- **계층화**: 4계층 구조 (Features, App, Shared, Components)
- **관심사 분리**: 각 계층은 명확한 역할과 책임 보유
- **확장성**: 새로운 기능 추가 시 기존 코드 영향 최소화

## 2. 코드 조직화 및 라우팅 전략

**코드는 재사용성과 기능 도메인에 따라 4계층으로 조직화합니다:**

#### **Features 계층** - 기능 모듈
- **목적**: 재사용 가능한 독립적 기능
- **예시**: `auth`, `user-management`, `payment`, `notification`
> **상세한 구현 가이드는 [4. Features 계층 구현 가이드](#4-features-계층-구현-가이드) 섹션을 참조하세요.**

#### **App 계층** - 라우팅 및 페이지 조합
- **목적**: Next.js 라우팅과 페이지별 특화 컴포넌트
- **기준**: 특정 URL 경로에서만 사용되는 sections, components, layout
- **구조**: 페이지 조합 + 페이지별 sections/components
- **예시**: `app/dashboard/page.tsx`, `app/products/[id]/page.tsx`

#### **Shared 계층** - 전역 공유 시스템
- **목적**: 앱 전체에서 사용되는 공통 기능과 UI
- **기준**: 프로젝트 전체에 영향을 미치는 기반 시설
- **구조**: UI/Lib/Config로 중앙집중화
- **예시**: API 클라이언트, 레이아웃, 디자인 시스템, 유틸리티

#### **Components 계층** - 외부 UI 라이브러리
- **목적**: 외부 UI 라이브러리 컴포넌트 원본 보관
- **기준**: shadcn/ui, Radix UI 등 CLI로 설치되는 컴포넌트
- **구조**: 라이브러리별 디렉토리 분리
- **예시**: `components/ui/button.tsx`, `components/ui/input.tsx`
- **절대 수정 금지**: CLI로 설치된 원본 컴포넌트는 절대 직접 수정하지 않음

```
project-root/
├── features/[feature-name]/    # 기능 모듈 (UI/API/Model/Lib 분리)
├── shared/                    # 전역 공유 시스템
│   ├── ui/                    # 공통 UI 요소
│   │   ├── components/        # 재사용 컴포넌트
│   │   ├── layouts/           # 공통 재사용 레이아웃
│   │   └── themes/            # 테마 시스템
│   │       ├── base.ts        # 기본 테마 정의 (라이트/다크)
│   │       └── index.ts       # 테마 관련 exports
│   ├── lib/                   # 공통 라이브러리
│   │   ├── api-client.ts      # API 클라이언트 설정
│   │   ├── utils.ts           # 범용 헬퍼 함수
│   │   ├── constants.ts       # 전역 상수
│   │   ├── types.ts           # 공통 타입 정의 (토큰 타입 포함)
│   │   ├── hooks.ts           # 공통 React 훅
│   │   └── providers/         # Context Providers
│   │       └── ThemeProvider.tsx  # 테마 Context
│   └── config/                # 환경 설정
├── app/                       # 라우팅 및 페이지 조합
│   ├── layout.tsx             # 루트 레이아웃 (폰트, 메타데이터)
│   ├── page.tsx               # 홈페이지
│   ├── (auth)/                # 인증 관련 라우트 그룹
│   │   ├── layout.tsx         # AuthLayout 또는 페이지별 특화
│   │   ├── login/page.tsx     # 로그인 페이지
│   │   └── register/page.tsx  # 회원가입 페이지
│   ├── (dashboard)/           # 보호된 관리 페이지
│   │   ├── layout.tsx         # DashboardLayout 또는 특화 레이아웃
│   │   ├── page.tsx           # 대시보드 홈
│   │   ├── sections/          # 대시보드별 섹션 (선택적)
│   │   ├── components/        # 대시보드별 컴포넌트 (선택적)
│   │   └── users/
│   │       ├── page.tsx       # 사용자 목록
│   │       └── [id]/page.tsx  # 사용자 상세
│   └── products/              # 일반 페이지 예시
│       ├── page.tsx           # 제품 목록
│       ├── sections/          # 제품 페이지별 섹션
│       ├── components/        # 제품 페이지별 컴포넌트
│       └── [id]/page.tsx      # 제품 상세
└── components/                # shadcn/ui 컴포넌트 (원본)
    └── ui/
```

### 2.2 Features와 App 계층 협업 패턴

**Feature-First 원칙을 따르는 app/ 사용법:**

#### **App 계층의 역할**
- **라우팅 관리**: Next.js App Router를 활용한 URL 구조 정의
- **레이아웃 조합**: Feature별 UI를 페이지 레이아웃에 조합
- **Feature 연결**: Feature 공개 API를 통한 기능 조합

#### **기본 연결 패턴**
```typescript
// app/products/page.tsx - Feature 기반 페이지 구성
import { ProductList, ProductFilters } from '@/features/products'
import { SearchInput } from '@/features/search'

export default function ProductsPage() {
  return (
    <div>
      <SearchInput />
      <ProductFilters />
      <ProductList />
    </div>
  )
}
```

> **상세한 app 디렉토리 라우팅 구조는 [3. App 디렉토리 라우팅 전략](#3-app-디렉토리-라우팅-전략) 섹션을 참조하세요.**

## 3. App 디렉토리 라우팅 전략

### 3.1 페이지 내부 구조 관리 원칙

**app/[page]/ 디렉토리 내부 구조:**

```
app/[page]/                    # 페이지별 디렉토리
├── page.tsx                   # Next.js 페이지 파일 (필수)
├── layout.tsx                 # 페이지별 레이아웃 (선택)
├── sections/                  # 페이지별 콘텐츠 섹션
│   ├── HeroSection.tsx        # 예시: 히어로 섹션
│   ├── AboutSection.tsx       # 예시: 소개 섹션
│   └── ContactSection.tsx     # 예시: 연락처 섹션
├── components/                # 페이지별 기술 컴포넌트
│   ├── CustomAnimation.tsx    # 예시: 페이지 전용 애니메이션
│   ├── InteractiveChart.tsx   # 예시: 페이지 전용 차트
│   └── PageEffects.tsx        # 예시: 페이지 전용 효과
└── lib/                       # 페이지별 로직/유틸리티 (선택)
    └── helpers.ts             # 예시: 페이지 전용 헬퍼
```

#### **디렉토리별 구분 기준**

| 디렉토리 | 용도 | 특징 | 예시 |
|----------|------|------|------|
| **sections/** | 페이지별 콘텐츠 섹션 | • 콘텐츠 중심<br>• 페이지에서만 사용<br>• 순서 의존적 | HeroSection, AboutSection, PricingSection |
| **components/** | 페이지별 기술 컴포넌트 | • 기술적 구현 중심<br>• UI 로직/애니메이션<br>• 페이지 전용 | CustomChart, PageAnimation, VisualEffects |
| **lib/** | 페이지별 로직/유틸리티 | • 페이지 전용 헬퍼<br>• 간단한 로직<br>• 상태 없음 | formatters, validators, helpers |

#### **페이지별 컴포넌트 vs Features 결정 기준**

| 기준 | 페이지별 컴포넌트 | features/ |
|------|-------------|-----------|
| **위치** | `app/[page]/sections/`, `app/[page]/components/`, `app/[page]/lib/` | `features/[name]/ui/` |
| **재사용성** | 해당 페이지에서만 사용 | 여러 페이지에서 재사용 |
| **기능 복잡도** | 페이지 특화 UI/콘텐츠 | 완전한 기능 단위 |
| **독립성** | 페이지에 종속적 | 완전히 독립적 |
| **계층 구조** | 단순 컴포넌트 | UI/API/Model/Lib 분리 |

#### **결정 플로우차트**

1. **완전한 기능 단위이면서 여러 페이지에서 재사용하는가?**
   - Yes → `features/[name]/` (UI/API/Model/Lib 구조)
   - No → 2번으로

2. **콘텐츠 섹션인가? (순서가 중요하고 내용 중심)**
   - Yes → `app/[page]/sections/`
   - No → 3번으로

3. **UI 컴포넌트인가? (애니메이션, 인터랙션, 시각효과)**
   - Yes → `app/[page]/components/`
   - No → 4번으로

4. **로직/유틸리티인가?**
   - 페이지 전용 → `app/[page]/lib/`
   - 전역 공유 → `shared/lib/`

### 3.2 Route Groups 활용 전략

**체계적 라우팅 구조를 위한 Route Groups 패턴:**

#### **인증별 그룹화** - 접근 권한 기준
```
app/
├── (auth)/                    # 인증 관련 페이지
│   ├── layout.tsx            # AuthLayout 연결
│   ├── login/page.tsx        # LoginForm Feature 연결
│   └── register/page.tsx     # RegisterForm Feature 연결
├── (dashboard)/              # 보호된 관리 페이지
│   ├── layout.tsx            # DashboardLayout 연결  
│   ├── page.tsx              # DashboardHome 연결
│   └── users/
│       ├── page.tsx          # UserList Feature 연결
│       └── [id]/page.tsx     # UserDetail Feature 연결
└── (marketing)/              # 공개 마케팅 페이지
    ├── layout.tsx            # MarketingLayout 연결
    └── page.tsx              # LandingPage 연결
```

#### **라우팅 설계 원칙**
- **Route Groups**: 기능/권한별 URL 그룹화로 코드 조직화
- **Layout 관리**: 그룹별 Shared Layout 또는 페이지별 특화 레이아웃
- **Feature 연결**: 페이지는 Feature 공개 API(`features/*/index.ts`)만 import
- **동적 라우팅**: `[id]`, `[...slug]` 패턴으로 유연한 URL 구조

### 3.3 Advanced 라우팅 패턴

#### **Parallel Routes** - 병렬 라우팅
```
app/dashboard/
├── @analytics/              # 병렬 슬롯
│   └── page.tsx
├── @team/                   # 병렬 슬롯
│   └── page.tsx
├── layout.tsx               # 두 슬롯을 렌더링
└── page.tsx                 # 기본 페이지
```


## 4. Features 계층 구현 가이드

### 4.1 Feature 아키텍처 원칙

#### **Feature 독립성 원칙**
- **완전 자립**: 각 Feature는 독립적으로 동작 가능한 모듈
- **경계 명확**: UI, API, Model, Lib 레이어 분리
- **공개 API**: Feature는 `index.ts`를 통해서만 외부 노출
- **의존성 제한**: Feature 간 직접 내부 파일 참조 금지

#### **레이어 의존성 원칙**
- **하향 의존**: UI → Model → API → Lib (역방향 금지)
- **Feature 사용**: app/과 다른 Feature는 공개 API(`features/*/index.ts`)만 사용
- **Shared 활용**: 공통 기능은 shared/ 레이어 활용

#### **Feature 내부 구조**
```
features/[feature-name]/
├── ui/           # React 컴포넌트 (UI 레이어)
├── api/          # API 호출 및 데이터 페칭
├── model/        # 비즈니스 로직 및 상태 관리
├── lib/          # Feature 전용 유틸리티
└── index.ts      # 공개 API (외부 노출 인터페이스)
```

**공개 API 예시**:
```typescript
// features/auth/index.ts
export { LoginForm, SignupForm } from './ui'
export { useAuth, authActions } from './model'
export { authApi } from './api'
// 내부 구현 세부사항은 노출하지 않음
```

### 4.2 상태 관리 및 비즈니스 로직

#### **Feature 레벨 상태 관리**
- **Model 레이어**: `features/*/model/`에서 Feature 전용 상태 관리
- **API 레이어**: `features/*/api/`에서 데이터 페칭 및 외부 통신
- **Lib 레이어**: `features/*/lib/`에서 Feature 전용 유틸리티 구현

#### **구현 원칙**
- **UI → Model → API → Lib** 순서의 하향 의존성 준수
- **독립성 보장**: 다른 Feature에 대한 직접 참조 금지
- **Shared 활용**: 공통 기능은 shared/ 레이어 활용

> **상세한 UI 컴포넌트 스타일링 가이드는 [7. 테마 및 스타일 관리](#7-테마-및-스타일-관리) 섹션을 참조하세요.**

## 5. 레이아웃 관리 전략

**3계층 레이아웃 관리 원칙:**

### 5.1 루트 레이아웃 관리 (`app/layout.tsx`)
- **전역 설정**: HTML 구조, 폰트, 메타데이터, 전역 Provider
- **기술적 기반**: Next.js 필수 설정, SEO, 접근성 기본 구성
- **앱 전체 영향**: 모든 페이지에 공통으로 적용되는 최상위 설정
- **예시**: ThemeProvider, 폰트 로딩, 전역 스타일, 메타데이터

### 5.2 중앙집중 관리 대상 (`shared/ui/layouts/`)
- **재사용 레이아웃**: 여러 페이지에서 사용되는 레이아웃 템플릿
- **공통 UI 구성**: Header, Footer, Navigation, Sidebar 등 공통 요소
- **비즈니스 로직**: 레이아웃 수준의 상태 관리와 상호작용
- **예시**: AuthLayout, DashboardLayout, MarketingLayout

### 5.3 페이지별 관리 대상 (`app/[page]/layout.tsx`)
- **라우트별 특화**: 특정 경로/기능에서만 사용되는 레이아웃
- **Shared 레이아웃 연결**: shared 레이아웃 컴포넌트를 import하여 사용
- **페이지별 커스터마이징**: 특별한 배치나 구조가 필요한 경우
- **예시**: shared/DashboardLayout 사용 또는 독립적인 페이지별 구성

### 5.4 레이아웃 계층 구조
```
Root Layout (app/layout.tsx)           # 전역 설정 (폰트, 메타데이터)
├─ Shared Layout (shared/ui/layouts/)  # 재사용 가능한 공통 레이아웃
└─ Page Layout (app/[page]/layout.tsx) # 페이지별 특화 레이아웃
```

### 5.5 결정 기준 플로우
1. **전역 설정 (폰트, Provider, 메타데이터)인가?**
   - Yes → `app/layout.tsx`
   - No → 2번으로

2. **여러 페이지에서 재사용하나?** 
   - Yes → `shared/ui/layouts/`
   - No → 3번으로

3. **특정 라우트 그룹에서만 사용하나?**
   - Yes → `app/[page]/layout.tsx`
   - No → `shared/ui/layouts/`

### 5.6 구현 예시

```typescript
// app/layout.tsx - 루트 레이아웃 (전역 설정)
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// shared/ui/layouts/DashboardLayout.tsx - 공통 대시보드 레이아웃
export function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

// app/(admin)/layout.tsx - 관리자 페이지 특화 레이아웃
import { DashboardLayout } from '@/shared/ui/layouts'

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout>
      <AdminHeader />
      {children}
      <AdminFooter />
    </DashboardLayout>
  )
}
```

## 6. UI 컴포넌트 디자인 및 구현

### 6.1 Feature-First 아키텍처에서의 컴포넌트 설계

#### **계층별 컴포넌트 책임 분리**
- **Features 계층**: 독립적 비즈니스 로직을 가진 완전한 기능 컴포넌트
- **App 계층**: 페이지별 특화 컴포넌트와 Feature 조합
- **Shared 계층**: 재사용 가능한 공통 UI 컴포넌트
- **Components 계층**: shadcn/ui 등 외부 라이브러리 원본 보관

#### **컴포넌트 독립성 원칙**
각 Feature의 UI 컴포넌트는 완전히 독립적으로 동작해야 하며, `className` prop과 `{...props}` 전파를 통해 외부에서 유연하게 커스터마이징할 수 있어야 합니다. 이를 통해 다양한 페이지와 컨텍스트에서 재사용 가능한 모듈을 구축합니다.

### 6.2 현대적 UI 배치 및 간격 시스템

#### **상대 위치 중심 설계 원칙**
절대 위치(absolute, fixed)보다는 상대 위치 기반의 자연스러운 흐름 배치를 우선 사용합니다. 이는 반응형 디자인과 유지보수성 측면에서 핵심적인 원칙입니다.

**Flexbox 기반 배치:**
- **기본 선택**: `flex`, `flex-col`, `flex-row`로 방향 설정
- **정렬**: `items-center`, `justify-between`, `justify-center` 등으로 정렬
- **간격**: `gap-4`, `gap-6`, `gap-8` 등으로 요소 간 일관된 간격
- **자동 확장**: `flex-1`, `flex-auto`로 유연한 공간 분배

**Grid 기반 복잡한 레이아웃:**
- **반응형 그리드**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **그리드 간격**: `gap-4`, `gap-6`, `gap-x-4 gap-y-6` 등
- **명시적 영역**: `grid-areas`로 복잡한 레이아웃 정의
- **자동 배치**: `auto-fit`, `auto-fill`로 동적 컬럼 수

**Tailwind Spacing System 활용:**
- **일관된 스케일**: 0.25rem 단위(space-1, space-2, space-4 등)
- **시맨틱 간격**: `space-y-*`로 수직 간격, `space-x-*`로 수평 간격
- **패딩/마진**: `p-4`, `py-6`, `px-8` 등으로 내부/외부 여백
- **반응형 간격**: `space-y-4 md:space-y-6 lg:space-y-8`

#### **절대 위치 사용 제한**
절대 위치는 다음과 같은 특수한 경우에만 사용합니다:
- **오버레이**: 모달, 드롭다운, 툴팁 등
- **고정 요소**: 플로팅 버튼, 스티키 헤더 등
- **특수 효과**: 배경 장식, 애니메이션 요소 등

```typescript
// 올바른 상대 위치 기반 레이아웃
<div className="flex flex-col gap-6">
  <header className="flex items-center justify-between p-6">
    <Logo />
    <Navigation />
  </header>
  <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 px-6">
    <aside className="space-y-4">
      <FilterPanel />
    </aside>
    <section className="lg:col-span-2 space-y-6">
      <ContentList />
    </section>
  </main>
</div>

// 절대 위치는 특수한 경우만
<div className="relative">
  <button>메뉴</button>
  <div className="absolute top-full left-0 z-50 mt-2">
    <DropdownMenu />
  </div>
</div>
```

#### **테마 변수 통합 배치**
CSS Variables를 활용해 페이지별 맞춤 간격과 배치를 동적으로 조정할 수 있습니다. shadcn/ui의 디자인 토큰 시스템과 연동하여 일관된 시각적 계층구조를 유지합니다.

```typescript
// 테마별 간격 시스템
<div 
  className="space-y-[var(--section-gap)] p-[var(--content-padding)]"
  style={{
    '--section-gap': '3rem',    // 섹션 간 간격
    '--content-padding': '2rem', // 콘텐츠 패딩
    '--card-spacing': '1.5rem'   // 카드 간 간격
  }}
>
```

### 6.3 shadcn/ui 기반 컴포넌트 확장 전략

#### **원본 보존 + Wrapper 확장**
shadcn/ui CLI로 설치된 컴포넌트는 절대 수정하지 않고, Shared 계층에서 wrapper 컴포넌트를 생성하여 프로젝트별 요구사항을 충족합니다. 이를 통해 업데이트 호환성을 유지하면서도 커스터마이징이 가능합니다.

#### **CVA 패턴 활용**
Class Variance Authority(CVA)를 활용하여 체계적인 variant 시스템을 구축합니다. size, variant, state 등의 props를 통해 일관된 컴포넌트 API를 제공하고, 디자인 시스템의 확장성을 보장합니다.

### 6.4 반응형 컴포넌트 설계

#### **Container Queries 활용**
전통적인 미디어 쿼리 대신 Container Queries를 활용하여 컨테이너 크기에 따른 컴포넌트 적응을 구현합니다. Feature 컴포넌트가 어떤 페이지에 배치되더라도 일관된 반응형 동작을 보장합니다.

```typescript
// Container Queries 기반 반응형 컴포넌트
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    {items.map(item => <Card key={item.id} {...item} />)}
  </div>
</div>
```

#### **Grid Areas 기반 복잡한 레이아웃**
복잡한 컴포넌트 내부 구조는 CSS Grid Areas를 활용하여 명시적으로 영역을 정의합니다. 특히 대시보드 위젯이나 카드 컴포넌트에서 헤더, 콘텐츠, 액션 영역의 관계를 명확하게 표현할 수 있습니다.

```typescript
// Grid Areas를 활용한 복잡한 카드 레이아웃
<div className="grid grid-areas-[header_header][content_sidebar][footer_footer] gap-4">
  <header className="grid-area-[header]">
    <CardTitle />
  </header>
  <main className="grid-area-[content]">
    <CardContent />
  </main>
  <aside className="grid-area-[sidebar]">
    <CardActions />
  </aside>
  <footer className="grid-area-[footer]">
    <CardFooter />
  </footer>
</div>
```

### 6.5 컴포넌트 API 설계 원칙

#### **필수 구현 표준**
모든 UI 컴포넌트는 다음 표준을 필수로 구현해야 합니다:

```typescript
// 표준 컴포넌트 API 패턴
export function FeatureComponent({ 
  className,    // 필수: 외부 스타일 오버라이드
  children, 
  ...props      // 필수: HTML 속성 전파
}) {
  return (
    <div 
      className={cn(
        // 기본 레이아웃: Flexbox/Grid 기반
        "flex flex-col gap-4",
        // 기본 스타일: 테마 변수 활용
        "bg-background border-border rounded-lg p-6",
        // 외부 커스터마이징 허용
        className
      )} 
      {...props}
    >
      {children}
    </div>
  )
}
```

#### **상태 관리 분류**
컴포넌트 상태는 다음과 같이 분류하여 관리합니다:
- **Stateless**: Props 기반 순수 컴포넌트
- **내부 상태**: UI 인터랙션 상태만 관리 (펼침/접힘, 모달 등)
- **비즈니스 상태**: Feature의 model 레이어에서 분리 관리

### 6.6 애니메이션 및 인터랙션 통합

#### **Framer Motion 분리 설계**
레이아웃과 애니메이션을 명확히 분리합니다. Tailwind로 기본 배치와 스타일을 정의하고, Framer Motion으로 애니메이션만 처리하는 방식으로 성능과 유지보수성을 동시에 확보합니다.

```typescript
// 배치와 애니메이션 분리 패턴
<motion.div 
  className="flex flex-col gap-4 p-6" // Tailwind로 레이아웃
  initial={{ opacity: 0, y: 20 }}      // Motion으로 애니메이션
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <ComponentContent />
</motion.div>
```

#### **점진적 향상 원칙**
기본 기능은 CSS만으로 동작하도록 구현하고, JavaScript 기반 인터랙션은 점진적 향상으로 추가합니다. 이를 통해 성능과 접근성을 보장하면서도 풍부한 사용자 경험을 제공할 수 있습니다.

### 6.7 성능 최적화 및 접근성

#### **CSS-in-CSS 우선**
JavaScript 기반 동적 스타일링보다는 CSS Variables와 Tailwind 클래스 조합을 우선 사용합니다. 런타임 성능을 최적화하고 SSR 호환성을 보장하며, 번들 크기도 최소화할 수 있습니다.

#### **논리적 속성 및 시맨틱 구조**
다국어 지원을 위해 논리적 속성(`ms-*`, `me-*`)을 활용하고, 적절한 ARIA 속성과 시맨틱 HTML 구조를 통해 접근성을 보장합니다. 키보드 내비게이션과 스크린 리더 호환성을 기본으로 고려합니다.

```typescript
// 논리적 속성과 접근성 고려
<nav 
  className="flex items-center gap-4 ms-auto me-4" // 논리적 margin
  aria-label="주요 내비게이션"
  role="navigation"
>
  <Button 
    className="focus:ring-2 focus:ring-primary"
    aria-describedby="button-help"
  >
    액션
  </Button>
</nav>
```

### 6.8 컴포넌트 설계 결정 가이드라인

**컴포넌트 위치 결정 플로우:**
1. **완전한 기능 단위이면서 재사용 가능한가?** → `features/*/ui/`
2. **페이지별 특화 컴포넌트인가?** → `app/[page]/components/`
3. **공통 UI 컴포넌트인가?** → `shared/ui/components/`
4. **외부 라이브러리 원본인가?** → `components/ui/`

**배치 방식 선택 우선순위:**
1. **Flexbox/Grid + Tailwind Spacing** (기본 선택)
2. **CSS Variables + 동적 조정** (테마별 차별화)
3. **Container Queries** (컨테이너 반응형)
4. **절대 위치** (특수 오버레이만)

이러한 체계적 접근을 통해 Feature-First 아키텍처에서 확장 가능하고 유지보수하기 쉬운 UI 컴포넌트 시스템을 구축할 수 있습니다.

## 7. 테마 및 스타일 관리

### 7.1 shadcn 기반 계층별 테마 관리 전략

**shadcn/ui CSS Variables 시스템을 기반으로 한 3단계 테마 관리:**

#### **1단계: 전역 테마 기반** - `shared/ui/themes/`
```typescript
// shared/ui/themes/base.ts - shadcn 호환 기본 테마
export const baseTheme = {
  light: {
    '--background': '0 0% 100%',
    '--foreground': '222.2 84% 4.9%',
    '--primary': '221.2 83.2% 53.3%',
    '--primary-foreground': '210 40% 98%',
    '--secondary': '210 40% 98%',
    '--secondary-foreground': '222.2 84% 4.9%',
    '--muted': '210 40% 96%',
    '--muted-foreground': '215.4 16.3% 46.9%',
    '--accent': '210 40% 96%',
    '--accent-foreground': '222.2 84% 4.9%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '210 40% 98%',
    '--border': '214.3 31.8% 91.4%',
    '--input': '214.3 31.8% 91.4%',
    '--ring': '221.2 83.2% 53.3%',
  },
  dark: {
    '--background': '222.2 84% 4.9%',
    '--foreground': '210 40% 98%',
    '--primary': '217.2 91.2% 59.8%',
    '--primary-foreground': '222.2 84% 4.9%',
    // ... 다른 다크 모드 변수들
  }
}
```

#### **2단계: 레이아웃별 테마** - `app/[page]/layout.tsx`
```typescript
// app/(gallery)/ux-gallery/layout.tsx
export default function UXGalleryLayout({ children }) {
  return (
    <div 
      className="flex flex-col min-h-screen"
      data-theme="gallery"
      style={{
        // shadcn 변수 오버라이드로 갤러리 테마 구현
        '--primary': '271 81% 56%',        // 보라색 브랜딩
        '--accent': '24 95% 53%',          // 오렌지 강조색
        '--background': '210 40% 98%',     // 연한 배경
        '--muted': '210 40% 96%',          // 부드러운 뮤트
      }}
    >
      <main className="flex-grow pt-20">
        {children}
      </main>
    </div>
  )
}
```

#### **3단계: 페이지별 세부 테마** - `app/[page]/page.tsx`
```typescript
// app/(gallery)/ux-gallery/content-immersion/page.tsx
export default function ContentImmersionPage() {
  return (
    <div 
      className="container mx-auto"
      data-page-theme="content-immersion"
      style={{
        // 갤러리 테마 기반으로 페이지별 조정
        '--primary': '260 85% 58%',        // 더 진한 보라
        '--accent': '30 100% 50%',         // 더 따뜻한 오렌지
      }}
    >
      <HeroSection />
      <ContentGrid />
    </div>
  )
}
```

#### **UI 컴포넌트 테마 적용 패턴**

**Pattern 1: shadcn 컴포넌트 직접 사용**
```typescript
// shadcn 컴포넌트는 자동으로 CSS Variables 사용
import { Button } from '@/components/ui/button'

<Button variant="default">
  {/* 자동으로 --primary, --primary-foreground 사용 */}
  갤러리 테마 버튼
</Button>
```

**Pattern 2: Feature 컴포넌트에서 테마 변수 활용**
```typescript
// features/gallery/ui/GalleryCard.tsx
export function GalleryCard({ className, ...props }) {
  return (
    <div 
      className={cn(
        // shadcn 변수 직접 참조로 테마 일관성 보장
        "bg-background border-border text-foreground",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  )
}
```

**Pattern 3: 페이지별 특수 컴포넌트**
```typescript
// app/(gallery)/ux-gallery/components/PageHeader.tsx
export function PageHeader({ title, description }) {
  return (
    <header className={cn(
      // 기본 테마 변수 사용
      "bg-primary/10 border-l-4 border-primary",
      // 페이지 테마에 따라 자동 변경됨
      "text-primary-foreground p-6 rounded-lg"
    )}>
      <h1 className="text-2xl font-bold text-primary">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </header>
  )
}
```

#### **테마 계층별 우선순위 및 상속**

```
전역 테마 (기본)
    ↓ 상속 및 오버라이드
레이아웃 테마 (data-theme="gallery")
    ↓ 상속 및 오버라이드  
페이지 테마 (data-page-theme="content-immersion")
    ↓ 적용
UI 컴포넌트 (shadcn + custom)
```

#### **실제 적용 예시: UX Gallery 테마 시스템**

```typescript
// shared/ui/themes/gallery-themes.ts
export const galleryThemes = {
  'content-immersion': {
    '--primary': '260 85% 58%',      // 깊은 보라 (몰입감 강조)
    '--accent': '30 100% 50%',       // 따뜻한 오렌지
    '--background': '220 13% 97%',   // 연한 회색 배경
  },
  'usability': {
    '--primary': '200 95% 45%',      // 신뢰감 있는 파랑
    '--accent': '120 60% 50%',       // 성공감 있는 녹색
    '--background': '210 40% 98%',   // 깔끔한 흰색
  },
  'interaction': {
    '--primary': '340 75% 55%',      // 활동적인 핑크
    '--accent': '50 90% 55%',        // 활기찬 노랑
    '--background': '330 25% 97%',   // 부드러운 핑크 톤
  }
}

// 사용법: 페이지별 테마 자동 적용
export function applyPageTheme(pageType: keyof typeof galleryThemes) {
  const theme = galleryThemes[pageType]
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}
```

#### **성능 최적화 및 관리 편의성**

**1. CSS Variables의 장점:**
- 런타임 테마 변경 가능
- JavaScript 없이 CSS만으로 테마 적용
- shadcn/ui와 완벽 호환
- 브라우저 네이티브 지원으로 고성능

**2. 관리 편의성:**
- 중앙집중식 테마 정의
- 계층별 일관성 보장
- 타입 안전성 (TypeScript 지원)
- 디자인 토큰과 1:1 매핑

**3. 확장성:**
- 새로운 페이지 테마 쉽게 추가
- 기존 컴포넌트 수정 없이 테마 변경
- 다크/라이트 모드 자동 지원

### 7.2 컴포넌트 구현 표준

#### **필수 구현 사항**
```typescript
// 모든 UI 컴포넌트 표준 패턴
export function FeatureComponent({ 
  className,    // 필수: 스타일 오버라이드용
  children, 
  ...props      // 필수: HTML 속성 전파
}) {
  return (
    <div 
      className={cn(
        "기본-스타일-클래스들", // 기본 스타일 정의
        className              // 외부에서 오버라이드 가능
      )} 
      {...props}              // HTML 속성 전파
    >
      {children}
    </div>
  )
}
```

#### **금지 사항**
- **className 미지원**: 모든 UI 컴포넌트는 className prop 필수
- **하드코딩 스타일**: 오버라이드 불가능한 인라인 스타일 사용 금지

#### **검증 체크리스트**
- [ ] `className?: string` prop 포함
- [ ] `cn()` 함수로 스타일 병합
- [ ] `{...props}` 전파
- [ ] 임의 값 동작 확인: `className="bg-[#custom] w-[300px]"`

### 7.3 스타일링 패턴: 언제 무엇을 사용할까?

**우선순위 기반 패턴 선택:**

```
Theme Variables (기본) → CVA Patterns (시스템) → Arbitrary Values (예외)
```

#### Pattern 1: Theme Variables (기본 선택)
**언제 사용:** 색상, 간격, 타이포그래피 등 디자인 토큰 활용 시
```tsx
// 권장: theme variables 활용
className="bg-primary text-primary-foreground p-section-padding"

// 비권장: 하드코딩된 값
className="bg-blue-500 text-white p-8"
```

#### Pattern 2: CVA Patterns (컴포넌트 시스템)
**언제 사용:** 재사용 가능한 컴포넌트에서 variant 시스템 구축 시
```tsx
// 권장: CVA로 variant 시스템 구축
const buttonVariants = cva("base-styles", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground"
    }
  }
})
```

#### Pattern 3: Arbitrary Values (특수 상황)
**언제 사용:** 디자인 토큰으로 표현할 수 없는 일회성 스타일
```tsx
// 권장: 특수한 레이아웃이나 애니메이션
className="translate-x-[calc(100vw-200px)] before:content-['★']"

// 비권장: 표준 값들을 arbitrary로 표현
className="p-[32px] text-[16px]" // → "p-8 text-base" 사용
```

**결합 사용 가이드:**
```tsx
// 패턴들을 적절히 결합
<div className={cn(
  // 1. Theme variables (기본)
  "bg-background text-foreground p-section-padding",
  // 2. CVA variants (시스템)
  cardVariants({ variant, size }),
  // 3. Arbitrary values (예외적 조정)
  "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:to-accent/10",
  // 4. 외부 className (오버라이드)
  className
)}>
```

## 8. Shared 모듈 구조

### 8.1 shadcn/ui와 Shared 컴포넌트 분리

#### shadcn/ui 컴포넌트 관리 (`components/ui/`)
- **절대 수정 금지**: shadcn CLI로 설치된 컴포넌트는 원본 그대로 유지
- **래핑 또는 확장**: 커스터마이징이 필요하면 shared/ui/components/에서 wrapper 생성
- **업데이트 호환**: CLI 업데이트 시 충돌 방지를 위해 원본 보존 필수

#### Shared 컴포넌트 관리 (`shared/ui/components/`)
- **커스텀 컴포넌트**: 프로젝트 특화 컴포넌트만 위치
- **shadcn 확장**: shadcn 컴포넌트를 래핑하여 커스텀 기능 추가
- **비즈니스 로직**: 도메인 특화 로직이 포함된 컴포넌트

### 8.2 컴포넌트 사용 우선순위
1. **shadcn 우선**: 기본 UI 컴포넌트는 `@/components/ui`에서 import
2. **Shared 보완**: 커스텀 기능이 필요한 경우 `@/shared/ui/components`에서 import
3. **Feature 전용**: Feature별 특화 컴포넌트는 `features/*/ui`에서 관리

### 8.3 Import 패턴
```typescript
// 1. shadcn 기본 컴포넌트 사용
import { Button, Input, Card } from '@/components/ui'

// 2. Shared 커스텀 컴포넌트 사용  
import { DataTable, FormWrapper } from '@/shared/ui/components'

// 3. Feature 전용 컴포넌트 사용
import { LoginForm } from '@/features/auth' // 공개 API 사용
```

**shadcn 컴포넌트 커스터마이징 예시**:
```typescript
// 잘못된 방법 - shadcn 원본 수정
// components/ui/button.tsx를 직접 수정하지 마세요!

// 올바른 방법 - Shared에서 wrapper 생성
// shared/ui/components/CustomButton.tsx
import { Button } from '@/components/ui/button'
import { cn } from '@/shared/lib'

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean
}

export function CustomButton({ loading, className, children, ...props }: CustomButtonProps) {
  return (
    <Button 
      className={cn("relative", className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner className="mr-2" />}
      {children}
    </Button>
  )
}
```

### 8.4 네이밍 충돌 방지
- **shadcn 컴포넌트**: 기본 이름 유지 (Button, Input, Card)
- **Shared 컴포넌트**: 접두사 또는 명확한 네이밍 (DataTable, FormWrapper, CustomButton)
- **중복 방지**: 같은 이름의 컴포넌트가 두 폴더에 존재하지 않도록 관리

### 8.5 Shared 컴포넌트 상태 관리

**현대적 상태 관리 3가지 패턴:**

```typescript
// 1. 순수 Stateless 컴포넌트 - Props 기반
export function SearchInput({ value, onChange, placeholder, ...props }) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-md px-3 py-2"
      {...props}
    />
  )
}

// 2. 복합 UI 상태 - 내부 State + Callback
export function CollapsiblePanel({ title, children, defaultOpen = false, onToggle }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle?.(newState)
  }

  return (
    <div className="border rounded-lg">
      <button onClick={handleToggle} className="w-full p-4 text-left">
        {title}
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  )
}

// 3. 글로벌 UI 상태 - Context + Provider 패턴
const ToastContext = createContext(undefined)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  
  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 5000)
  }
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
```

### 8.6 상태 관리 분류
- **순수 Stateless**: SearchInput, Card, Badge 등 Props만 사용
- **복합 UI 상태**: CollapsiblePanel, Modal 등 내부 상태 + 외부 콜백
- **글로벌 UI 상태**: Toast, Theme, Modal Manager 등 앱 전체 영향

### 8.7 폴더별 역할 정의
- **`shared/ui/`**: 재사용 가능한 UI 컴포넌트와 레이아웃
- **`shared/lib/`**: 모든 공통 기능 (API, 유틸리티, 타입, 상수, 훅)
- **`shared/config/`**: 환경별 설정 파일

### 8.8 shared/lib 내부 구조

```typescript
// shared/lib/api-client.ts - API 클라이언트
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000
})

// shared/lib/utils.ts - 범용 헬퍼 함수
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

// shared/lib/types.ts - 공통 타입
export interface BaseEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// shared/lib/constants.ts - 전역 상수
export const APP_CONFIG = {
  NAME: 'My App',
  VERSION: '1.0.0'
} as const

export const HTTP_STATUS = {
  OK: 200,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404
} as const

// shared/lib/hooks.ts - 공통 React 훅
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  
  return debouncedValue
}
```

## 9. 상태 관리 계층 구조

### 9.1 Feature 레벨 상태 관리

**비즈니스 로직과 Feature 전용 상태는 `features/*/model/`에서 관리:**

```typescript
// features/auth/model/auth-store.ts - 인증 관련 비즈니스 상태
export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  login: async (credentials) => {
    set({ isLoading: true })
    const user = await authApi.login(credentials)
    set({ user, isLoading: false })
  },
  logout: () => set({ user: null })
}))
```

### 9.2 전역 상태 관리

**앱 전체에서 사용하는 UI 상태와 설정은 `shared/lib/`에서 관리:**

```typescript
// shared/lib/global-state.ts - 전역 UI 상태
export const useGlobalStore = create((set) => ({
  theme: 'light',
  language: 'ko',
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language })
}))
```

### 9.3 상태 관리 원칙
- **Feature 상태**: 해당 Feature의 비즈니스 로직과 데이터
- **전역 상태**: 앱 전체 UI 설정, 테마, 언어, 전역 모달 등
- **Shared 컴포넌트**: 비즈니스 상태는 금지, UI 상호작용 상태(펼침/접힘, 모달 등)는 허용
- **상태 격리**: Feature 간 상태 직접 참조 금지

## 10. 동적 라우팅 패턴

**동적 라우팅은 `[id]`, `[...slug]` 패턴을 사용하여 URL 파라미터를 처리합니다:**

- **파라미터 기반**: `app/users/[id]/page.tsx` → `/users/123`
- **검색 파라미터**: `searchParams`로 쿼리 스트링 처리
- **캐치올 라우트**: `[...slug]`로 다중 세그먼트 처리

## 11. 네이밍 컨벤션

### 11.1 폴더/파일 네이밍

#### **폴더**: kebab-case (소문자 + 하이픈)
```
✅ user-management/, payment 
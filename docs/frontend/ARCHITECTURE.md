# Frontend Architecture Guide

> 이 문서는 Frontend 개발 시 준수해야 할 아키텍처 규칙과 패턴을 정의합니다.

## Feature-Sliced Design (FSD)

### 레이어 구조

```
┌─────────────────────────────────────────────────────────────┐
│                          app                                │
│            (초기화, 프로바이더, 라우터, 스타일)               │
├─────────────────────────────────────────────────────────────┤
│                         pages                               │
│                    (페이지 컴포넌트)                         │
├─────────────────────────────────────────────────────────────┤
│                        widgets                              │
│              (독립적 UI 블록, 레이아웃)                       │
├─────────────────────────────────────────────────────────────┤
│                       features                              │
│                   (비즈니스 기능)                            │
├─────────────────────────────────────────────────────────────┤
│                       entities                              │
│                  (비즈니스 엔티티)                           │
├─────────────────────────────────────────────────────────────┤
│                        shared                               │
│              (공유 유틸리티, UI, API)                        │
└─────────────────────────────────────────────────────────────┘
```

### 의존성 규칙

```
app → pages → widgets → features → entities → shared
 ↓      ↓        ↓          ↓          ↓         ↓
        하위 레이어만 import 가능 (상위 레이어 import 금지)
```

- **절대 규칙**: 상위 레이어에서 하위 레이어만 import 가능
- pages는 entities를 직접 import 가능 (중간 레이어 건너뛰기 허용)
- 같은 레이어 내 슬라이스 간 import 금지 (cross-import 금지)

---

## 레이어별 역할과 구성요소

### 1. App Layer

**역할**: 애플리케이션 초기화, 전역 설정

**구성요소**:
| 요소 | 설명 |
|------|------|
| providers/ | Context Providers (Auth, Theme, Query 등) |
| router/ | React Router 설정 |
| styles/ | 글로벌 CSS, CSS 변수 |

**디렉토리 구조**:
```
app/
├── providers/
│   ├── AuthProvider.tsx
│   ├── QueryProvider.tsx
│   └── index.tsx
├── router/
│   ├── routes.tsx
│   ├── AdminRoutes.tsx
│   ├── CustomerRoutes.tsx
│   └── index.tsx
├── styles/
│   ├── global.css
│   └── variables.css
└── App.tsx
```

### 2. Pages Layer

**역할**: 라우트에 매핑되는 페이지 컴포넌트

**구성요소**:
| 요소 | 설명 |
|------|------|
| admin/ | 관리자 페이지들 |
| customer/ | 고객 페이지들 |

**디렉토리 구조**:
```
pages/
├── admin/
│   ├── LoginPage/
│   │   ├── ui/
│   │   │   └── LoginPage.tsx
│   │   └── index.ts
│   ├── ReservationListPage/
│   │   ├── ui/
│   │   │   └── ReservationListPage.tsx
│   │   └── index.ts
│   └── index.ts
└── customer/
    ├── ReservationPage/
    │   ├── ui/
    │   │   └── ReservationPage.tsx
    │   └── index.ts
    └── index.ts
```

### 3. Widgets Layer

**역할**: 독립적으로 동작하는 UI 블록

**구성요소**:
| 요소 | 설명 |
|------|------|
| header/ | 헤더 컴포넌트 |
| sidebar/ | 사이드바 컴포넌트 |
| footer/ | 푸터 컴포넌트 |
| layout/ | 레이아웃 컴포넌트 |

**디렉토리 구조**:
```
widgets/
├── header/
│   ├── ui/
│   │   └── Header.tsx
│   └── index.ts
├── sidebar/
│   ├── ui/
│   │   └── Sidebar.tsx
│   └── index.ts
├── layout/
│   ├── ui/
│   │   ├── AdminLayout.tsx
│   │   └── CustomerLayout.tsx
│   └── index.ts
└── footer/
    ├── ui/
    │   └── Footer.tsx
    └── index.ts
```

### 4. Features Layer

**역할**: 사용자 시나리오, 비즈니스 기능

**구성요소**:
| 요소 | 설명 |
|------|------|
| ui/ | 기능 관련 UI 컴포넌트 |
| model/ | 상태 관리, hooks |
| api/ | 기능 관련 API 호출 |
| lib/ | 기능 관련 유틸리티 |

**디렉토리 구조**:
```
features/
├── auth/
│   ├── ui/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── model/
│   │   ├── useAuth.ts
│   │   └── authStore.ts
│   ├── api/
│   │   └── authApi.ts
│   └── index.ts
└── reservation/
    ├── ui/
    │   ├── ReservationForm.tsx
    │   ├── ReservationList.tsx
    │   └── ReservationCard.tsx
    ├── model/
    │   ├── useReservation.ts
    │   └── useReservationForm.ts
    ├── api/
    │   └── reservationApi.ts
    ├── lib/
    │   └── reservationValidation.ts
    └── index.ts
```

### 5. Entities Layer

**역할**: 비즈니스 엔티티 표현

**구성요소**:
| 요소 | 설명 |
|------|------|
| ui/ | 엔티티 표현 UI |
| model/ | 엔티티 타입, 상태 |
| api/ | 엔티티 CRUD API |

**디렉토리 구조**:
```
entities/
├── reservation/
│   ├── ui/
│   │   └── ReservationStatusBadge.tsx
│   ├── model/
│   │   └── types.ts
│   ├── api/
│   │   └── reservationApi.ts
│   └── index.ts
├── admin/
│   ├── model/
│   │   └── types.ts
│   └── index.ts
└── customer/
    ├── model/
    │   └── types.ts
    └── index.ts
```

### 6. Shared Layer

**역할**: 재사용 가능한 공통 모듈

**구성요소**:
| 요소 | 설명 |
|------|------|
| ui/ | 공통 UI 컴포넌트 (Button, Input 등) |
| api/ | API 클라이언트, 인터셉터 |
| lib/ | 유틸리티 함수 |
| config/ | 환경 설정 |
| types/ | 공통 TypeScript 타입 |

**디렉토리 구조**:
```
shared/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   └── index.ts
├── api/
│   ├── apiClient.ts
│   ├── interceptors.ts
│   └── index.ts
├── lib/
│   ├── formatDate.ts
│   ├── formatPhone.ts
│   └── index.ts
├── config/
│   └── env.ts
└── types/
    ├── api.ts
    ├── reservation.ts
    └── index.ts
```

---

## 슬라이스 내부 구조 (Segment)

각 슬라이스(폴더)는 다음 세그먼트를 가질 수 있습니다:

| Segment | 설명 | 예시 |
|---------|------|------|
| ui/ | React 컴포넌트 | `LoginForm.tsx` |
| model/ | 비즈니스 로직, 상태 | `useAuth.ts`, `types.ts` |
| api/ | API 호출 | `authApi.ts` |
| lib/ | 유틸리티 | `validation.ts` |
| config/ | 설정 | `constants.ts` |

**Public API (index.ts)**:
```typescript
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm'
export { RegisterForm } from './ui/RegisterForm'
export { useAuth } from './model/useAuth'
export type { AuthState } from './model/types'
```

---

## 컴포넌트 작성 패턴

### 함수형 컴포넌트 + Named Export

```typescript
// features/auth/ui/LoginForm.tsx
import { useState } from 'react'
import { Button, Input } from '@/shared/ui'
import { useAuth } from '../model/useAuth'
import styles from './LoginForm.module.css'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ username, password })
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" loading={isLoading}>
        로그인
      </Button>
    </form>
  )
}
```

### API 호출 패턴 (TanStack Query)

```typescript
// features/reservation/api/reservationApi.ts
import { apiClient } from '@/shared/api'
import type { Reservation, CreateReservationRequest } from '@/shared/types'

export const reservationApi = {
  getAll: () => 
    apiClient.get<Reservation[]>('/api/admin/reservations'),
  
  getById: (id: number) => 
    apiClient.get<Reservation>(`/api/admin/reservations/${id}`),
  
  create: (data: CreateReservationRequest) => 
    apiClient.post<Reservation>('/api/admin/reservations', data),
  
  update: (id: number, data: Partial<CreateReservationRequest>) => 
    apiClient.put<Reservation>(`/api/admin/reservations/${id}`, data),
  
  delete: (id: number) => 
    apiClient.delete(`/api/admin/reservations/${id}`),
}
```

### Custom Hook 패턴

```typescript
// features/reservation/model/useReservations.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reservationApi } from '../api/reservationApi'

export function useReservations() {
  const queryClient = useQueryClient()

  const { data: reservations, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: () => reservationApi.getAll().then(res => res.data),
  })

  const createMutation = useMutation({
    mutationFn: reservationApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
    },
  })

  return {
    reservations: reservations ?? [],
    isLoading,
    create: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  }
}
```

---

## Import 규칙

### Path Alias 사용

```typescript
// tsconfig.app.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Import 순서

```typescript
// 1. React/외부 라이브러리
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. 상위 레이어 (허용된 경우만)
import { AdminLayout } from '@/widgets/layout'

// 3. 같은 레이어의 다른 슬라이스 (금지! - 아래 예시는 잘못된 것)
// import { useAuth } from '@/features/auth' // ❌ features 내 cross-import

// 4. 하위 레이어
import { Button, Input } from '@/shared/ui'
import { apiClient } from '@/shared/api'

// 5. 현재 슬라이스 내부
import { useReservation } from '../model/useReservation'
import styles from './ReservationForm.module.css'
```

---

## 금지 사항

### 1. 상위 레이어 Import 금지

```typescript
// ❌ BAD - shared에서 features import
// shared/ui/Button.tsx
import { useAuth } from '@/features/auth' // 상위 레이어 import 금지!

// ✅ GOOD - 하위 레이어만 import
// features/auth/ui/LoginForm.tsx
import { Button } from '@/shared/ui' // 하위 레이어 OK
```

### 2. 같은 레이어 Cross-Import 금지

```typescript
// ❌ BAD - features 내 다른 슬라이스 import
// features/reservation/ui/ReservationForm.tsx
import { useAuth } from '@/features/auth' // 같은 레이어 cross-import 금지!

// ✅ GOOD - 상위 레이어(pages)에서 조합
// pages/admin/ReservationPage.tsx
import { useAuth } from '@/features/auth'
import { ReservationForm } from '@/features/reservation'
```

### 3. Default Export 금지

```typescript
// ❌ BAD
export default function LoginForm() { ... }

// ✅ GOOD
export function LoginForm() { ... }
```

### 4. 비즈니스 로직을 UI에 직접 작성 금지

```typescript
// ❌ BAD - 컴포넌트에 비즈니스 로직 직접 작성
function ReservationForm() {
  const handleSubmit = async () => {
    const response = await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    // 복잡한 비즈니스 로직...
  }
}

// ✅ GOOD - hook으로 분리
function ReservationForm() {
  const { create, isCreating } = useReservations()
  
  const handleSubmit = async () => {
    await create(data)
  }
}
```

---

## 페이지 구성 예시

```typescript
// pages/admin/ReservationListPage/ui/ReservationListPage.tsx
import { useState } from 'react'
import { AdminLayout } from '@/widgets/layout'
import { ReservationList, ReservationFilter } from '@/features/reservation'
import { useReservations } from '@/features/reservation'
import styles from './ReservationListPage.module.css'

export function ReservationListPage() {
  const [filter, setFilter] = useState<FilterState>({})
  const { reservations, isLoading } = useReservations(filter)

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1>예약 관리</h1>
        <ReservationFilter value={filter} onChange={setFilter} />
        <ReservationList 
          reservations={reservations} 
          loading={isLoading} 
        />
      </div>
    </AdminLayout>
  )
}
```

---

## 체크리스트

개발 시 다음 사항을 확인하세요:

- [ ] 상위 레이어만 하위 레이어를 import하는가?
- [ ] 같은 레이어 내 슬라이스 간 import가 없는가?
- [ ] Named export를 사용하는가?
- [ ] 비즈니스 로직이 hook/model로 분리되어 있는가?
- [ ] 공통 컴포넌트는 shared/ui에 있는가?
- [ ] API 호출은 api/ 세그먼트에 있는가?
- [ ] Public API(index.ts)를 통해 export하는가?

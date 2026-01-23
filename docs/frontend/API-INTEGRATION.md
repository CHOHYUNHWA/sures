# React Frontend API 연동 가이드

> React 앱에서 백엔드 REST API와 JWT 인증 연동 방법

## 목차
1. [아키텍처 개요](#1-아키텍처-개요)
2. [인증 흐름](#2-인증-흐름)
3. [API Client 설정](#3-api-client-설정)
4. [인증 상태 관리](#4-인증-상태-관리)
5. [API 호출 패턴](#5-api-호출-패턴)
6. [페이지별 연동](#6-페이지별-연동)

---

## 1. 아키텍처 개요

### 1.1 전체 구조

```mermaid
flowchart TB
    subgraph Client["React Frontend :3000"]
        subgraph App["App Layer"]
            QP["QueryProvider<br/>(TanStack Query)"]
            AP["AuthProvider<br/>(Context)"]
            RP["RouterProvider<br/>(React Router)"]
        end

        subgraph Pages["Pages Layer"]
            CP["Customer Pages<br/>- Home<br/>- Apply<br/>- Verify<br/>- Detail"]
            ADP["Admin Pages<br/>- Login<br/>- Reservations<br/>- Create/Edit"]
        end

        subgraph Features["Features Layer"]
            Auth["auth/<br/>- useAuth()<br/>- useLogin()<br/>- LoginForm"]
            Res["reservation/<br/>- useReservations()<br/>- DateSelector<br/>- TimeGrid"]
        end

        subgraph Shared["Shared Layer"]
            API["api/<br/>client.ts"]
            UI["ui/<br/>Button, Input"]
            Types["types/<br/>models"]
        end
    end

    subgraph Backend["Spring Boot :8080"]
        AuthAPI["/api/admin/auth/*"]
        AdminAPI["/api/admin/reservations/*"]
        CustAPI["/api/customer/*"]
    end

    App --> Pages
    Pages --> Features
    Features --> Shared

    API -->|"HTTP + JWT"| AuthAPI
    API -->|"HTTP + JWT"| AdminAPI
    API -->|"HTTP"| CustAPI
```

### 1.2 데이터 흐름

```mermaid
flowchart LR
    subgraph Component["React Component"]
        Hook["useReservations(params)"]
    end

    subgraph TanStack["TanStack Query"]
        Cache["캐시 관리<br/>staleTime: 5분"]
        State["로딩/에러 상태"]
    end

    subgraph APILayer["API Layer"]
        Func["reservationApi.getList()"]
    end

    subgraph Axios["Axios Client"]
        Req["Request Interceptor<br/>JWT 토큰 추가"]
        Res["Response Interceptor<br/>401 에러 처리"]
    end

    Backend[("Backend API")]

    Hook --> TanStack
    TanStack --> APILayer
    APILayer --> Axios
    Axios --> Backend
    Backend --> Axios
    Axios --> TanStack
    TanStack --> Hook
```

---

## 2. 인증 흐름

### 2.1 로그인 흐름

```mermaid
sequenceDiagram
    autonumber
    actor User as 사용자
    participant LP as LoginPage
    participant Hook as useLogin()
    participant API as apiClient
    participant BE as Backend
    participant LS as localStorage
    participant Ctx as AuthContext

    User->>LP: 아이디/비밀번호 입력
    LP->>Hook: mutate({username, password})
    Hook->>API: POST /api/admin/auth/login
    API->>BE: HTTP Request

    BE->>BE: 인증 처리
    BE->>BE: JWT 토큰 생성

    BE-->>API: {accessToken, refreshToken, adminInfo}
    API-->>Hook: Response

    Hook->>LS: 토큰 저장
    Hook->>Ctx: 인증 상태 업데이트
    Hook->>LP: 성공 콜백

    LP->>User: /admin/reservations 이동
```

### 2.2 인증된 API 요청 흐름

```mermaid
sequenceDiagram
    autonumber
    participant Comp as Component
    participant TQ as TanStack Query
    participant Axios as Axios Interceptor
    participant LS as localStorage
    participant BE as Backend

    Comp->>TQ: useReservations()
    TQ->>Axios: GET /api/admin/reservations

    Axios->>LS: accessToken 조회
    LS-->>Axios: token

    Axios->>Axios: Authorization 헤더 추가
    Axios->>BE: Request + Bearer Token

    BE->>BE: JWT 검증
    BE->>BE: 데이터 조회

    BE-->>Axios: 200 OK {data}
    Axios-->>TQ: Response

    TQ->>TQ: 캐시 저장
    TQ-->>Comp: {data, isLoading: false}
```

### 2.3 토큰 만료 시 흐름

```mermaid
sequenceDiagram
    autonumber
    participant Comp as Component
    participant Axios as Axios Interceptor
    participant LS as localStorage
    participant BE as Backend
    participant Router as React Router

    Comp->>Axios: API 요청
    Axios->>LS: 만료된 토큰 조회
    Axios->>BE: Request + 만료된 Token

    BE-->>Axios: 401 Unauthorized

    Axios->>LS: 토큰 삭제
    Axios->>Router: /admin/login 리다이렉트

    Router-->>Comp: 로그인 페이지 표시
```

---

## 3. API Client 설정

### 3.1 Axios 설정 구조

```mermaid
flowchart TB
    subgraph AxiosInstance["Axios Instance"]
        Config["baseURL: localhost:8080<br/>timeout: 10000<br/>Content-Type: application/json"]
    end

    subgraph ReqInterceptor["Request Interceptor"]
        GetToken["localStorage에서<br/>accessToken 조회"]
        AddHeader["Authorization 헤더 추가<br/>Bearer {token}"]
    end

    subgraph ResInterceptor["Response Interceptor"]
        Check401["401 에러 확인"]
        ClearAuth["토큰 삭제<br/>인증 정보 초기화"]
        Redirect["로그인 페이지<br/>리다이렉트"]
    end

    AxiosInstance --> ReqInterceptor
    ReqInterceptor --> GetToken
    GetToken --> AddHeader

    AxiosInstance --> ResInterceptor
    ResInterceptor --> Check401
    Check401 -->|"401"| ClearAuth
    ClearAuth --> Redirect
```

### 3.2 코드

```typescript
// src/shared/api/client.ts

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('adminInfo')

      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  }
)
```

---

## 4. 인증 상태 관리

### 4.1 AuthContext 구조

```mermaid
flowchart TB
    subgraph AuthProvider["AuthProvider"]
        State["state: adminInfo"]

        subgraph Methods["Methods"]
            Login["login()<br/>토큰 저장 + 상태 업데이트"]
            Logout["logout()<br/>토큰 삭제 + 상태 초기화"]
        end

        subgraph Computed["Computed"]
            IsAuth["isAuthenticated<br/>!!adminInfo"]
        end
    end

    subgraph Storage["localStorage"]
        AT["accessToken"]
        RT["refreshToken"]
        AI["adminInfo"]
    end

    subgraph Consumers["Consumer Components"]
        LoginPage["LoginPage"]
        Header["Header"]
        ProtectedRoute["ProtectedRoute"]
    end

    Login --> Storage
    Logout --> Storage

    AuthProvider --> Consumers
```

### 4.2 Protected Route 흐름

```mermaid
flowchart TD
    Start["ProtectedRoute 접근"] --> CheckAuth{"isAuthenticated?"}

    CheckAuth -->|"No"| Redirect["Navigate to /admin/login<br/>state: {from: currentPath}"]

    CheckAuth -->|"Yes"| CheckRole{"requiredRole 있음?"}

    CheckRole -->|"No"| Render["children 렌더링"]

    CheckRole -->|"Yes"| MatchRole{"role 일치?"}

    MatchRole -->|"Yes"| Render
    MatchRole -->|"No"| Forbidden["Navigate to /error/403"]
```

### 4.3 라우터 구조

```mermaid
flowchart TB
    subgraph Router["React Router"]
        subgraph Customer["/customer"]
            CHome["/ → Home"]
            CApply["/reservations/apply"]
            CVerify["/reservations/verify"]
            CDetail["/reservations/:id"]
        end

        subgraph Admin["/admin"]
            subgraph Public["Public Routes"]
                ALogin["/login"]
                ARegister["/register"]
            end

            subgraph Protected["Protected Routes<br/>(SUPER_ADMIN)"]
                AList["/reservations"]
                ANew["/reservations/new"]
                ADetail["/reservations/:id"]
                AEdit["/reservations/:id/edit"]
            end
        end

        Root["/ → /customer"]
    end

    Protected --> ProtectedRoute["ProtectedRoute<br/>requiredRole: SUPER_ADMIN"]
```

---

## 5. API 호출 패턴

### 5.1 TanStack Query 흐름

```mermaid
flowchart LR
    subgraph Component["React Component"]
        UseQuery["useQuery()"]
        Data["data"]
        Loading["isLoading"]
        Error["error"]
    end

    subgraph QueryClient["Query Client"]
        Cache["Cache"]
        Stale["staleTime: 5분"]
        GC["gcTime: 30분"]
    end

    subgraph API["API Function"]
        Fetch["apiClient.get()"]
    end

    UseQuery --> QueryClient
    QueryClient -->|"캐시 miss"| API
    API --> QueryClient
    QueryClient --> UseQuery

    UseQuery --> Data
    UseQuery --> Loading
    UseQuery --> Error
```

### 5.2 Mutation 흐름

```mermaid
sequenceDiagram
    participant Comp as Component
    participant Mut as useMutation
    participant API as API Function
    participant QC as QueryClient
    participant Nav as Navigate

    Comp->>Mut: mutate(data)
    Mut->>Mut: isPending = true
    Mut->>API: create(data)
    API-->>Mut: response

    Mut->>QC: invalidateQueries(['reservations'])
    QC->>QC: 캐시 무효화

    Mut->>Nav: navigate('/admin/reservations/:id')
    Mut->>Mut: isPending = false
```

### 5.3 API 엔드포인트 매핑

```mermaid
flowchart TB
    subgraph AdminAuth["관리자 인증 API"]
        Login["POST /api/admin/auth/login<br/>→ authApi.login()"]
        Register["POST /api/admin/auth/register<br/>→ authApi.register()"]
        Me["GET /api/admin/auth/me<br/>→ authApi.getMe()"]
    end

    subgraph AdminRes["관리자 예약 API"]
        List["GET /api/admin/reservations<br/>→ reservationApi.getList()"]
        Create["POST /api/admin/reservations<br/>→ reservationApi.create()"]
        Detail["GET /api/admin/reservations/:id<br/>→ reservationApi.getById()"]
        Update["PUT /api/admin/reservations/:id<br/>→ reservationApi.update()"]
        Delete["DELETE /api/admin/reservations/:id<br/>→ reservationApi.delete()"]
        Status["PATCH /api/admin/reservations/:id/status<br/>→ reservationApi.updateStatus()"]
    end

    subgraph CustRes["고객 예약 API"]
        CCreate["POST /api/customer/reservations<br/>→ customerApi.create()"]
        Verify["POST /api/customer/reservations/verify<br/>→ customerApi.verify()"]
        CDetail["GET /api/customer/reservations/:id<br/>→ customerApi.getById()"]
    end
```

---

## 6. 페이지별 연동

### 6.1 로그인 페이지 흐름

```mermaid
flowchart TD
    Start["로그인 페이지"] --> Form["폼 입력<br/>username, password"]

    Form --> Submit["Submit"]
    Submit --> Validate{"유효성 검증"}

    Validate -->|"실패"| ShowError1["에러 메시지 표시"]
    ShowError1 --> Form

    Validate -->|"성공"| CallAPI["useLogin().mutate()"]
    CallAPI --> Loading["버튼 로딩 상태"]

    Loading --> APIResult{"API 응답"}

    APIResult -->|"실패"| ShowError2["로그인 실패 알림"]
    ShowError2 --> Form

    APIResult -->|"성공"| SaveToken["토큰 저장<br/>AuthContext 업데이트"]
    SaveToken --> Navigate["예약 관리 페이지 이동"]
```

### 6.2 예약 목록 페이지 흐름

```mermaid
flowchart TD
    Start["예약 목록 페이지"] --> FetchData["useReservations(params)"]

    FetchData --> CheckState{"상태 확인"}

    CheckState -->|"isLoading"| ShowSkeleton["스켈레톤 표시"]
    CheckState -->|"error"| ShowError["에러 메시지"]
    CheckState -->|"success"| RenderData["데이터 렌더링"]

    RenderData --> SearchFilter["검색 필터<br/>상태, 날짜, 키워드"]
    RenderData --> ReservationList["예약 목록<br/>카드/테이블"]
    RenderData --> Pagination["페이지네이션"]

    SearchFilter -->|"필터 변경"| UpdateParams["params 업데이트"]
    UpdateParams --> FetchData

    Pagination -->|"페이지 변경"| UpdateParams

    ReservationList -->|"상세 클릭"| NavigateDetail["상세 페이지 이동"]
```

### 6.3 예약 등록 페이지 흐름

```mermaid
flowchart TD
    Start["예약 등록 페이지"] --> Form["ReservationForm"]

    subgraph FormComponents["폼 컴포넌트"]
        Customer["고객 정보<br/>이름, 연락처, 이메일"]
        DateTime["예약 일시<br/>DateSelector + TimeGrid"]
        Type["상담 유형<br/>ConsultationTypeGrid"]
        Memo["메모"]
    end

    Form --> FormComponents

    DateTime --> FetchTimes["useReservedTimes(date)"]
    FetchTimes --> UpdateTimeGrid["예약된 시간 비활성화"]

    FormComponents --> Submit["등록하기"]
    Submit --> Validate{"유효성 검증"}

    Validate -->|"실패"| ShowError["에러 표시"]
    Validate -->|"성공"| CallAPI["useCreateReservation().mutate()"]

    CallAPI --> APIResult{"API 응답"}
    APIResult -->|"실패"| ShowAPIError["API 에러 표시"]
    APIResult -->|"성공"| Navigate["상세 페이지 이동"]
```

---

## 7. 컴포넌트 관계도

### 7.1 페이지 - 훅 - API 관계

```mermaid
flowchart TB
    subgraph Pages["Pages"]
        AdminLogin["AdminLoginPage"]
        AdminList["AdminReservationsPage"]
        AdminCreate["AdminReservationCreatePage"]
        AdminDetail["AdminReservationDetailPage"]
        CustApply["CustomerApplyPage"]
    end

    subgraph Hooks["Custom Hooks"]
        UseLogin["useLogin()"]
        UseAuth["useAuth()"]
        UseReservations["useReservations()"]
        UseReservation["useReservation()"]
        UseCreateRes["useCreateReservation()"]
        UseReservedTimes["useReservedTimes()"]
    end

    subgraph APIs["API Functions"]
        AuthAPI["authApi"]
        AdminResAPI["adminReservationApi"]
        CustResAPI["customerReservationApi"]
    end

    AdminLogin --> UseLogin
    AdminLogin --> UseAuth

    AdminList --> UseReservations
    AdminList --> UseAuth

    AdminCreate --> UseCreateRes
    AdminCreate --> UseReservedTimes

    AdminDetail --> UseReservation

    CustApply --> UseReservedTimes

    UseLogin --> AuthAPI
    UseReservations --> AdminResAPI
    UseReservation --> AdminResAPI
    UseCreateRes --> AdminResAPI
    UseReservedTimes --> AdminResAPI
    UseReservedTimes --> CustResAPI
```

### 7.2 공통 UI 컴포넌트

```mermaid
flowchart TB
    subgraph SharedUI["shared/ui"]
        Button["Button<br/>variant: primary/accent/outline/danger<br/>size: sm/md/lg<br/>loading, disabled"]
        Input["Input<br/>label, error, hint<br/>type: text/password/email"]
        Card["Card<br/>className"]
        Alert["Alert<br/>variant: success/error/warning/info"]
        Modal["Modal<br/>isOpen, onClose<br/>title, children"]
        Skeleton["Skeleton<br/>count, height"]
    end

    subgraph FeatureUI["features/reservation/ui"]
        DateSelector["DateSelector<br/>value, onChange<br/>excludeWeekends"]
        TimeGrid["TimeGrid<br/>selectedDate<br/>reservedTimes"]
        TypeGrid["ConsultationTypeGrid<br/>value, onChange"]
        StatusBadge["StatusBadge<br/>status"]
        ResCard["ReservationCard<br/>reservation"]
        ResForm["ReservationForm<br/>onSubmit, isSubmitting"]
    end

    ResForm --> Button
    ResForm --> Input
    ResForm --> DateSelector
    ResForm --> TimeGrid
    ResForm --> TypeGrid

    ResCard --> StatusBadge
    ResCard --> Card
```

---

## 부록: 타입 정의

```typescript
// src/shared/types/reservation.ts

export type ReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

export type ConsultationType =
  | 'TAX_RETURN'
  | 'VAT'
  | 'CORPORATE_TAX'
  | 'INHERITANCE'
  | 'GIFT_TAX'
  | 'BOOKKEEPING'
  | 'TAX_ADJUSTMENT'
  | 'CONSULTATION'
  | 'OTHER'

export interface Reservation {
  id: number
  reservationNumber: string
  customerName: string
  phone: string
  email?: string
  reservationDate: string
  reservationTime: string
  consultationType: ConsultationType
  status: ReservationStatus
  memo?: string
  adminId?: number
  createdAt: string
  updatedAt: string
}
```

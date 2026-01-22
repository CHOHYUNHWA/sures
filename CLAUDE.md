# Sures - 세무 예약 관리 시스템

> **CLAUDE.md 최신화 정책**: 새로운 정책, 구조 변경, 컨벤션 추가, 비즈니스 규칙 변경 등이 발생하면 반드시 이 문서를 업데이트할 것. 코드와 문서의 일관성을 유지하는 것이 중요함.

## 프로젝트 개요
세무사 사무소 예약 관리 시스템. 관리자/고객 두 인터페이스 제공.
**모노레포 구조**로 Frontend와 Backend가 분리되어 있음.

## 기술 스택

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State/API**: TanStack Query (React Query) + Axios
- **Architecture**: FSD (Feature-Sliced Design)

### Backend
- **Framework**: Spring Boot 4.0.1, Java 17
- **Database**: MySQL + Spring Data JPA
- **Security**: Spring Security + JWT
- **Query**: QueryDSL
- **Architecture**: Clean Layered Architecture

## 모노레포 구조
```
sures/
├── frontend/          # React (FSD 패턴)
├── backend/           # Spring Boot (Clean Layered)
├── package.json       # 루트 워크스페이스 설정
└── CLAUDE.md          # 프로젝트 문서
```

---

# Frontend (React + FSD)

## FSD 패키지 구조
```
frontend/src/
├── app/               # 앱 초기화, 프로바이더, 라우터
│   ├── providers/     # Context Providers
│   ├── router/        # React Router 설정
│   └── styles/        # 글로벌 스타일
├── pages/             # 페이지 컴포넌트
│   ├── admin/         # 관리자 페이지
│   └── customer/      # 고객 페이지
├── widgets/           # 독립적 UI 블록 (레이아웃, 헤더 등)
│   ├── header/
│   ├── sidebar/
│   └── footer/
├── features/          # 비즈니스 로직 기능
│   ├── auth/          # 인증 관련 기능
│   └── reservation/   # 예약 관련 기능
├── entities/          # 비즈니스 엔티티
│   ├── admin/
│   ├── reservation/
│   └── customer/
└── shared/            # 공유 유틸리티
    ├── ui/            # 공통 UI 컴포넌트
    ├── lib/           # 유틸리티 함수
    ├── api/           # API 클라이언트 (Axios)
    ├── config/        # 설정
    └── types/         # TypeScript 타입 정의
```

## FSD 레이어 규칙
```
app → pages → widgets → features → entities → shared
 ↓      ↓        ↓          ↓          ↓         ↓
하위 레이어만 import 가능 (상위 레이어 import 금지)
```

## Path Alias
```typescript
// tsconfig.app.json에 설정됨
import { apiClient } from '@/shared/api'
import { Button } from '@/shared/ui'
import { Reservation } from '@/shared/types'
```

## React 컴포넌트 컨벤션
```typescript
// 함수형 컴포넌트 + TypeScript
export function ComponentName({ prop }: Props) {
  return <div>...</div>
}

// 기본 export 금지, named export 사용
export { ComponentName }
```

## API 호출 패턴
```typescript
// entities/reservation/api.ts
import { apiClient } from '@/shared/api'
import type { Reservation } from '@/shared/types'

export const reservationApi = {
  getAll: () => apiClient.get<Reservation[]>('/api/admin/reservations'),
  create: (data: CreateRequest) => apiClient.post<Reservation>('/api/customer/reservations', data),
}
```

---

# Backend (Spring Boot + Clean Layered)

## Clean Layered Architecture 구조
```
backend/src/main/java/com/sures/
├── presentation/          # Controller, DTO (Request/Response)
│   ├── admin/
│   │   ├── controller/    # AdminAuthController, AdminReservationController
│   │   └── dto/           # 관리자 요청/응답 DTO
│   ├── customer/
│   │   ├── controller/    # CustomerReservationController
│   │   └── dto/           # 고객 요청/응답 DTO
│   └── common/
│       └── controller/    # HomeController, CustomErrorController
├── application/           # Service (Use Cases)
│   ├── admin/             # AdminService, ReservationService
│   └── customer/          # CustomerReservationService
├── domain/                # Entity, Repository Interface
│   ├── entity/            # Admin, Reservation, ConsultationType 등
│   ├── repository/        # JPA Repository 인터페이스
│   └── constant/          # 도메인 상수
└── infrastructure/        # Config, Security, 기술 구현체
    ├── config/            # SecurityConfig, JpaConfig, QuerydslConfig
    ├── security/          # AdminUserDetailsService
    ├── exception/         # GlobalExceptionHandler
    └── persistence/       # Repository 구현체 (필요시)
```

## 레이어 의존성 규칙
```
presentation → application → domain ← infrastructure
                    ↓           ↓
              domain만 의존    domain 구현
```

- **presentation**: HTTP 요청/응답 처리, DTO 변환
- **application**: 비즈니스 로직, 트랜잭션 관리
- **domain**: 핵심 비즈니스 엔티티, 리포지토리 인터페이스
- **infrastructure**: 기술 구현체, 설정, 외부 시스템 연동

## DTO 변환 규칙 (Mapper 사용 금지)
```java
public record ReservationResponse(
    Long id,
    String customerName,
    LocalDateTime reservationDate
) {
    public static ReservationResponse from(Reservation entity) {
        return new ReservationResponse(
            entity.getId(),
            entity.getCustomerName(),
            entity.getReservationDate()
        );
    }
}
```

---

# API 설계

## REST API 엔드포인트

### 관리자 API (/api/admin/**)
| 기능 | Method | URL | 권한 |
|------|--------|-----|------|
| 로그인 | POST | /api/admin/auth/login | 없음 |
| 회원가입 | POST | /api/admin/auth/register | 없음 |
| 예약 목록 | GET | /api/admin/reservations | ADMIN |
| 예약 등록 | POST | /api/admin/reservations | ADMIN |
| 예약 상세 | GET | /api/admin/reservations/{id} | ADMIN |
| 예약 수정 | PUT | /api/admin/reservations/{id} | ADMIN |
| 예약 삭제 | DELETE | /api/admin/reservations/{id} | ADMIN |
| 상태 변경 | PATCH | /api/admin/reservations/{id}/status | ADMIN |

### 고객 API (/api/customer/**)
| 기능 | Method | URL |
|------|--------|-----|
| 예약 신청 | POST | /api/customer/reservations |
| 예약 인증 | POST | /api/customer/reservations/verify |
| 예약 상세 | GET | /api/customer/reservations/{id} |
| 예약 수정 | PUT | /api/customer/reservations/{id} |
| 예약 취소 | DELETE | /api/customer/reservations/{id} |

## API 응답 형식
```json
// 성공
{
  "data": { ... },
  "message": "성공"
}

// 에러
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값이 올바르지 않습니다",
    "details": [...]
  }
}
```

---

# 공통 규칙

## 디자인 가이드

### 브랜드 컬러
| 용도 | 컬러 | HEX |
|------|------|-----|
| 시그니처 (Primary) | 남색 | `#011541` |
| 포인트 (Accent) | 하늘색 | `#28a7e1` |
| 배경 | 흰색 | `#ffffff` |
| 텍스트 | 다크그레이 | `#333333` |
| 보조 배경 | 라이트그레이 | `#f5f5f5` |

### 레이아웃 원칙
- **Mobile Only**: PC에서도 모바일과 동일한 레이아웃 표시 (max-width: 540px)
- **터치 친화적**: 버튼 최소 44px, 충분한 간격
- **가독성**: 본문 16px 이상, 적절한 줄간격

## 예약 비즈니스 규칙

### 예약 가능 시간
- **단위**: 1시간 단위 예약
- **운영 시간**: 평일 09:00 ~ 18:00 (점심시간 12:00~13:00 제외)
- **예약 가능 시간대**: 09:00, 10:00, 11:00, 13:00, 14:00, 15:00, 16:00, 17:00
- **온라인 예약**: 평일 운영시간 내만 가능
- **유선 예약**: 평일 18시 이후, 주말은 유선(전화)으로만 예약 가능

### 예약 제한
- **1인 1예약**: 동일 고객(이름+연락처)은 1개의 활성 예약만 가능
- **중복 방지**: 같은 시간대에 이미 예약이 있으면 예약 불가

### 수정/취소 정책

**취소 마감**
| 예약 시간대 | 취소 마감 |
|-------------|-----------|
| 오전 (09:00~11:00) | 전날 자정(24:00)까지 |
| 오후 (13:00~17:00) | 당일 오전(12:00)까지 |

- **마감 이후 취소**: 고객 불가, 관리자만 가능

**내용 수정**
- **신청 내용(메모, 상담유형 등)**: 언제든지 수정 가능
- **예약 일시 변경**: 취소 후 재예약 필요

### 예약 상태
| 상태 | 코드 | 설명 |
|------|------|------|
| 대기 | `PENDING` | 예약 신청 후 확정 대기 |
| 확정 | `CONFIRMED` | 관리자가 예약 확정 |
| 완료 | `COMPLETED` | 상담 완료 |
| 취소 | `CANCELLED` | 예약 취소됨 |
| 노쇼 | `NO_SHOW` | 예약 후 미방문 |

## 보안 설정
- **인증 방식**: JWT (Access Token)
- **관리자 API**: Bearer Token 필수
- **고객 API**: 예약번호 + 개인정보 인증
- **CORS**: Frontend (localhost:3000) 허용

## 관리자 권한 체계

### Role 정의
| Role | 코드 | 설명 |
|------|------|------|
| 최고관리자 | `SUPER_ADMIN` | 모든 권한 |
| 일반관리자 | `ADMIN` | 예약 관리 등 기본 업무 |

## 코드 컨벤션

### Backend (Java)
- Entity: `@Entity`, `@Getter`, `@NoArgsConstructor(access = PROTECTED)`
- DTO: Java Record 권장
- Service: `@Service`, `@Transactional`
- Controller: `@RestController`, `@RequestMapping`

### Frontend (TypeScript)
- 컴포넌트: 함수형 컴포넌트, named export
- 상태 관리: React Query for server state
- 스타일: CSS Variables + CSS Modules 또는 Tailwind

## DB 설계 원칙

### FK 정책 (물리적 FK 사용 안함)
- **물리적 FK 제약조건**: 사용하지 않음
- **JPA 관계 매핑**: 사용하지 않음 (@OneToMany, @ManyToOne 없음)
- **논리적 FK**: Long 타입 필드로 관리 (예: `adminId`)

```java
// Good - Long 타입 FK 필드
@Column(name = "admin_id")
private Long adminId;

// Bad - JPA 관계 매핑
@ManyToOne
@JoinColumn(name = "admin_id")
private Admin admin;
```

## Validation 규칙

### 이중 검증 아키텍처
```
[Frontend] React Hook Form / Zod → [Backend] @Valid + BindingResult → [Response] JSON 에러
```

### 관리자 회원가입
| 필드 | 규칙 |
|------|------|
| 아이디 | 필수, 4~20자, 영문소문자+숫자 |
| 비밀번호 | 필수, 8자 이상, 영문+숫자+특수문자 |
| 이름 | 필수, 2~20자 |
| 이메일 | 필수, 이메일 형식 |

### 예약 등록
| 필드 | 규칙 |
|------|------|
| 고객명 | 필수, 2~50자 |
| 연락처 | 필수, 010-0000-0000 형식 |
| 상담일 | 필수 |
| 상담시간 | 필수 |
| 상담유형 | 필수 |
| 메모 | 선택, 최대 500자 |

## 개발 환경 실행

```bash
# 전체 실행 (Frontend + Backend)
npm run dev

# 개별 실행
npm run dev:frontend  # localhost:3000
npm run dev:backend   # localhost:8080
```

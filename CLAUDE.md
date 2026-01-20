# Sures - 세무 예약 관리 시스템

> **CLAUDE.md 최신화 정책**: 새로운 정책, 구조 변경, 컨벤션 추가, 비즈니스 규칙 변경 등이 발생하면 반드시 이 문서를 업데이트할 것. 코드와 문서의 일관성을 유지하는 것이 중요함.

## 프로젝트 개요
세무사 사무소 예약 관리 시스템. 관리자/고객 두 인터페이스 제공.

## 기술 스택
- **Backend**: Spring Boot 4.0.1, Java 17
- **Database**: MySQL + Spring Data JPA
- **Security**: Spring Security
- **View**: Thymeleaf + Thymeleaf Layout Dialect
- **Build**: Gradle

## 아키텍처 원칙

### 레이어 구조
```
Controller <-> Service <-> Repository <-> Entity
     ↓
    DTO (정적 팩토리 메서드로 변환)
```

### DTO 변환 규칙 (Mapper 사용 금지)
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

## 패키지 구조
```
com.sures/
├── common/
│   ├── config/          # SecurityConfig, WebConfig
│   ├── exception/       # GlobalExceptionHandler
│   └── util/            # 유틸리티 클래스
├── admin/
│   ├── controller/      # AdminAuthController, AdminReservationController
│   ├── service/         # AdminAuthService, AdminReservationService
│   └── dto/             # 관리자 요청/응답 DTO
├── customer/
│   ├── controller/      # CustomerReservationController
│   ├── service/         # CustomerReservationService
│   └── dto/             # 고객 요청/응답 DTO
└── domain/
    ├── entity/          # Admin, Reservation, Customer
    └── repository/      # JPA Repository 인터페이스
```

## URL 구조

### 관리자 (/admin/**)
| 기능 | Method | URL | 설명 |
|------|--------|-----|------|
| 로그인 페이지 | GET | /admin/login | 로그인 폼 |
| 로그인 처리 | POST | /admin/login | 로그인 인증 |
| 회원가입 페이지 | GET | /admin/register | 회원가입 폼 |
| 회원가입 처리 | POST | /admin/register | 계정 생성 |
| 계정 찾기 | GET | /admin/find-account | 아이디/비밀번호 찾기 |
| 예약 목록 | GET | /admin/reservations | 검색, 필터 지원 |
| 예약 등록 폼 | GET | /admin/reservations/new | 수기 등록 폼 |
| 예약 등록 | POST | /admin/reservations | 예약 생성 |
| 예약 상세 | GET | /admin/reservations/{id} | 예약 상세 조회 |
| 예약 수정 폼 | GET | /admin/reservations/{id}/edit | 수정 폼 |
| 예약 수정 | PUT | /admin/reservations/{id} | 예약 정보 변경 |
| 예약 취소 | DELETE | /admin/reservations/{id} | 예약 취소 |

### 고객 (/customer/**)
| 기능 | Method | URL | 설명 |
|------|--------|-----|------|
| 메인 페이지 | GET | /customer | 고객 홈 |
| 예약 신청 폼 | GET | /customer/reservations/apply | 예약 신청 폼 |
| 예약 신청 | POST | /customer/reservations | 예약 생성 |
| 예약 조회 폼 | GET | /customer/reservations/verify | 개인정보 확인 폼 |
| 예약 조회 | POST | /customer/reservations/verify | 이름+전화+예약번호로 조회 |
| 예약 상세 | GET | /customer/reservations/{id} | 예약 상세 (인증 필요) |
| 예약 취소 | DELETE | /customer/reservations/{id} | 예약 취소 |

## 뷰 템플릿 구조
```
templates/
├── layout/
│   ├── base.html              # 공통 HTML 구조
│   ├── admin-layout.html      # 관리자 레이아웃
│   └── customer-layout.html   # 고객 레이아웃
├── fragments/
│   ├── header.html            # 헤더
│   ├── footer.html            # 푸터
│   └── sidebar.html           # 관리자 사이드바
├── admin/
│   ├── auth/
│   │   ├── login.html
│   │   ├── register.html
│   │   └── find-account.html
│   └── reservation/
│       ├── list.html
│       ├── create.html
│       ├── detail.html
│       └── edit.html
└── customer/
    ├── home.html
    └── reservation/
        ├── apply.html
        ├── verify.html
        ├── list.html
        └── detail.html
```

## 정적 리소스
```
static/
├── css/
│   └── styles.css
├── js/
└── image/
    └── logo.png
```

## 디자인 가이드

### 브랜드 컬러
| 용도 | 컬러 | HEX |
|------|------|-----|
| 시그니처 (Primary) | 남색 | `#011541` |
| 포인트 (Accent) | 하늘색 | `#28a7e1` |
| 배경 | 흰색 | `#ffffff` |
| 텍스트 | 다크그레이 | `#333333` |
| 보조 배경 | 라이트그레이 | `#f5f5f5` |

### 반응형 브레이크포인트 (Mobile First)
```css
/* 기본: 모바일 (< 768px) */
/* 태블릿: min-width: 768px */
/* 데스크탑: min-width: 1024px */
/* 와이드: min-width: 1280px */
```

### 레이아웃 원칙
- **Mobile First**: 모바일 기준으로 먼저 설계, 점진적 확장
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
- `/admin/**` : ADMIN 권한 필요 (로그인 필수)
- `/customer/**` : 인증 불필요 (개인정보 확인으로 조회)
- CSRF: 활성화
- 세션: 관리자만 세션 사용

## 관리자 권한 체계

### Role 정의
| Role | 코드 | 설명 |
|------|------|------|
| 최고관리자 | `SUPER_ADMIN` | 모든 권한 (회원가입 승인, 시스템 설정 등) |
| 일반관리자 | `ADMIN` | 예약 관리 등 기본 업무 |

### 권한 정책
- **회원가입**: 누구나 가입 가능하지만 기본 Role은 `ADMIN`
- **SUPER_ADMIN 승격**: DB에서 직접 업데이트 필요
  ```sql
  UPDATE admin SET role = 'SUPER_ADMIN' WHERE id = 1;
  ```
- **1인 세무회사**: 최초 가입자를 SUPER_ADMIN으로 승격하여 운영

## 코드 컨벤션
- Entity: `@Entity`, `@Getter`, `@NoArgsConstructor(access = PROTECTED)`
- DTO: Java Record 권장
- Service: `@Service`, `@Transactional`
- Controller: `@Controller` (뷰 반환), `@ResponseBody` (JSON)

## DB 설계 원칙

### FK 정책 (물리적 FK 사용 안함)
- **물리적 FK 제약조건**: 사용하지 않음 (DDL에 FOREIGN KEY 없음)
- **JPA 관계 매핑**: 사용하지 않음 (@OneToMany, @ManyToOne 없음)
- **논리적 FK**: Long 타입 필드로 관리 (예: `adminId`)

### 이유
1. 배포/마이그레이션 유연성
2. 데이터 정합성은 애플리케이션 레벨에서 관리
3. 순환 참조 문제 방지

### 예시
```java
// Good - Long 타입 FK 필드
@Column(name = "admin_id")
private Long adminId;

// Bad - JPA 관계 매핑
@ManyToOne
@JoinColumn(name = "admin_id")
private Admin admin;
```

### QueryDSL
- 복잡한 동적 쿼리 작성에 사용
- Q클래스는 `build/generated` 디렉토리에 자동 생성
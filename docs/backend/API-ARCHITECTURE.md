# Backend API Architecture

> JWT 인증 기반 REST API 아키텍처 문서

## 목차
1. [시스템 개요](#1-시스템-개요)
2. [인증 흐름](#2-인증-흐름)
3. [Security 설정](#3-security-설정)
4. [패키지 구조](#4-패키지-구조)
5. [API 엔드포인트](#5-api-엔드포인트)
6. [JWT 토큰](#6-jwt-토큰)
7. [요청/응답 예시](#7-요청응답-예시)

---

## 1. 시스템 개요

### 1.1 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              클라이언트                                   │
├─────────────────────────────────┬───────────────────────────────────────┤
│     React Frontend              │        Thymeleaf 페이지 (기존)         │
│     localhost:3000              │        Server-Side Rendering          │
│     JWT 인증                     │        세션 인증                       │
└────────────────┬────────────────┴───────────────────┬───────────────────┘
                 │                                     │
                 ▼                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Spring Boot Backend :8080                             │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Security Layer                              │   │
│  │  ┌─────────────────────┐    ┌─────────────────────────────────┐ │   │
│  │  │ API Filter Chain    │    │ Web Filter Chain                │ │   │
│  │  │ - CORS 허용          │    │ - Form Login                   │ │   │
│  │  │ - CSRF 비활성화       │    │ - 세션 관리                     │ │   │
│  │  │ - Stateless 세션     │    │ - 로그아웃                      │ │   │
│  │  │ - JWT 필터           │    │                                 │ │   │
│  │  └─────────────────────┘    └─────────────────────────────────┘ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                    │                                    │
│  ┌─────────────────────────────────┴────────────────────────────────┐  │
│  │                     Presentation Layer                            │  │
│  │  ┌───────────────────────┐    ┌───────────────────────────────┐  │  │
│  │  │ REST API Controllers  │    │ Thymeleaf Controllers         │  │  │
│  │  │ /api/**               │    │ /admin/**, /customer/**       │  │  │
│  │  └───────────────────────┘    └───────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│  ┌─────────────────────────────────┴────────────────────────────────┐  │
│  │                     Application Layer                             │  │
│  │         AdminService, ReservationService, CustomerService         │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│  ┌─────────────────────────────────┴────────────────────────────────┐  │
│  │                       Domain Layer                                │  │
│  │              Admin, Reservation, Repository Interfaces            │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                    │                                    │
│  ┌─────────────────────────────────┴────────────────────────────────┐  │
│  │                    Infrastructure Layer                           │  │
│  │         JwtTokenProvider, Repository Impl, Security Config        │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
                              ┌─────────────┐
                              │   MySQL DB   │
                              └─────────────┘
```

### 1.2 이중 인증 시스템

| 구분 | REST API (/api/**) | Thymeleaf (/admin/**, /customer/**) |
|------|-------------------|-------------------------------------|
| 클라이언트 | React SPA | 서버 렌더링 페이지 |
| 인증 방식 | JWT Token | Session Cookie |
| 세션 정책 | Stateless | Stateful |
| CSRF | 비활성화 | 활성화 |
| CORS | localhost:3000 허용 | 불필요 |

---

## 2. 인증 흐름

### 2.1 JWT 로그인 흐름

```
┌──────────┐                    ┌──────────────────┐                    ┌─────────────┐
│  React   │                    │  Spring Boot     │                    │   Database  │
│  Client  │                    │  Backend         │                    │             │
└────┬─────┘                    └────────┬─────────┘                    └──────┬──────┘
     │                                   │                                     │
     │  1. POST /api/admin/auth/login    │                                     │
     │  {username, password}             │                                     │
     │──────────────────────────────────>│                                     │
     │                                   │                                     │
     │                                   │  2. 사용자 조회                       │
     │                                   │────────────────────────────────────>│
     │                                   │                                     │
     │                                   │  3. Admin 정보 반환                   │
     │                                   │<────────────────────────────────────│
     │                                   │                                     │
     │                                   │  4. 비밀번호 검증 (BCrypt)            │
     │                                   │  5. JWT 토큰 생성                     │
     │                                   │     - Access Token (30분)           │
     │                                   │     - Refresh Token (7일)           │
     │                                   │                                     │
     │  6. Response                      │                                     │
     │  {accessToken, refreshToken,      │                                     │
     │   adminInfo}                      │                                     │
     │<──────────────────────────────────│                                     │
     │                                   │                                     │
     │  7. localStorage에 토큰 저장        │                                     │
     │                                   │                                     │
```

### 2.2 JWT 인증된 요청 흐름

```
┌──────────┐     ┌─────────────────┐     ┌──────────────┐     ┌────────────┐
│  React   │     │ JwtAuthFilter   │     │  Controller  │     │  Service   │
│  Client  │     │                 │     │              │     │            │
└────┬─────┘     └────────┬────────┘     └──────┬───────┘     └─────┬──────┘
     │                    │                     │                   │
     │  GET /api/admin/reservations            │                   │
     │  Authorization: Bearer eyJ...           │                   │
     │───────────────────>│                     │                   │
     │                    │                     │                   │
     │                    │  1. 토큰 추출        │                   │
     │                    │  2. 토큰 검증        │                   │
     │                    │  3. Authentication  │                   │
     │                    │     객체 생성        │                   │
     │                    │  4. SecurityContext │                   │
     │                    │     에 저장          │                   │
     │                    │                     │                   │
     │                    │  요청 전달           │                   │
     │                    │────────────────────>│                   │
     │                    │                     │                   │
     │                    │                     │  비즈니스 로직      │
     │                    │                     │──────────────────>│
     │                    │                     │                   │
     │                    │                     │  결과 반환         │
     │                    │                     │<──────────────────│
     │                    │                     │                   │
     │  Response: ApiResponse<T>               │                   │
     │<─────────────────────────────────────────│                   │
     │                    │                     │                   │
```

### 2.3 인증 실패 시 흐름

```
토큰 없음 또는 만료 시:
┌──────────┐     ┌─────────────────┐
│  React   │     │ JwtAuthFilter   │
└────┬─────┘     └────────┬────────┘
     │                    │
     │  GET /api/admin/reservations
     │  (토큰 없음 또는 만료)
     │───────────────────>│
     │                    │
     │                    │  토큰 검증 실패
     │                    │  SecurityContext 비어있음
     │                    │
     │  401 Unauthorized  │
     │<───────────────────│
     │                    │
     │  로그인 페이지로 리다이렉트
     │
```

---

## 3. Security 설정

### 3.1 SecurityConfig 구조

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. REST API 필터 체인 (우선순위 1)
    @Bean
    @Order(1)
    public SecurityFilterChain apiFilterChain(HttpSecurity http) {
        http.securityMatcher("/api/**")     // /api/** 경로만 적용
            .cors(...)                       // CORS 허용
            .csrf(csrf -> csrf.disable())    // CSRF 비활성화
            .sessionManagement(session ->
                session.sessionCreationPolicy(STATELESS))  // 무상태
            .addFilterBefore(JwtAuthenticationFilter, ...)  // JWT 필터
            .authorizeHttpRequests(...);
    }

    // 2. Thymeleaf 필터 체인 (우선순위 2)
    @Bean
    @Order(2)
    public SecurityFilterChain webFilterChain(HttpSecurity http) {
        http.formLogin(...)      // Form 로그인
            .logout(...)         // 로그아웃
            .sessionManagement(...)  // 세션 관리
            .authorizeHttpRequests(...);
    }
}
```

### 3.2 경로별 권한 설정

```
/api/** (REST API)
├── /api/admin/auth/login      → permitAll (인증 불필요)
├── /api/admin/auth/register   → permitAll (인증 불필요)
├── /api/admin/reservations/** → hasRole("SUPER_ADMIN")
├── /api/admin/**              → authenticated
└── /api/customer/**           → permitAll

/admin/**, /customer/** (Thymeleaf)
├── /admin/login               → permitAll
├── /admin/register            → permitAll
├── /admin/reservations/**     → hasRole("SUPER_ADMIN")
├── /admin/**                  → authenticated
└── /customer/**               → permitAll
```

### 3.3 CORS 설정

```java
CorsConfiguration configuration = new CorsConfiguration();
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",   // React dev server
    "http://localhost:5173"    // Vite dev server
));
configuration.setAllowedMethods(Arrays.asList(
    "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"
));
configuration.setAllowedHeaders(Arrays.asList("*"));
configuration.setAllowCredentials(true);
configuration.setMaxAge(3600L);
```

---

## 4. 패키지 구조

```
backend/src/main/java/com/sures/
│
├── presentation/                          # Presentation Layer
│   ├── admin/
│   │   ├── controller/
│   │   │   ├── AdminAuthController.java           # Thymeleaf (세션)
│   │   │   ├── AdminRestAuthController.java       # REST API (JWT) ★
│   │   │   ├── AdminReservationController.java    # Thymeleaf
│   │   │   └── AdminRestReservationController.java # REST API ★
│   │   └── dto/
│   │       ├── request/
│   │       │   ├── LoginRequest.java              ★
│   │       │   ├── ReservationCreateRequest.java
│   │       │   ├── ReservationUpdateRequest.java
│   │       │   └── ReservationSearchRequest.java
│   │       └── response/
│   │           ├── LoginResponse.java             ★
│   │           ├── AdminInfoResponse.java         ★
│   │           └── ReservationResponse.java
│   │
│   ├── customer/
│   │   ├── controller/
│   │   │   ├── CustomerReservationController.java     # Thymeleaf
│   │   │   └── CustomerRestReservationController.java # REST API ★
│   │   └── dto/
│   │       ├── request/
│   │       │   ├── CustomerReservationCreateRequest.java
│   │       │   ├── CustomerReservationUpdateRequest.java
│   │       │   └── CustomerReservationVerifyRequest.java
│   │       └── response/
│   │           └── CustomerReservationResponse.java
│   │
│   └── common/
│       └── dto/
│           ├── ApiResponse.java
│           └── PageResponse.java
│
├── application/                           # Application Layer
│   ├── admin/
│   │   ├── service/
│   │   │   ├── AdminService.java
│   │   │   └── ReservationService.java
│   │   └── dto/
│   │       ├── command/
│   │       └── result/
│   └── customer/
│       └── service/
│           └── CustomerReservationService.java
│
├── domain/                                # Domain Layer
│   ├── admin/
│   │   ├── Admin.java
│   │   ├── AdminRole.java
│   │   ├── AdminRepository.java
│   │   └── AdminDomainService.java
│   ├── reservation/
│   │   ├── Reservation.java
│   │   ├── ReservationStatus.java
│   │   ├── ConsultationType.java
│   │   ├── ReservationRepository.java
│   │   └── ReservationDomainService.java
│   └── common/
│       └── BaseEntity.java
│
└── infrastructure/                        # Infrastructure Layer
    ├── config/
    │   ├── SecurityConfig.java            # 이중 필터 체인 ★
    │   ├── JpaConfig.java
    │   └── QuerydslConfig.java
    ├── security/
    │   ├── AdminUserDetailsService.java
    │   └── jwt/                           ★ 신규
    │       ├── JwtProperties.java
    │       ├── JwtTokenProvider.java
    │       └── JwtAuthenticationFilter.java
    └── persistence/
        ├── AdminRepositoryImpl.java
        └── ReservationRepositoryImpl.java

★ = JWT 인증을 위해 새로 추가된 파일
```

---

## 5. API 엔드포인트

### 5.1 관리자 인증 API

| 메서드 | 경로 | 설명 | 인증 | 요청 Body | 응답 |
|--------|------|------|------|-----------|------|
| POST | `/api/admin/auth/login` | 로그인 | 없음 | LoginRequest | LoginResponse |
| POST | `/api/admin/auth/register` | 회원가입 | 없음 | AdminSignupRequest | AdminInfoResponse |
| GET | `/api/admin/auth/me` | 내 정보 | JWT | - | AdminInfoResponse |

### 5.2 관리자 예약 API

| 메서드 | 경로 | 설명 | 인증 | 요청 Body | 응답 |
|--------|------|------|------|-----------|------|
| GET | `/api/admin/reservations` | 목록 조회 | JWT + SUPER_ADMIN | Query Params | PageResponse |
| POST | `/api/admin/reservations` | 예약 등록 | JWT + SUPER_ADMIN | ReservationCreateRequest | ReservationResponse |
| GET | `/api/admin/reservations/{id}` | 상세 조회 | JWT + SUPER_ADMIN | - | ReservationResponse |
| PUT | `/api/admin/reservations/{id}` | 예약 수정 | JWT + SUPER_ADMIN | ReservationUpdateRequest | ReservationResponse |
| DELETE | `/api/admin/reservations/{id}` | 예약 삭제 | JWT + SUPER_ADMIN | - | - |
| PATCH | `/api/admin/reservations/{id}/status` | 상태 변경 | JWT + SUPER_ADMIN | {status: string} | ReservationResponse |
| GET | `/api/admin/reservations/reserved-times` | 예약된 시간 | JWT + SUPER_ADMIN | ?date=YYYY-MM-DD | string[] |

### 5.3 고객 예약 API

| 메서드 | 경로 | 설명 | 인증 | 요청 Body | 응답 |
|--------|------|------|------|-----------|------|
| POST | `/api/customer/reservations` | 예약 신청 | 없음 | CustomerReservationCreateRequest | CustomerReservationResponse |
| POST | `/api/customer/reservations/verify` | 본인인증 | 없음 | CustomerReservationVerifyRequest | CustomerReservationResponse |
| GET | `/api/customer/reservations/{id}` | 상세 조회 | 본인인증 후 | - | CustomerReservationResponse |
| PUT | `/api/customer/reservations/{id}` | 예약 수정 | 본인인증 후 | CustomerReservationUpdateRequest | CustomerReservationResponse |
| DELETE | `/api/customer/reservations/{id}` | 예약 취소 | 본인인증 후 | - | - |
| GET | `/api/customer/reservations/reserved-times` | 예약된 시간 | 없음 | ?date=YYYY-MM-DD | string[] |

---

## 6. JWT 토큰

### 6.1 토큰 구조

```
Access Token / Refresh Token 구조:
┌─────────────────────────────────────────────────────────────┐
│  Header (Base64 인코딩)                                      │
│  {                                                          │
│    "alg": "HS256",                                          │
│    "typ": "JWT"                                             │
│  }                                                          │
├─────────────────────────────────────────────────────────────┤
│  Payload (Base64 인코딩)                                     │
│  {                                                          │
│    "sub": "admin123",        // 사용자 식별자 (username)     │
│    "iat": 1737518400,        // 발급 시간 (Unix timestamp)   │
│    "exp": 1737520200         // 만료 시간 (Unix timestamp)   │
│  }                                                          │
├─────────────────────────────────────────────────────────────┤
│  Signature                                                  │
│  HMACSHA256(                                                │
│    base64UrlEncode(header) + "." +                          │
│    base64UrlEncode(payload),                                │
│    secret                                                   │
│  )                                                          │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 토큰 설정

```properties
# application.properties
jwt.secret=SuresSecretKeyForJwtAuthenticationMustBeAtLeast256BitsLong
jwt.access-expiration=1800000      # 30분 (밀리초)
jwt.refresh-expiration=604800000   # 7일 (밀리초)
```

### 6.3 토큰 사용 방식

```
1. 로그인 성공 시 토큰 발급
   - accessToken: API 요청 인증용 (30분)
   - refreshToken: accessToken 갱신용 (7일)

2. API 요청 시 토큰 전송
   Authorization: Bearer <accessToken>

3. 토큰 만료 시
   - 401 Unauthorized 응답
   - refreshToken으로 새 accessToken 발급 (추후 구현)
   - 또는 재로그인
```

---

## 7. 요청/응답 예시

### 7.1 로그인

**Request:**
```http
POST /api/admin/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "Password123!"
}
```

**Response (성공):**
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczNzUxODQwMCwiZXhwIjoxNzM3NTIwMjAwfQ.xxx",
    "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczNzUxODQwMCwiZXhwIjoxNzM4MTIzMjAwfQ.yyy",
    "adminInfo": {
      "id": 1,
      "username": "admin",
      "name": "관리자",
      "email": "admin@sures.com",
      "role": "SUPER_ADMIN"
    }
  },
  "message": "로그인 성공"
}
```

**Response (실패):**
```json
{
  "data": null,
  "message": null,
  "error": {
    "code": "AUTH_FAILED",
    "message": "아이디 또는 비밀번호가 올바르지 않습니다"
  }
}
```

### 7.2 예약 목록 조회

**Request:**
```http
GET /api/admin/reservations?page=0&size=20&status=CONFIRMED&startDate=2024-01-01&endDate=2024-01-31
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

**Response:**
```json
{
  "data": {
    "content": [
      {
        "id": 1,
        "reservationNumber": "R240115",
        "customerName": "홍길동",
        "phone": "010-1234-5678",
        "email": "hong@email.com",
        "reservationDate": "2024-01-20",
        "reservationTime": "10:00",
        "consultationType": "TAX_RETURN",
        "status": "CONFIRMED",
        "memo": "종합소득세 신고 상담",
        "createdAt": "2024-01-15T09:00:00",
        "updatedAt": "2024-01-15T10:30:00"
      }
    ],
    "page": 0,
    "size": 20,
    "totalElements": 45,
    "totalPages": 3
  },
  "message": "성공"
}
```

### 7.3 예약 등록

**Request:**
```http
POST /api/admin/reservations
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Content-Type: application/json

{
  "customerName": "김철수",
  "phone": "010-9876-5432",
  "email": "kim@email.com",
  "reservationDate": "2024-01-25",
  "reservationTime": "14:00",
  "consultationType": "VAT",
  "memo": "부가가치세 신고 관련"
}
```

**Response:**
```json
{
  "data": {
    "id": 46,
    "reservationNumber": "R240120",
    "customerName": "김철수",
    "phone": "010-9876-5432",
    "reservationDate": "2024-01-25",
    "reservationTime": "14:00",
    "consultationType": "VAT",
    "status": "PENDING",
    "createdAt": "2024-01-20T11:00:00"
  },
  "message": "예약이 등록되었습니다"
}
```

### 7.4 고객 예약 신청

**Request:**
```http
POST /api/customer/reservations
Content-Type: application/json

{
  "customerName": "이영희",
  "phone": "010-5555-6666",
  "email": "lee@email.com",
  "reservationDate": "2024-01-28",
  "reservationTime": "11:00",
  "consultationType": "CONSULTATION",
  "memo": "세무 상담 요청"
}
```

**Response:**
```json
{
  "data": {
    "id": 47,
    "reservationNumber": "R240121",
    "customerName": "이영희",
    "phone": "010-5555-6666",
    "reservationDate": "2024-01-28",
    "reservationTime": "11:00",
    "consultationType": "CONSULTATION",
    "status": "PENDING"
  },
  "message": "예약이 신청되었습니다. 예약번호: R240121"
}
```

### 7.5 고객 본인인증

**Request:**
```http
POST /api/customer/reservations/verify
Content-Type: application/json

{
  "customerName": "이영희",
  "phone": "010-5555-6666",
  "reservationNumber": "R240121"
}
```

**Response (성공):**
```json
{
  "data": {
    "id": 47,
    "reservationNumber": "R240121",
    "customerName": "이영희",
    "phone": "010-5555-6666",
    "reservationDate": "2024-01-28",
    "reservationTime": "11:00",
    "consultationType": "CONSULTATION",
    "status": "PENDING"
  },
  "message": "본인인증 성공"
}
```

---

## 부록: JWT 클래스 다이어그램

```
┌─────────────────────────────────────┐
│         JwtProperties               │
├─────────────────────────────────────┤
│ - secret: String                    │
│ - accessExpiration: long            │
│ - refreshExpiration: long           │
├─────────────────────────────────────┤
│ + getSecret(): String               │
│ + getAccessExpiration(): long       │
│ + getRefreshExpiration(): long      │
└─────────────────────────────────────┘
                 │
                 │ 의존
                 ▼
┌─────────────────────────────────────┐
│         JwtTokenProvider            │
├─────────────────────────────────────┤
│ - jwtProperties: JwtProperties      │
│ - userDetailsService: UDS           │
│ - secretKey: SecretKey              │
├─────────────────────────────────────┤
│ + createAccessToken(username)       │
│ + createRefreshToken(username)      │
│ + validateToken(token): boolean     │
│ + getUsername(token): String        │
│ + getAuthentication(token): Auth    │
└─────────────────────────────────────┘
                 │
                 │ 의존
                 ▼
┌─────────────────────────────────────┐
│     JwtAuthenticationFilter         │
├─────────────────────────────────────┤
│ - jwtTokenProvider: JwtTokenProvider│
├─────────────────────────────────────┤
│ # doFilterInternal(req, res, chain) │
│ - resolveToken(request): String     │
│ # shouldNotFilter(request): boolean │
└─────────────────────────────────────┘
```

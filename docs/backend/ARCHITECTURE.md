# Backend Architecture Guide

> 이 문서는 Backend 개발 시 준수해야 할 아키텍처 규칙과 패턴을 정의합니다.

## Clean Layered Architecture

### 레이어 구조

```
┌─────────────────────────────────────────────────────────────┐
│                      Presentation                           │
│              (Controller, Request, Response)                │
├─────────────────────────────────────────────────────────────┤
│                       Application                           │
│                (Service, Command, Result)                   │
├─────────────────────────────────────────────────────────────┤
│                         Domain                              │
│              (Entity, Repository Interface)                 │
├─────────────────────────────────────────────────────────────┤
│                      Infrastructure                         │
│          (Config, Security, Repository Impl)                │
└─────────────────────────────────────────────────────────────┘
```

### 의존성 규칙

```
presentation → application → domain ← infrastructure
```

- **절대 규칙**: 2계층을 뛰어넘는 의존성 금지
- presentation은 domain을 직접 참조할 수 없음
- infrastructure는 domain 인터페이스를 구현

---

## 레이어별 역할과 구성요소

### 1. Presentation Layer

**역할**: HTTP 요청/응답 처리, 입력 검증, DTO 변환

**구성요소**:
| 요소 | 설명 | 네이밍 |
|------|------|--------|
| Controller | REST API 엔드포인트 | `*Controller` |
| Request DTO | 클라이언트 요청 데이터 | `*Request` |
| Response DTO | 클라이언트 응답 데이터 | `*Response` |

**디렉토리 구조**:
```
presentation/
├── admin/
│   ├── controller/
│   │   ├── AdminReservationController.java
│   │   └── AdminAuthController.java
│   └── dto/
│       ├── request/
│       │   ├── ReservationCreateRequest.java
│       │   ├── ReservationUpdateRequest.java
│       │   ├── ReservationSearchRequest.java
│       │   └── AdminSignupRequest.java
│       └── response/
│           └── ReservationResponse.java
├── customer/
│   ├── controller/
│   │   └── CustomerReservationController.java
│   └── dto/
│       ├── request/
│       │   ├── CustomerReservationCreateRequest.java
│       │   ├── CustomerReservationUpdateRequest.java
│       │   └── CustomerReservationVerifyRequest.java
│       └── response/
│           └── CustomerReservationResponse.java
└── common/
    ├── controller/
    │   ├── HomeController.java
    │   └── CustomErrorController.java
    └── dto/
        ├── ApiResponse.java
        └── PageResponse.java
```

### 2. Application Layer

**역할**: Facade 및 DTO Mapper (비즈니스 로직 조합 계층)

Application Layer는 다음 역할만 수행합니다:
- **DTO 변환**: Request → Command, Result → Response
- **Domain Service 조합**: Domain Service들을 조합하여 유스케이스 구성
- **트랜잭션 경계 관리**: @Transactional 범위 설정
- **Presentation으로 전달**: Result DTO 반환

**중요**: Application Service는 **Repository를 직접 참조하거나 주입받으면 안됩니다**. 모든 데이터 접근은 Domain Service를 통해서만 수행합니다.

**구성요소**:
| 요소 | 설명 | 네이밍 |
|------|------|--------|
| Service | 유스케이스 Facade | `*Service` |
| Command | 서비스 입력 데이터 | `*Command` |
| Result | 서비스 출력 데이터 | `*Result` |

**의존성 규칙**:
- ✅ Domain Service 의존 (필수)
- ❌ Repository 직접 의존 (금지)

**디렉토리 구조**:
```
application/
├── admin/
│   ├── service/
│   │   ├── ReservationService.java
│   │   └── AdminService.java
│   └── dto/
│       ├── command/
│       │   ├── CreateReservationCommand.java
│       │   ├── UpdateReservationCommand.java
│       │   ├── SearchReservationCommand.java
│       │   └── AdminSignupCommand.java
│       └── result/
│           ├── ReservationResult.java
│           └── AdminResult.java
└── customer/
    ├── service/
    │   └── CustomerReservationService.java
    └── dto/
        ├── command/
        │   ├── CustomerCreateReservationCommand.java
        │   ├── CustomerUpdateReservationCommand.java
        │   └── CustomerVerifyReservationCommand.java
        └── result/
            └── CustomerReservationResult.java
```

### 3. Domain Layer

**역할**: 핵심 비즈니스 엔티티, 비즈니스 규칙, 리포지토리 인터페이스

**도메인 단위 구조** (entity/repository 단위가 아닌 도메인 단위로 구성):

**디렉토리 구조**:
```
domain/
├── admin/
│   ├── Admin.java              # 엔티티
│   ├── AdminRole.java          # Enum
│   ├── AdminRepository.java    # 리포지토리 인터페이스
│   └── AdminDomainService.java # 도메인 서비스
├── reservation/
│   ├── Reservation.java
│   ├── ReservationStatus.java
│   ├── ConsultationType.java
│   ├── ReservationRepository.java
│   ├── CustomerReservationRepository.java
│   ├── ReservationDomainService.java
│   └── ReservationConstants.java
└── common/
    ├── BaseEntity.java
    ├── PageRequest.java
    └── PageResult.java
```

### 4. Infrastructure Layer

**역할**: 기술 구현체, 외부 시스템 연동, 설정

**디렉토리 구조**:
```
infrastructure/
├── config/
│   ├── SecurityConfig.java
│   ├── JpaConfig.java
│   ├── QuerydslConfig.java
│   └── DomainServiceConfig.java
├── security/
│   └── AdminUserDetailsService.java
├── persistence/
│   ├── impl/
│   │   ├── AdminRepositoryImpl.java
│   │   ├── ReservationRepositoryImpl.java
│   │   └── CustomerReservationRepositoryImpl.java
│   ├── jpa/
│   │   ├── AdminJpaRepository.java
│   │   ├── ReservationJpaRepository.java
│   │   └── CustomerReservationJpaRepository.java
│   └── querydsl/
│       ├── ReservationQueryRepository.java
│       └── ReservationQueryRepositoryImpl.java
└── exception/
    └── GlobalExceptionHandler.java
```

---

## DTO 변환 규칙

### 변환 흐름

```
[Client]
    ↓ HTTP Request
[Presentation] Request ──toCommand()──→ Command
    ↓
[Application] Command ──toEntity() / 파라미터──→ Domain Entity
    ↓
[Domain] Entity
    ↓
[Application] Entity ──Result.from()──→ Result
    ↓
[Presentation] Result ──Response.from()──→ Response
    ↓ HTTP Response
[Client]
```

### 1. Request → Command 변환

**위치**: Presentation Layer (Request DTO 내부)

```java
// presentation/admin/dto/request/ReservationCreateRequest.java
public record ReservationCreateRequest(
    @NotBlank String customerName,
    @NotBlank @Pattern(regexp = "010-\\d{4}-\\d{4}") String phone,
    // ... validation 어노테이션
) {
    // Request → Command 변환 메서드
    public CreateReservationCommand toCommand() {
        return new CreateReservationCommand(
            customerName, phone, email,
            reservationDate, reservationTime,
            consultationType, memo
        );
    }
}
```

### 2. Command → Domain 변환

**위치**: Application Layer (Command DTO 내부 또는 Service)

```java
// application/admin/dto/command/CreateReservationCommand.java
public record CreateReservationCommand(...) {
    public Reservation toEntity(Long adminId) {
        return Reservation.builder()
            .customerName(customerName)
            // ...
            .build();
    }
}
```

### 3. Entity → Result 변환

**위치**: Application Layer (Result DTO의 정적 팩토리 메서드)

```java
// application/admin/dto/result/ReservationResult.java
public record ReservationResult(...) {
    public static ReservationResult from(Reservation entity) {
        return new ReservationResult(
            entity.getId(),
            entity.getCustomerName(),
            // ...
        );
    }
}
```

### 4. Result → Response 변환

**위치**: Presentation Layer (Response DTO의 정적 팩토리 메서드)

```java
// presentation/admin/dto/response/ReservationResponse.java
public record ReservationResponse(...) {
    public static ReservationResponse from(ReservationResult result) {
        return new ReservationResponse(
            result.id(),
            result.customerName(),
            // ...
        );
    }
}
```

---

## Controller 작성 패턴

```java
@RestController
@RequestMapping("/api/admin/reservations")
@RequiredArgsConstructor
public class AdminReservationController {

    private final ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ApiResponse<ReservationResponse>> create(
            @Valid @RequestBody ReservationCreateRequest request
    ) {
        // 1. Request → Command 변환
        CreateReservationCommand command = request.toCommand();

        // 2. Service 호출 (Command 전달)
        ReservationResult result = reservationService.createReservation(command, adminId);

        // 3. Result → Response 변환
        ReservationResponse response = ReservationResponse.from(result);

        return ResponseEntity.ok(ApiResponse.success(response, "예약이 등록되었습니다."));
    }
}
```

---

## Service 작성 패턴

```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    // ✅ GOOD - Domain Service만 의존
    private final ReservationDomainService reservationDomainService;

    // ❌ BAD - Repository 직접 의존 금지
    // private final ReservationRepository reservationRepository;

    @Transactional
    public ReservationResult createReservation(CreateReservationCommand command, Long adminId) {
        // 1. Domain Service로 Entity 생성 및 저장
        Reservation saved = reservationDomainService.createAndSave(
            command.customerName(),
            command.phone(),
            command.email(),
            command.reservationDate(),
            command.reservationTime(),
            command.consultationType(),
            command.memo(),
            adminId
        );

        // 2. Entity → Result 변환
        return ReservationResult.from(saved);
    }
}
```

---

## API 응답 형식

### 성공 응답

```json
{
  "data": { ... },
  "message": "성공"
}
```

### 에러 응답

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값이 올바르지 않습니다",
    "details": [
      { "field": "phone", "message": "연락처는 010-0000-0000 형식으로 입력해주세요" }
    ]
  }
}
```

---

## 금지 사항

### 1. 레이어 뛰어넘기 금지

```java
// ❌ BAD - Presentation에서 Domain 직접 참조
@RestController
public class BadController {
    private final ReservationRepository repository; // Domain 직접 참조 금지!
}

// ✅ GOOD - Application Layer만 참조
@RestController
public class GoodController {
    private final ReservationService service;
}
```

### 2. Entity 외부 노출 금지

```java
// ❌ BAD - Entity를 Controller에서 직접 반환
@GetMapping("/{id}")
public Reservation getById(@PathVariable Long id) { ... }

// ✅ GOOD - Response DTO로 변환하여 반환
@GetMapping("/{id}")
public ApiResponse<ReservationResponse> getById(@PathVariable Long id) { ... }
```

### 3. Request/Response를 Service에 전달 금지

```java
// ❌ BAD
public class BadService {
    public ReservationResponse create(ReservationCreateRequest request) { ... }
}

// ✅ GOOD
public class GoodService {
    public ReservationResult create(CreateReservationCommand command) { ... }
}
```

### 4. Application Layer에서 Repository 직접 참조 금지

**중요**: Application Service는 Repository를 직접 주입받거나 참조하면 안됩니다. 모든 데이터 접근은 Domain Service를 통해서만 수행합니다.

```java
// ❌ BAD - Application Service에서 Repository 직접 주입
@Service
@RequiredArgsConstructor
public class BadReservationService {
    private final ReservationRepository repository; // 금지!
    private final ReservationDomainService domainService;

    @Transactional
    public ReservationResult create(CreateReservationCommand command) {
        Reservation reservation = domainService.createReservation(...);
        Reservation saved = repository.save(reservation); // 금지!
        return ReservationResult.from(saved);
    }
}

// ✅ GOOD - Domain Service를 통해 데이터 접근
@Service
@RequiredArgsConstructor
public class GoodReservationService {
    private final ReservationDomainService domainService; // Domain Service만 의존

    @Transactional
    public ReservationResult create(CreateReservationCommand command) {
        // Domain Service에서 생성+저장을 처리
        Reservation saved = domainService.createAndSave(...);
        return ReservationResult.from(saved);
    }
}
```

**Application Layer의 역할**:
- ✅ DTO 변환 (Request → Command, Result → Response)
- ✅ Domain Service 조합 (비즈니스 로직 구성)
- ✅ 트랜잭션 경계 관리
- ❌ Repository 직접 호출 (금지)
- ❌ 직접적인 데이터 접근 (금지)

---

## 패키지 전체 구조

```
backend/src/main/java/com/sures/
├── SuresApplication.java
│
├── presentation/
│   ├── admin/
│   │   ├── controller/
│   │   └── dto/
│   │       ├── request/
│   │       └── response/
│   ├── customer/
│   │   ├── controller/
│   │   └── dto/
│   │       ├── request/
│   │       └── response/
│   └── common/
│       ├── controller/
│       └── dto/
│
├── application/
│   ├── admin/
│   │   ├── service/
│   │   └── dto/
│   │       ├── command/
│   │       └── result/
│   └── customer/
│       ├── service/
│       └── dto/
│           ├── command/
│           └── result/
│
├── domain/
│   ├── admin/
│   ├── reservation/
│   └── common/
│
└── infrastructure/
    ├── config/
    ├── security/
    ├── persistence/
    │   ├── impl/
    │   ├── jpa/
    │   └── querydsl/
    └── exception/
```

---

## 체크리스트

개발 시 다음 사항을 확인하세요:

- [ ] Controller는 Application Layer(Service)만 의존하는가?
- [ ] Service는 Domain Layer만 의존하는가?
- [ ] Request → Command → (Domain) → Result → Response 흐름을 따르는가?
- [ ] Entity가 Presentation Layer에 노출되지 않는가?
- [ ] 각 레이어에 맞는 DTO를 사용하고 있는가?
- [ ] Domain은 도메인 단위(admin, reservation)로 구성되어 있는가?
- [ ] API 응답은 ApiResponse 형식을 따르는가?

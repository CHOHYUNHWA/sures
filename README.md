# Sures - 세무 예약 관리 시스템

세무사 사무소를 위한 예약 관리 시스템입니다. 관리자와 고객을 위한 두 가지 인터페이스를 제공합니다.

## 프로젝트 구조

```
sures/
├── frontend/          # React (FSD 패턴)
│   ├── src/
│   │   ├── app/       # 앱 초기화, 프로바이더, 라우터
│   │   ├── pages/     # 페이지 컴포넌트
│   │   ├── widgets/   # 독립적 UI 블록
│   │   ├── features/  # 비즈니스 로직 기능
│   │   ├── entities/  # 비즈니스 엔티티
│   │   └── shared/    # 공유 유틸리티, UI
│   └── package.json
│
├── backend/           # Spring Boot (Clean Layered Architecture)
│   ├── src/main/java/com/sures/
│   │   ├── presentation/  # Controller, DTO
│   │   ├── application/   # Service (Use Cases)
│   │   ├── domain/        # Entity, Repository Interface
│   │   └── infrastructure/ # Config, Security
│   └── build.gradle
│
└── package.json       # 루트 모노레포 설정
```

## 기술 스택

### Frontend
- React 18 + TypeScript
- Vite
- React Router DOM
- TanStack Query (React Query)
- Axios

### Backend
- Spring Boot 4.0.1
- Java 17
- Spring Data JPA
- Spring Security
- MySQL
- QueryDSL

## 시작하기

### 사전 요구사항
- Node.js 18+
- Java 17+
- MySQL 8+

### 설치

```bash
# 루트에서 의존성 설치
npm install

# Frontend 의존성 설치
cd frontend && npm install
```

### 개발 서버 실행

```bash
# 프론트엔드 + 백엔드 동시 실행
npm run dev

# 또는 개별 실행
npm run dev:frontend  # localhost:3000
npm run dev:backend   # localhost:8080
```

### 빌드

```bash
# 전체 빌드
npm run build

# 개별 빌드
npm run build:frontend
npm run build:backend
```

## 브랜드 컬러

| 용도 | 컬러 | HEX |
|------|------|-----|
| 시그니처 (Primary) | 남색 | `#011541` |
| 포인트 (Accent) | 하늘색 | `#28a7e1` |
| 배경 | 흰색 | `#ffffff` |
| 텍스트 | 다크그레이 | `#333333` |

## 라이선스

Private - All rights reserved

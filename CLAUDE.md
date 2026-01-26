# Sures - 세무사 사무소 웹사이트

> **CLAUDE.md 최신화 정책**: 새로운 정책, 구조 변경, 컨벤션 추가 등이 발생하면 반드시 이 문서를 업데이트할 것.

## 프로젝트 개요
세무사 사무소 홍보 및 정보 제공 **정적 웹사이트**.
Next.js App Router + Static Export로 구축, Cloudflare Pages로 배포.

## 기술 스택

- **Framework**: Next.js 15 + React 19 + TypeScript
- **Rendering**: Static Site Generation (SSG)
- **Hosting**: Cloudflare Pages
- **서버리스 함수**: Cloudflare Workers (블로그 RSS 프록시용 - 예정)

## 프로젝트 구조
```
sures/
├── frontend/              # Next.js 정적 사이트
│   ├── src/
│   │   ├── app/           # App Router 페이지
│   │   │   ├── layout.tsx # 루트 레이아웃
│   │   │   ├── page.tsx   # 홈 페이지
│   │   │   ├── services/  # 서비스 소개 페이지
│   │   │   ├── why/       # Why SURES 페이지
│   │   │   └── contact/   # 오시는 길 페이지
│   │   └── components/
│   │       ├── layout/    # Header, Footer
│   │       └── ui/        # 공통 UI 컴포넌트
│   ├── public/            # 정적 파일 (이미지 등)
│   └── out/               # 빌드 결과물 (Static Export)
├── docs/                  # 문서
└── CLAUDE.md              # 프로젝트 문서
```

## 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 홈 | `/` | 메인 페이지 |
| 서비스 소개 | `/services` | 제공 서비스 안내 |
| Why SURES | `/why` | 사무소 소개 |
| 오시는 길 | `/contact` | 연락처, 위치 |

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

## 코드 컨벤션

### TypeScript/React
- 함수형 컴포넌트 + Named Export 사용
- CSS Modules 사용
- Path Alias: `@/components/...`, `@/app/...`

### SEO
- 각 페이지에 `metadata` export로 메타태그 설정
- Static Export로 HTML 사전 렌더링 → 검색엔진 최적화

## 개발 환경

```bash
# 개발 서버 실행
cd frontend
npm run dev     # localhost:3000

# 빌드
npm run build   # out/ 폴더에 결과물 생성

# 빌드 미리보기
npm run start
```

## Cloudflare Pages 배포

### 설정
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `frontend`

## TODO: 네이버 블로그 연동

Cloudflare Workers를 사용하여 네이버 블로그 RSS를 프록시로 가져와 표시할 예정.

```
브라우저 → Cloudflare Worker (프록시) → 네이버 블로그 RSS
```

# 테토-에겐 성격 테스트Add commentMore actions

한국어 성격 테스트 웹 애플리케이션입니다. 테토(외향적·주도적)와 에겐(감성적·섬세한) 성향을 분석하여 연애 스타일과 성격 특성을 제공합니다.

## 주요 기능

- 20문항 성격 테스트
- 테토-에겐 비율 분석
- 성별별 맞춤 결과
- 연애 궁합 분석
- 결과 이미지 저장 및 링크 공유
- 다크/라이트 테마 지원
- 모바일 최적화

## 기술 스택

### Frontend
- React + TypeScript
- Tailwind CSS
- Wouter (라우팅)
- TanStack Query (상태 관리)
- Lucide React (아이콘)
- HTML2Canvas (이미지 생성)

### Backend
- Express.js
- TypeScript
- Drizzle ORM
- Zod (검증)

### UI/UX
- shadcn/ui 컴포넌트
- 반응형 디자인
- 접근성 최적화
- 다크 모드 지원

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

앱이 http://localhost:5000 에서 실행됩니다.

## 프로젝트 구조

```
├── client/                 # 프론트엔드
│   ├── src/
│   │   ├── components/     # UI 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── data/           # 테스트 데이터
│   │   └── lib/            # 유틸리티
├── server/                 # 백엔드
│   ├── index.ts           # 서버 진입점
│   ├── routes.ts          # API 라우트
│   └── storage.ts         # 데이터 저장소
├── shared/                 # 공유 스키마
└── package.json
```

## 배포

이 애플리케이션은 Replit에서 개발되었으며, Replit Deployments를 통해 배포할 수 있습니다.

## 라이선스
Add commentMore actions
MIT License

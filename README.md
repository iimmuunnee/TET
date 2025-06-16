
# 테토-에겐 성격유형 테스트 🔥⚡🌙🌸

온라인 성격유형 테스트 웹 애플리케이션으로, 사용자의 연애 스타일과 성격을 **테토(Teto)** 와 **에겐(Egen)** 두 가지 성향으로 분석합니다.

## 🌟 주요 기능

### 📝 테스트 시스템
- **35문항**의 정교한 심리 테스트 질문
- 실제 테토-에겐 특징을 반영한 과학적 질문 설계
- 테토(외향적·주도적) vs 에겐(감성적·섬세한) 성향 분석
- 성별에 따른 맞춤형 결과 제공
- 실시간 진행률 저장 및 복원
- SNS, 연애, 갈등 해결, 클럽/노래방 등 현실적 상황 기반 질문

### 📊 결과 분석
- **성향 비율** 시각화 (테토/에겐 퍼센테이지)
- **4가지 성격유형**: 🔥테토남, ⚡테토녀, 🌙에겐남, 🌸에겐녀
- **연애 궁합** 분석 (최고 궁합, 주의 필요)
- 개인별 **성격 특성**과 **연애 스타일** 제공

### 🎨 사용자 경험
- **다크/라이트 모드** 지원
- **반응형 디자인** (모바일, 태블릿, 데스크톱)
- **결과 공유** 기능 (링크 복사, 이미지 저장)
- **접근성** 최적화 (키보드 네비게이션, 포커스 표시)
- **통계 대시보드** 페이지 (전체 테스트 통계 분석)
- **Google Analytics** 통합 (사용자 행동 분석)
- **AdSense** 광고 수익화 시스템
- **개인정보 보호** 동의 관리 시스템 (GDPR 준수)

## 🛠 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS** (스타일링)
- **Radix UI** (컴포넌트 라이브러리)
- **Tanstack Query** (서버 상태 관리)
- **Wouter** (라우팅)
- **html2canvas** (이미지 캡처)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Drizzle ORM** (데이터베이스)
- **Neon PostgreSQL** (클라우드 데이터베이스)
- **보안 시스템** (Rate Limiting, DDoS 방어, XSS/SQL Injection 보호)
- **세션 관리** (메모리 스토어 기반)

### 개발 도구
- **Vite** (빌드 도구)
- **ESLint** + **Prettier** (코드 품질)

## 🚀 실행 방법

### 개발 환경
```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 프로덕션 환경
```bash
# 빌드
npm run build

# 프로덕션 서버 시작
npm start
```

### 데이터베이스 설정
```bash
# 데이터베이스 스키마 푸시
npm run db:push
```

서버는 **포트 5000**에서 실행됩니다.

## 📱 앱 구조

```
client/src/
├── components/          # UI 컴포넌트
│   ├── ui/             # 공통 UI 컴포넌트
│   ├── name-input.tsx   # 이름 입력
│   ├── gender-selection.tsx  # 성별 선택
│   ├── question-screen.tsx   # 질문 화면
│   └── loading-screen.tsx    # 로딩 화면
├── data/               # 정적 데이터
│   ├── questions.ts    # 테스트 질문
│   └── results.ts      # 결과 데이터
├── pages/              # 페이지 컴포넌트
│   ├── home.tsx        # 홈페이지
│   ├── test.tsx        # 테스트 페이지
│   └── result.tsx      # 결과 페이지
└── lib/                # 유틸리티
    ├── test-calculator.ts  # 결과 계산
    └── validation.ts       # 데이터 검증
```

## 🎯 성격유형 분류

### 테토(Teto) 성향
- **특징**: 외향적, 주도적, 적극적
- **연애**: 직접적 표현, 활동적 데이트 선호
- **대표**: 🔥테토남, ⚡테토녀

### 에겐(Egen) 성향
- **특징**: 감성적, 섬세함, 내향적
- **연애**: 로맨틱한 표현, 감정적 교감 중시
- **대표**: 🌙에겐남, 🌸에겐녀

## 🔄 워크플로우

1. **이름 입력** → 2. **성별 선택** → 3. **35문항 테스트** → 4. **결과 분석** → 5. **공유**

## 📈 주요 특징

- ✅ **진행률 자동 저장** (새로고침해도 이어서 진행)
- ✅ **반응형 디자인** (모든 디바이스 지원)
- ✅ **다크모드** 지원
- ✅ **결과 이미지 저장** 기능
- ✅ **접근성** 최적화
- ✅ **한국어** 완전 지원
- ✅ **보안 강화** (Rate Limiting, DDoS 방어)
- ✅ **GDPR 준수** (쿠키 동의 관리)
- ✅ **통계 대시보드** (테스트 결과 통계)

## 🎨 디자인 시스템

- **테토 컬러**: 주황색 계열 (#f97316)
- **에겐 컬러**: 보라색 계열 (#a855f7)
- **폰트**: Noto Sans KR
- **아이콘**: Lucide React

## 📊 데이터베이스 스키마

```typescript
// 테스트 결과 저장
interface TestResult {
  id: string
  name: string
  gender: 'male' | 'female'
  answers: Answer[]
  resultType: 'teto' | 'egen'
  tetoScore: number
  egenScore: number
  createdAt: Date
}
```

## 🛡️ 보안 기능

### Rate Limiting
- **일반 요청**: 100회/15분
- **API 요청**: 20회/15분  
- **테스트 제출**: 3회/5분

### 보안 미들웨어
- XSS 공격 방어
- SQL Injection 방어
- 입력 데이터 검증 및 정화
- CSRF 토큰 검증

## 💰 수익화

### Google AdSense
- 클라이언트 ID: `ca-pub-xxxxxxxxxxxxxxxx`
- 반응형 광고 배너 (상단, 하단, 사이드바)
- 사용자 동의 관리 시스템

### Google Analytics
- 측정 ID: `G-xxxxxxxxxx`
- 사용자 행동 분석
- 페이지뷰 추적
- 이벤트 추적

## 🌐 배포

이 앱은 **Replit**에서 개발되고 배포됩니다.

### 환경 변수
```bash
DATABASE_URL=
VITE_GA_MEASUREMENT_ID=G-xxxxxxxxxx
```

---

💕 **테토-에겐 테스트로 나의 연애 스타일을 알아보세요!**

## 📊 최신 업데이트 (2024.06.16)

- ✨ **질문 35개로 확대** - 더 정교한 성격 분석
- 🎯 **실제 테토-에겐 특징 반영** - 과학적 근거 기반 질문
- 💡 **젊은 세대 특화** - SNS, 클럽, 연애, 노래방 등 현실적 상황
- 📊 **통계 대시보드** - 전체 테스트 결과 통계 분석 페이지
- 🔒 **보안 시스템 강화** - DDoS 방어, Rate Limiting
- 🍪 **GDPR 준수** - 쿠키 동의 관리
- 💰 **수익화 시스템** - AdSense, Analytics 통합

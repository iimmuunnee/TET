# Google AdSense 수익화 설정 가이드

## 1. Google AdSense 계정 생성 및 승인

1. [Google AdSense](https://www.google.com/adsense/) 접속
2. 계정 생성 및 웹사이트 등록
3. 사이트 승인 대기 (보통 1-7일 소요)

## 2. 광고 단위 생성

AdSense 승인 후 다음 광고 단위들을 생성하세요:

- **상단 배너**: 728x90 또는 반응형
- **하단 배너**: 728x90 또는 반응형  
- **결과 페이지 상단**: 300x250 또는 반응형
- **결과 페이지 하단**: 728x90 또는 반응형

## 3. 코드 적용

### 3.1 AdSense 클라이언트 ID 설정
`client/src/lib/ads.ts` 파일에서 다음을 수정:
```typescript
CLIENT_ID: 'ca-pub-YOUR_ACTUAL_CLIENT_ID'
```

### 3.2 광고 슬롯 ID 설정
각 광고 단위에서 받은 슬롯 ID를 설정:
```typescript
SLOTS: {
  BANNER_TOP: 'YOUR_TOP_BANNER_SLOT_ID',
  BANNER_BOTTOM: 'YOUR_BOTTOM_BANNER_SLOT_ID',
  RESULT_TOP: 'YOUR_RESULT_TOP_SLOT_ID',
  RESULT_BOTTOM: 'YOUR_RESULT_BOTTOM_SLOT_ID'
}
```

### 3.3 광고 활성화
```typescript
ENABLED: true,
TEST_MODE: false
```

## 4. AdBanner 컴포넌트 교체

현재 플레이스홀더 광고를 실제 AdSense 코드로 교체:

```typescript
// client/src/components/ad-banner.tsx 수정
import { GoogleAdSense } from './google-adsense';
import { getAdsConfig } from '@/lib/ads';

export function AdBanner({ position }: AdBannerProps) {
  const adsConfig = getAdsConfig();
  
  if (!adsConfig.ENABLED) {
    return <div>광고 준비 중...</div>;
  }

  const slotId = adsConfig.SLOTS[position.toUpperCase() as keyof typeof adsConfig.SLOTS];
  
  return (
    <GoogleAdSense
      adClient={adsConfig.CLIENT_ID}
      adSlot={slotId}
      className="ad-container"
    />
  );
}
```

## 5. 수익 최적화 팁

- **트래픽 증가**: SEO 최적화, 소셜미디어 마케팅
- **클릭률 개선**: 광고 위치 최적화, A/B 테스트
- **사용자 경험**: 광고와 콘텐츠의 균형 유지
- **모바일 최적화**: 반응형 광고 단위 사용

## 6. 모니터링

- Google Analytics로 트래픽 추적
- AdSense 보고서로 수익 모니터링
- 페이지 로딩 속도 확인
- 사용자 만족도 관찰

## 주의사항

- 자신의 광고 클릭 금지
- 가짜 트래픽 생성 금지
- Google AdSense 정책 준수
- 정기적인 광고 성과 분석
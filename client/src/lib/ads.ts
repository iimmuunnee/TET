// Google AdSense 설정
export const ADS_CONFIG = {
  // AdSense 승인 후 실제 값으로 교체
  CLIENT_ID: 'ca-pub-XXXXXXXXXXXXXXXX', // 실제 AdSense 클라이언트 ID
  SLOTS: {
    BANNER_TOP: '1234567890',    // 상단 배너 광고 슬롯 ID
    BANNER_BOTTOM: '1234567891', // 하단 배너 광고 슬롯 ID
    SIDEBAR: '1234567892',       // 사이드바 광고 슬롯 ID
    RESULT_TOP: '1234567893',    // 결과 페이지 상단 광고
    RESULT_BOTTOM: '1234567894', // 결과 페이지 하단 광고
  },
  // 광고 활성화 상태 (개발/테스트 시에는 false)
  ENABLED: false,
  // 테스트 모드 (개발 환경에서 사용)
  TEST_MODE: true
};

// 환경별 설정
export const getAdsConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  
  return {
    ...ADS_CONFIG,
    ENABLED: !isDevelopment && ADS_CONFIG.ENABLED,
    TEST_MODE: isDevelopment || ADS_CONFIG.TEST_MODE
  };
};
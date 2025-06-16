// Google AdSense 설정
export const ADS_CONFIG = {
  // AdSense 클라이언트 ID
  CLIENT_ID: 'ca-pub-8774598116918128',
  SLOTS: {
    BANNER_TOP: '1234567890',    // 상단 배너 광고 슬롯 ID (광고 단위 생성 후 교체)
    BANNER_BOTTOM: '1234567891', // 하단 배너 광고 슬롯 ID (광고 단위 생성 후 교체)
    SIDEBAR: '1234567892',       // 사이드바 광고 슬롯 ID (광고 단위 생성 후 교체)
    RESULT_TOP: '1234567893',    // 결과 페이지 상단 광고 (광고 단위 생성 후 교체)
    RESULT_BOTTOM: '1234567894', // 결과 페이지 하단 광고 (광고 단위 생성 후 교체)
  },
  // 광고 활성화 상태
  ENABLED: true,
  // 테스트 모드
  TEST_MODE: false
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
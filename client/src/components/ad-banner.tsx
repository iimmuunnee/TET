import { GoogleAdSense } from './google-adsense';
import { getAdsConfig } from '@/lib/ads';
import { Card } from "@/components/ui/card";

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

export function AdBanner({ position, className = "" }: AdBannerProps) {
  const adsConfig = getAdsConfig();
  
  // 광고 슬롯 매핑
  const slotMapping = {
    top: adsConfig.SLOTS.BANNER_TOP,
    bottom: adsConfig.SLOTS.BANNER_BOTTOM,
    sidebar: adsConfig.SLOTS.SIDEBAR
  };

  const adConfig = {
    top: { width: 'w-full max-w-4xl', height: 'h-24' },
    bottom: { width: 'w-full max-w-4xl', height: 'h-24' },
    sidebar: { width: 'w-full max-w-xs', height: 'h-64' }
  };

  const config = adConfig[position];

  if (!adsConfig.ENABLED) {
    return (
      <Card className={`${config.width} ${config.height} ${className} bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-dashed border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-sm font-medium">광고 영역</div>
          <div className="text-xs mt-1">AdSense 준비 중...</div>
        </div>
      </Card>
    );
  }

  const slotId = slotMapping[position];
  
  return (
    <div className={`${config.width} ${className}`}>
      <GoogleAdSense
        adClient={adsConfig.CLIENT_ID}
        adSlot={slotId}
        className="w-full"
        adStyle={{ display: 'block', minHeight: config.height.replace('h-', '').replace('24', '96px').replace('64', '256px') }}
      />
    </div>
  );
}
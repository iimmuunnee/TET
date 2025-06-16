import { Card } from "@/components/ui/card";

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

export function AdBanner({ position, className = "" }: AdBannerProps) {
  // 광고 슬롯 설정 (나중에 실제 AdSense 코드로 교체)
  const adConfig = {
    top: { width: 'w-full max-w-4xl', height: 'h-24', text: '상단 배너 광고' },
    bottom: { width: 'w-full max-w-4xl', height: 'h-24', text: '하단 배너 광고' },
    sidebar: { width: 'w-full max-w-xs', height: 'h-64', text: '사이드바 광고' }
  };

  const config = adConfig[position];

  return (
    <Card className={`${config.width} ${config.height} ${className} bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-dashed border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center`}>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="text-sm font-medium">광고 영역</div>
        <div className="text-xs mt-1">{config.text}</div>
        <div className="text-xs mt-2 opacity-75">
          AdSense 코드 삽입 예정
        </div>
      </div>
    </Card>
  );
}
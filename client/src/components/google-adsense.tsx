import { useEffect } from 'react';

interface GoogleAdSenseProps {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  adStyle?: React.CSSProperties;
  className?: string;
}

export function GoogleAdSense({
  adClient,
  adSlot,
  adFormat = 'auto',
  adStyle = { display: 'block' },
  className = ''
}: GoogleAdSenseProps) {
  useEffect(() => {
    try {
      // Google AdSense 스크립트가 이미 로드되었는지 확인
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// AdSense 스크립트 로더
export function loadAdSenseScript(adClient: string) {
  if (typeof window === 'undefined') return;

  const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
  if (existingScript) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;
  script.crossOrigin = 'anonymous';
  
  document.head.appendChild(script);
}
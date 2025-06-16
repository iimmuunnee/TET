import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

interface ConsentBannerProps {
  onConsentChange?: (consented: boolean) => void;
}

export function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [consented, setConsented] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent === null) {
      setShowBanner(true);
    } else {
      const consent = savedConsent === 'true';
      setConsented(consent);
      onConsentChange?.(consent);
    }
  }, [onConsentChange]);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setConsented(true);
    setShowBanner(false);
    onConsentChange?.(true);
    
    // Initialize Google Analytics if consented
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'false');
    setConsented(false);
    setShowBanner(false);
    onConsentChange?.(false);
    
    // Deny consent for Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <Card className="border-2 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-sm">쿠키 및 개인정보 처리</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReject}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            이 사이트는 광고 개인화 및 분석을 위해 쿠키를 사용합니다. 
            계속 사용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.
          </p>
          
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button 
              onClick={handleAccept}
              size="sm"
              className="flex-1 text-xs"
            >
              동의
            </Button>
            <Button 
              onClick={handleReject}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              거부
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            설정은 언제든지 변경할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
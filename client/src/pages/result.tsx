import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, RotateCcw, Share2, Check, Heart } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { resultData } from "@/data/results";
import { useToast } from "@/hooks/use-toast";
import type { TestResult } from "@shared/schema";

export default function Result() {
  const [match, params] = useRoute("/result/:id");
  const { toast } = useToast();
  const resultId = params?.id;

  const { data: testResult, isLoading, error } = useQuery<TestResult>({
    queryKey: ['/api/test-results', resultId],
    enabled: !!resultId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full border-4 border-indigo-200 dark:border-indigo-400 border-t-indigo-600 dark:border-t-indigo-300 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-300">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error || !testResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-slate-900">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <Users size={48} className="mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">결과를 찾을 수 없습니다</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">요청하신 테스트 결과가 존재하지 않습니다.</p>
            <Link href="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const result = resultData[testResult.gender as 'male' | 'female'][testResult.resultType as 'teto' | 'egen'];
  const gradientFrom = result.resultType === 'teto' ? 'from-teto/20' : 'from-egen/20';
  const gradientTo = result.resultType === 'teto' ? 'to-teto/10' : 'to-egen/10';

  // Generate emoji for each personality type
  const getPersonalityEmoji = () => {
    const isMale = testResult.gender === 'male';
    const isTeto = result.resultType === 'teto';
    
    if (isMale && isTeto) {
      return '🔥'; // 테토남 - 불꽃 (열정적, 적극적)
    } else if (isMale && !isTeto) {
      return '🌙'; // 에겐남 - 달 (감성적, 섬세함)
    } else if (!isMale && isTeto) {
      return '⚡'; // 테토녀 - 번개 (활발함, 에너지)
    } else {
      return '🌸'; // 에겐녀 - 벚꽃 (부드러움, 따뜻함)
    }
  };



  const handleShare = async () => {
    const text = `${testResult.name}님의 테토-에겐 성격유형은 "${result.title}"입니다! 여러분도 테스트해보세요!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '테토-에겐 성격유형 테스트 결과',
          text: text,
          url: window.location.href
        });
      } catch (err) {
        // User cancelled or error occurred
      }
    } else {
      try {
        await navigator.clipboard.writeText(text + ' ' + window.location.href);
        toast({
          title: "복사 완료!",
          description: "결과가 클립보드에 복사되었습니다.",
        });
      } catch (err) {
        toast({
          title: "공유 실패",
          description: "결과 공유 중 오류가 발생했습니다.",
          variant: "destructive"
        });
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      const shareUrl = window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "링크 복사 완료!",
        description: "결과 페이지 링크가 클립보드에 복사되었습니다.",
      });
    } catch (error) {
      toast({
        title: "복사 실패",
        description: "링크 복사 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleSaveResult = async () => {
    try {
      // 현재 다크모드 상태 확인
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      // 테마 토글 버튼 숨기기
      const themeToggle = document.querySelector('.fixed.top-4.right-4') as HTMLElement;
      if (themeToggle) {
        themeToggle.style.display = 'none';
      }

      // 잠시 기다려서 스타일이 적용되도록 함
      await new Promise(resolve => setTimeout(resolve, 100));

      const resultElement = document.querySelector('.result-capture');
      if (!resultElement) return;

      // 다크모드에 따라 배경색 설정
      const backgroundColor = isDarkMode ? '#0f172a' : '#ffffff';

      // html2canvas를 사용하여 결과 페이지를 이미지로 변환
      const html2canvas = await import('html2canvas');
      const canvas = await html2canvas.default(resultElement as HTMLElement, {
        backgroundColor: backgroundColor,
        scale: 1.5,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
        logging: false,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        removeContainer: true
      });

      // 테마 토글 버튼 다시 보이기
      if (themeToggle) {
        themeToggle.style.display = '';
      }

      // 캔버스를 이미지로 변환하여 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `teto-egen-result-${testResult.name}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          toast({
            title: "이미지 저장 완료!",
            description: "결과 이미지가 다운로드되었습니다.",
          });
        }
      }, 'image/png');
    } catch (error) {
      toast({
        title: "저장 실패",
        description: "결과 저장 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 px-4 bg-white dark:bg-slate-900">
      <div className="fixed top-8 left-8 z-50">
        <div className="text-7xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="result-capture bg-white dark:bg-slate-900 p-6 rounded-lg mb-8">
          {/* Result Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 flex items-center justify-center text-6xl sm:text-7xl md:text-8xl">
              {getPersonalityEmoji()}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-3 md:mb-4 px-2">{testResult.name}님의 결과</h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300 mb-2 px-2">{result.title}</h3>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 px-4">{result.subtitle}</p>
          </div>

          {/* Score Display */}
        <Card className="shadow-xl mb-6 md:mb-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 md:mb-6">성향 분석</h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl border border-orange-200 dark:border-orange-700">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {Math.round((testResult.tetoScore / (testResult.tetoScore + testResult.egenScore)) * 100)}%
                </div>
                <div className="text-sm sm:text-base font-semibold text-orange-700 dark:text-orange-300 mb-1">테토 성향</div>
                <div className="text-xs sm:text-sm text-orange-600 dark:text-orange-400">적극적 · 주도적</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {Math.round((testResult.egenScore / (testResult.tetoScore + testResult.egenScore)) * 100)}%
                </div>
                <div className="text-sm sm:text-base font-semibold text-purple-700 dark:text-purple-300 mb-1">에겐 성향</div>
                <div className="text-xs sm:text-sm text-purple-600 dark:text-purple-400">감성적 · 섬세함</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Result Card */}
        <Card className="shadow-xl mb-6 md:mb-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 md:mb-6">성격 특성</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm sm:text-base relative pl-6">
                  <Users className="text-indigo-600 absolute left-0 top-0" size={18} style={{ transform: 'translateY(2px)' }} />
                  성격적 특성
                </h4>
                <ul className="space-y-2 text-slate-600">
                  {result.traits.map((trait: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span className="text-xs sm:text-sm leading-relaxed break-words korean-text mobile-text-xs">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm sm:text-base relative pl-6">
                  <Heart className="text-pink-600 absolute left-0 top-0" size={18} style={{ transform: 'translateY(2px)' }} />
                  연애 스타일
                </h4>
                <ul className="space-y-2 text-slate-600">
                  {result.dating.map((style: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={14} />
                      <span className="text-xs sm:text-sm leading-relaxed break-words korean-text mobile-text-xs">{style}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compatibility */}
        <Card className="shadow-xl mb-6 md:mb-8">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 md:mb-6">연애 궁합</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 text-sm sm:text-base relative pl-6">
                  <Heart className="text-green-600 absolute left-0 top-0" size={18} style={{ transform: 'translateY(2px)' }} />
                  최고 궁합
                </h4>
                <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 leading-relaxed break-words korean-text mobile-text-xs">
                  {result.bestMatch
                    .replace(/테토남/g, '🔥테토남')
                    .replace(/테토녀/g, '⚡테토녀')
                    .replace(/에겐남/g, '🌙에겐남')
                    .replace(/에겐녀/g, '🌸에겐녀')
                    .replace(/테토/g, result.bestMatch.includes('테토남') || result.bestMatch.includes('테토녀') ? '테토' : '🔥테토')
                    .replace(/에겐/g, result.bestMatch.includes('에겐남') || result.bestMatch.includes('에겐녀') ? '에겐' : '🌸에겐')}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 sm:p-6 border border-yellow-200 dark:border-yellow-700">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3 text-sm sm:text-base relative pl-6">
                  <Users className="text-yellow-600 absolute left-0 top-0" size={18} style={{ transform: 'translateY(2px)' }} />
                  주의 필요
                </h4>
                <p className="text-xs sm:text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed break-words korean-text mobile-text-xs">
                  {result.cautionMatch
                    .replace(/테토남/g, '🔥테토남')
                    .replace(/테토녀/g, '⚡테토녀')
                    .replace(/에겐남/g, '🌙에겐남')
                    .replace(/에겐녀/g, '🌸에겐녀')
                    .replace(/테토/g, result.cautionMatch.includes('테토남') || result.cautionMatch.includes('테토녀') ? '테토' : '🔥테토')
                    .replace(/에겐/g, result.cautionMatch.includes('에겐남') || result.cautionMatch.includes('에겐녀') ? '에겐' : '🌸에겐')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-3 md:space-y-4 px-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              onClick={handleShare}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base focus-visible border-0"
              aria-label="결과 공유하기"
            >
              <Share2 className="mr-2" size={16} />
              결과 공유하기
            </Button>
            <Link href="/">
              <Button 
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 text-sm sm:text-base focus-visible border-0"
                aria-label="다시 테스트하기"
              >
                <RotateCcw className="mr-2" size={16} />
                다시 테스트하기
              </Button>
            </Link>
          </div>
          
          {/* 링크 복사 및 결과 저장 버튼 */}
          <div className="flex flex-row gap-3 justify-center">
            <Button
              onClick={handleCopyLink}
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-full transition-all duration-200 border-0 shadow-md hover:shadow-lg"
              aria-label="링크 복사하기"
            >
              🔗 링크 복사
            </Button>
            <Button
              onClick={handleSaveResult}
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-full transition-all duration-200 border-0 shadow-md hover:shadow-lg"
              aria-label="결과 이미지 저장하기"
            >
              💾 결과 저장
            </Button>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <span className="text-blue-500 font-semibold">링크</span>를 <span className="text-blue-500 font-semibold">복사</span>하거나 <span className="text-green-500 font-semibold">결과</span>를 <span className="text-green-500 font-semibold">저장</span>해서 공유해보세요!
          </p>
        </div>
      </div>
    </div>
  );
}

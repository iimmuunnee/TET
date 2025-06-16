import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AdBanner } from "@/components/ad-banner";

export default function Home() {
  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-900 flex flex-col">
      <div className="absolute top-4 sm:top-8 left-4 sm:left-8 z-10">
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2 leading-tight">
              <span className="text-teto font-extrabold">테토</span>
              <span className="text-slate-800 dark:text-slate-200">-</span>
              <span className="text-egen font-extrabold">에겐</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">테스트</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed px-4">
              나의 연애 스타일과 성격을 알아보는 심리 테스트
            </p>
          </div>

          {/* Visual Elements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 md:mb-8 max-w-md mx-auto px-4">
            <Card className="border-2 border-teto/20 hover:border-teto/30 transition-colors bg-white dark:bg-slate-800">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-teto/20 to-teto/10 rounded-full flex items-center justify-center text-3xl sm:text-4xl">
                    🔥
                  </div>
                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-teto/20 to-teto/10 rounded-full flex items-center justify-center text-3xl sm:text-4xl">
                    ⚡
                  </div>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">테토 유형</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">외향적·주도적 성향<br/>비율로 분석</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-egen/20 hover:border-egen/30 transition-colors bg-white dark:bg-slate-800">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-egen/20 to-egen/10 rounded-full flex items-center justify-center text-3xl sm:text-4xl">
                    🌙
                  </div>
                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-egen/20 to-egen/10 rounded-full flex items-center justify-center text-3xl sm:text-4xl">
                    🌸
                  </div>
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">에겐 유형</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">감성적·섬세한 성향<br/>비율로 분석</p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/50 dark:border-slate-700/50 mb-6 md:mb-8 mx-4">
            <CardContent className="p-4 sm:p-6">
              <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-3 text-center">
                총 <strong>35문항</strong>의 질문으로 당신의 성격 유형과
                <br/>
                <strong><span className="text-teto">테토</span>-<span className="text-egen">에겐</span> 비율</strong>, 연애 스타일을 분석해보세요!
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                💡 우측 상단에서 라이트/다크 모드 변경 가능
              </p>
            </CardContent>
          </Card>

          {/* 광고 배너 */}
          <div className="flex justify-center mb-6">
            <AdBanner position="top" />
          </div>

          {/* Start Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mx-4"
              >
                테스트 시작하기 <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
            <Link href="/statistics">
              <Button size="lg" variant="outline" className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 mx-4">
                📊 통계 보기 <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
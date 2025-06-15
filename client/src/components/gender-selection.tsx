import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft, Home } from "lucide-react";
import type { Gender } from "@/pages/test";

interface GenderSelectionProps {
  onGenderSelect: (gender: Gender) => void;
  onBackToName?: () => void;
}

import { useState } from "react";

export default function GenderSelection({ onGenderSelect, onBackToName }: GenderSelectionProps) {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);

    // 모바일에서 시각적 피드백을 위한 딜레이
    setTimeout(() => {
      onGenderSelect(gender);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-900 flex flex-col relative">
      {/* 로고 */}
      <div className="absolute top-2 sm:top-4 md:top-8 left-2 sm:left-4 md:left-8 z-50">
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-4 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg">
        {/* Title */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-2 sm:mb-3">
            <span className="text-teto font-extrabold">테토</span>
            <span className="text-slate-800 dark:text-slate-200">-</span>
            <span className="text-egen font-extrabold">에겐</span>{" "}
            <span className="text-slate-800 dark:text-slate-200">테스트</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            성별을 선택해주세요
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 md:mb-8 px-2">
          <Button
            onClick={() => handleGenderSelect('male')}
            variant="outline"
            className={`w-full text-left p-4 sm:p-6 md:p-8 rounded-2xl border-2 h-auto justify-start transition-all duration-200 ${
              selectedGender === 'male'
                ? 'border-orange-400 bg-orange-50 dark:border-orange-500 dark:bg-orange-950/20 shadow-md' 
                : 'bg-white dark:bg-slate-800 border-slate-200 hover:border-orange-300 hover:bg-orange-50 dark:border-slate-600 dark:hover:border-orange-400 dark:hover:bg-orange-950/10 active:bg-orange-50 dark:active:bg-orange-950/10 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-center w-full min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-teto/20 to-teto/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 md:mr-6 flex-shrink-0 text-xl sm:text-2xl md:text-3xl">
                👨
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-1 break-words">남자</h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 break-words">테토남 / 에겐남</p>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => handleGenderSelect('female')}
            variant="outline"
            className={`w-full text-left p-4 sm:p-6 md:p-8 rounded-2xl border-2 h-auto justify-start transition-all duration-200 ${
              selectedGender === 'female'
                ? 'border-purple-400 bg-purple-50 dark:border-purple-500 dark:bg-purple-950/20 shadow-md' 
                : 'bg-white dark:bg-slate-800 border-slate-200 hover:border-purple-300 hover:bg-purple-50 dark:border-slate-600 dark:hover:border-purple-400 dark:hover:bg-purple-950/10 active:bg-purple-50 dark:active:bg-purple-950/10 hover:shadow-sm'
            }`}
          >
            <div className="flex items-center justify-center w-full min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-egen/20 to-egen/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 md:mr-6 flex-shrink-0 text-xl sm:text-2xl md:text-3xl">
                👩
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-1 break-words">여자</h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 break-words">테토녀 / 에겐녀</p>
              </div>
            </div>
          </Button>
        </div>
        </div>
      </div>

      <div className="p-2 sm:p-4 flex justify-between">
        {onBackToName ? (
          <Button 
            variant="ghost" 
            className="text-slate-500 hover:text-slate-700 font-medium transition-colors"
            onClick={onBackToName}
          >
            <ArrowLeft className="mr-2" size={16} />
            이전으로
          </Button>
        ) : (
          <div></div>
        )}
        <Link href="/">
          <Button 
            variant="ghost" 
            className="text-slate-500 hover:text-slate-700 font-medium transition-colors"
          >
            처음으로 <Home className="ml-2" size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
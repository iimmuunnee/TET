import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-sky-100 dark:bg-slate-900 flex flex-col">
      <div className="fixed top-4 sm:top-8 left-4 sm:left-8 z-50">
        <div className="text-4xl sm:text-5xl md:text-7xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-lg w-full">
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            <span className="text-teto font-extrabold">테토</span>
            <span className="text-slate-800 dark:text-slate-200">-</span>
            <span className="text-egen font-extrabold">에겐</span>{" "}
            <span className="text-slate-800 dark:text-slate-200">테스트</span>
          </h1>
        </div>

        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3 md:mb-4 px-2">성별을 선택해주세요!</h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 px-4">정확한 결과를 위해 성별을 선택해주세요 (🖍️는 없어요❌)</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 md:mb-8 px-2">
          <Button
            onClick={() => handleGenderSelect('male')}
            variant="outline"
            onMouseLeave={(e) => {
              e.currentTarget.blur();
            }}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
            className={`group border-2 rounded-2xl p-4 sm:p-6 md:p-8 h-auto transition-all duration-300 md:transform md:hover:scale-105 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
              selectedGender === 'male' 
                ? 'bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-950/15 border-orange-300 dark:border-orange-500' 
                : 'bg-white dark:bg-slate-800 md:hover:bg-gradient-to-r md:hover:from-orange-100 md:hover:to-orange-50 dark:md:hover:from-orange-950/30 dark:md:hover:to-orange-950/15 border-gray-200 dark:border-slate-600 md:hover:border-orange-300'
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
            onMouseLeave={(e) => {
              e.currentTarget.blur();
            }}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
            className={`group border-2 rounded-2xl p-4 sm:p-6 md:p-8 h-auto transition-all duration-300 md:transform md:hover:scale-105 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
              selectedGender === 'female' 
                ? 'bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-950/30 dark:to-purple-950/15 border-purple-300 dark:border-purple-500' 
                : 'bg-white dark:bg-slate-800 md:hover:bg-gradient-to-r md:hover:from-purple-100 md:hover:to-purple-50 dark:md:hover:from-purple-950/30 dark:md:hover:to-purple-950/15 border-gray-200 dark:border-slate-600 md:hover:border-purple-300'
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

      <div className="p-4 text-center">
        {onBackToName ? (
          <Button 
            variant="ghost" 
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium transition-colors"
            onClick={onBackToName}
          >
            <ArrowLeft className="mr-2" size={16} />
            이전으로
          </Button>
        ) : (
          <Link href="/">
            <Button variant="ghost" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium transition-colors">
              <ArrowLeft className="mr-2" size={16} />
              홈으로 돌아가기
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
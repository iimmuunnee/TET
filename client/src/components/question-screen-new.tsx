import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Home } from "lucide-react";
import type { Answer } from "@/pages/test";

interface Question {
  text: string;
  options: Answer[];
}

interface QuestionScreenProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  question: Question;
  onAnswerSelect: (answer: Answer) => void;
  onPreviousQuestion: () => void;
  onBackToGender: () => void;
  onResetToHome: () => void;
  canGoBack: boolean;
}

export default function QuestionScreen({
  currentQuestionIndex,
  totalQuestions,
  question,
  onAnswerSelect,
  onPreviousQuestion,
  onBackToGender,
  onResetToHome,
  canGoBack
}: QuestionScreenProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Reset selection when question changes
  useEffect(() => {
    setSelectedIndex(null);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = useCallback((answer: Answer, index: number) => {
    setSelectedIndex(index);
    setTimeout(() => {
      onAnswerSelect(answer);
    }, 200);
  }, [onAnswerSelect]);

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-900 flex flex-col relative">
      {/* Logo */}
      <div className="absolute top-2 sm:top-4 md:top-8 left-2 sm:left-4 md:left-8 z-50">
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-4 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
          {/* Title */}
          <div className="text-center mb-3 sm:mb-4 md:mb-6">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              <span className="text-teto font-extrabold">테토</span>
              <span className="text-slate-800 dark:text-slate-200">-</span>
              <span className="text-egen font-extrabold">에겐</span>{" "}
              <span className="text-slate-800 dark:text-slate-200">테스트</span>
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">진행률</span>
              <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
                {currentQuestionIndex + 1}/{totalQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-2 sm:h-3" />
          </div>

          {/* Question Card */}
          <Card className="shadow-lg sm:shadow-xl mb-4 sm:mb-6 md:mb-8 mx-auto">
            <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="mb-3 sm:mb-4 md:mb-6">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 sm:mb-3 md:mb-4 leading-relaxed break-words hyphens-auto">
                  {currentQuestionIndex + 1}. {question.text}
                </h3>
              </div>

              {/* Answer Options */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {question.options.map((option, index) => (
                  <Button
                    key={`${currentQuestionIndex}-${index}`}
                    onClick={() => handleAnswerSelect(option, index)}
                    variant="outline"
                    className={`w-full text-left p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border-2 h-auto min-h-[44px] sm:min-h-[48px] justify-start transition-all duration-200 touch-manipulation ${
                      selectedIndex === index
                        ? 'border-purple-400 bg-purple-50 dark:border-purple-500 dark:bg-purple-950/20 shadow-md' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50 dark:border-slate-600 dark:hover:border-sky-400 dark:hover:bg-sky-950/10 active:bg-sky-50 dark:active:bg-sky-950/10'
                    }`}
                    aria-label={`선택지 ${index + 1}: ${option.text}`}
                    role="radio"
                    aria-checked={selectedIndex === index}
                  >
                    <div className="flex items-start w-full gap-3">
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-colors ${
                        selectedIndex === index
                          ? 'border-purple-500 bg-purple-500/10' 
                          : 'border-slate-300 dark:border-slate-500'
                      }`}>
                        {selectedIndex === index && (
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-purple-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed block break-words hyphens-auto word-break-keep-all">
                          {option.text}
                        </span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-sky-100/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4 flex justify-between items-center gap-2">
        <Button 
          onClick={canGoBack ? onPreviousQuestion : onBackToGender}
          variant="ghost"
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors min-h-[44px] px-3 sm:px-4"
        >
          <ArrowLeft className="mr-1 sm:mr-2" size={16} />
          <span className="text-sm sm:text-base">이전 문항</span>
        </Button>
        <Button 
          onClick={onResetToHome}
          variant="ghost"
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium transition-colors min-h-[44px] px-3 sm:px-4"
        >
          <span className="text-sm sm:text-base">처음으로</span>
          <Home className="ml-1 sm:ml-2" size={16} />
        </Button>
      </div>
    </div>
  );
}
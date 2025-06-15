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
  selectedAnswer?: Answer;
  onAnswerSelect: (answer: Answer) => void;
  onPreviousQuestion: () => void;
  onBackToGender: () => void;
  canGoBack: boolean;
}

export default function QuestionScreen({
  currentQuestionIndex,
  totalQuestions,
  question,
  selectedAnswer,
  onAnswerSelect,
  onPreviousQuestion,
  onBackToGender,
  canGoBack
}: QuestionScreenProps) {
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="fixed top-4 sm:top-8 left-4 sm:left-8 z-50">
        <div className="text-4xl sm:text-5xl md:text-7xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>
      <div className="max-w-lg w-full max-w-full">
        {/* Title */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            <span className="text-teto font-extrabold">테토</span>
            <span className="text-slate-800 dark:text-slate-200">-</span>
            <span className="text-egen font-extrabold">에겐</span>{" "}
            <span className="text-slate-800 dark:text-slate-200">테스트</span>
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-600">진행률</span>
            <span className="text-xs sm:text-sm font-medium text-slate-600">
              {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2 sm:h-3" />
        </div>

        {/* Question Card */}
        <Card className="shadow-xl mb-6 md:mb-8">
          <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="mb-4 md:mb-6">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 md:mb-4 leading-relaxed break-words">
                {currentQuestionIndex + 1}. {question.text}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3 sm:space-y-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => onAnswerSelect(option)}
                  variant="outline"
                  className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 h-auto justify-start transition-all duration-200 ${
                    selectedAnswer === option 
                      ? 'border-purple-400 bg-purple-50 dark:border-purple-500 dark:bg-purple-950/20' 
                      : 'border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 dark:border-slate-600 dark:hover:border-purple-400 dark:hover:bg-purple-950/10'
                  }`}
                  aria-label={`선택지 ${index + 1}: ${option.text}`}
                  role="radio"
                  aria-checked={selectedAnswer === option}
                >
                  <div className="flex items-start w-full">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 ${
                      selectedAnswer === option 
                        ? 'bg-purple-500 border-purple-500' 
                        : 'border-slate-300 dark:border-slate-500'
                    }`} />
                    <div className="flex-1">
                      <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed block break-words">
                        {option.text}
                      </span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            onClick={onPreviousQuestion}
            variant="ghost"
            className="text-slate-500 hover:text-slate-700 font-medium transition-colors"
            disabled={!canGoBack}
          >
            <ArrowLeft className="mr-2" size={16} />
            이전 문항
          </Button>
          <Button 
            onClick={onBackToGender}
            variant="ghost"
            className="text-slate-500 hover:text-slate-700 font-medium transition-colors"
          >
            처음으로 <Home className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

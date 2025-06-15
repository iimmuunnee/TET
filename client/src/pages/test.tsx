import { useState, useEffect } from "react";
import NameInput from "@/components/name-input";
import GenderSelection from "@/components/gender-selection";
import QuestionScreen from "@/components/question-screen";
import LoadingScreen from "@/components/loading-screen";
import { ThemeToggle } from "@/components/theme-toggle";
import { questions } from "@/data/questions";
import { calculateResult } from "@/lib/test-calculator";
import { validateTestResult, sanitizeUserName, validateAnswerCount } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import type { InsertTestResult } from "@shared/schema";

export type Gender = 'male' | 'female';
export type Answer = {
  text: string;
  type: 'teto' | 'egen' | 'mixed';
  weight: number;
};

export default function Test() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'name' | 'gender' | 'questions' | 'loading'>('name');
  const [userName, setUserName] = useState<string>('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 진행률 저장/복원
  useEffect(() => {
    const savedProgress = localStorage.getItem('teto-egen-test-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        if (progress.userName) setUserName(progress.userName);
        if (progress.gender) setGender(progress.gender);
        if (progress.currentStep && progress.currentStep !== 'loading') setCurrentStep(progress.currentStep);
        if (progress.currentQuestionIndex) setCurrentQuestionIndex(progress.currentQuestionIndex);
        if (progress.answers) setAnswers(progress.answers);
      } catch (err) {
        console.warn('저장된 진행률을 불러오는데 실패했습니다:', err);
      }
    }
  }, []);

  // 진행률 저장
  useEffect(() => {
    if (currentStep !== 'loading') {
      const progress = {
        userName,
        gender,
        currentStep,
        currentQuestionIndex,
        answers,
        timestamp: Date.now()
      };
      localStorage.setItem('teto-egen-test-progress', JSON.stringify(progress));
    }
  }, [userName, gender, currentStep, currentQuestionIndex, answers]);

  const saveResultMutation = useMutation({
    mutationFn: async (data: InsertTestResult) => {
      const response = await apiRequest('POST', '/api/test-results', data);
      return await response.json();
    },
    onSuccess: (result) => {
      navigate(`/result/${result.id}`);
    }
  });

  const handleNameSubmit = (name: string) => {
    const sanitizedName = sanitizeUserName(name);
    if (sanitizedName.length === 0) {
      toast({
        title: "오류",
        description: "올바른 이름을 입력해주세요.",
        variant: "destructive"
      });
      return;
    }
    setUserName(sanitizedName);
    setCurrentStep('gender');
  };

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    setCurrentStep('questions');
  };

  const handleAnswerSelect = (answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Test completed, validate and calculate result
      if (!validateAnswerCount(newAnswers, questions.length)) {
        toast({
          title: "오류",
          description: "모든 문항에 답변해주세요.",
          variant: "destructive"
        });
        return;
      }

      setCurrentStep('loading');
      const { resultType, tetoScore, egenScore } = calculateResult(newAnswers);

      const testResult: InsertTestResult = {
        name: userName,
        gender: gender!,
        answers: newAnswers,
        resultType,
        tetoScore,
        egenScore
      };

      // 최종 검증
      if (!validateTestResult(testResult)) {
        toast({
          title: "오류",
          description: "테스트 결과를 처리하는 중 오류가 발생했습니다.",
          variant: "destructive"
        });
        setCurrentStep('questions');
        return;
      }

      // 진행률 삭제
      localStorage.removeItem('teto-egen-test-progress');
      saveResultMutation.mutate(testResult);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleBackToGender = () => {
    setCurrentStep('gender');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleBackToName = () => {
    setCurrentStep('name');
    setGender(null);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-900"></div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {currentStep === 'name' && (
        <NameInput onNameSubmit={handleNameSubmit} />
      )}

      {currentStep === 'gender' && (
        <GenderSelection onGenderSelect={handleGenderSelect} onBackToName={handleBackToName} />
      )}

      {currentStep === 'questions' && (
        <QuestionScreen
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          question={questions[currentQuestionIndex]}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          onPreviousQuestion={handlePreviousQuestion}
          onBackToGender={handleBackToGender}
          canGoBack={currentQuestionIndex > 0}
        />
      )}

      {currentStep === 'loading' && <LoadingScreen />}
    </div>
  );
}
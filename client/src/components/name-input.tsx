import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NameInputProps {
  onNameSubmit: (name: string) => void;
}

export default function NameInput({ onNameSubmit }: NameInputProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("이름을 입력해주세요");
      return;
    }
    if (trimmedName.length < 2) {
      setError("이름은 2글자 이상 입력해주세요");
      return;
    }
    if (trimmedName.length > 20) {
      setError("이름은 20글자 이하로 입력해주세요");
      return;
    }
    setError("");
    onNameSubmit(trimmedName);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="fixed top-4 sm:top-8 left-4 sm:left-8 z-50">
        <div className="text-4xl sm:text-5xl md:text-7xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>
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
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3 md:mb-4 px-2">
            이름이 뭐예요? 별명도 괜찮아요! 😊
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 px-4">
            결과를 공유할 때 누구인지 알 수 있어요!
          </p>
        </div>

        <Card className="bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-600 mb-6 md:mb-8 mx-4">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="멋진 이름을 알려주세요!"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  onKeyPress={handleKeyPress}
                  className="text-center text-lg h-12 bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-500 focus:border-indigo-500 dark:focus:border-indigo-400"
                  autoFocus
                  maxLength={20}
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                다음 단계로 <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/">
            <Button variant="ghost" className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium transition-colors">
              <ArrowLeft className="mr-2" size={16} />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
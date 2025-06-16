
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Users, TrendingUp, Heart, Zap } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AdBanner } from "@/components/ad-banner";

interface StatisticsData {
  totalTests: number;
  genderDistribution: {
    male: number;
    female: number;
  };
  typeDistribution: {
    teto: number;
    egen: number;
  };
  genderTypeDistribution: {
    tetoMale: number;
    tetoFemale: number;
    egenMale: number;
    egenFemale: number;
  };
}

export default function Statistics() {
  const { data: stats, isLoading } = useQuery<StatisticsData>({
    queryKey: ['/api/statistics'],
    queryFn: async () => {
      const response = await fetch('/api/statistics');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-100 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="w-full h-full border-4 border-indigo-200 dark:border-indigo-400 border-t-indigo-600 dark:border-t-indigo-300 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600 dark:text-slate-300">통계를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-900 py-8 px-4">
      <div className="fixed top-4 sm:top-8 left-4 sm:left-8 z-50">
        <div className="text-4xl sm:text-5xl md:text-7xl font-bold">
          <span className="text-teto font-extrabold">T</span>
          <span className="text-egen font-extrabold">E</span>
          <span className="text-slate-800 dark:text-slate-200 font-extrabold">T</span>
        </div>
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto pt-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            테토-에겐 테스트 통계
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            지금까지의 테스트 결과를 한눈에 확인해보세요
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 전체 테스트 수 */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="text-indigo-600" size={20} />
                  총 참여자 수
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600 mb-2">
                  {stats.totalTests.toLocaleString()}명
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  많은 사람들이 참여했어요!
                </p>
              </CardContent>
            </Card>

            {/* 성별 분포 */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="text-green-600" size={20} />
                  성별 분포
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">남성</span>
                    <span className="text-sm font-bold text-blue-600">
                      {stats.totalTests > 0 ? Math.round((stats.genderDistribution.male / stats.totalTests) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">여성</span>
                    <span className="text-sm font-bold text-pink-600">
                      {stats.totalTests > 0 ? Math.round((stats.genderDistribution.female / stats.totalTests) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 성향 분포 */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="text-orange-600" size={20} />
                  성향 분포
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 테토 성향 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🔥 테토 성향</span>
                      <span className="text-sm font-bold text-orange-600">
                        {stats.totalTests > 0 ? Math.round((stats.typeDistribution.teto / stats.totalTests) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.totalTests > 0 ? (stats.typeDistribution.teto / stats.totalTests) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 에겐 성향 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🌸 에겐 성향</span>
                      <span className="text-sm font-bold text-purple-600">
                        {stats.totalTests > 0 ? Math.round((stats.typeDistribution.egen / stats.totalTests) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.totalTests > 0 ? (stats.typeDistribution.egen / stats.totalTests) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 세부 유형 분포 */}
            <Card className="shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="text-red-600" size={20} />
                  세부 유형 분포
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 테토남 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🔥 테토남</span>
                      <span className="text-sm font-bold text-orange-600">
                        {stats.totalTests > 0 ? Math.round((stats.genderTypeDistribution.tetoMale / stats.totalTests) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.totalTests > 0 ? (stats.genderTypeDistribution.tetoMale / stats.totalTests) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 테토녀 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">⚡ 테토녀</span>
                      <span className="text-sm font-bold text-orange-600">
                        {stats.totalTests > 0 ? Math.round((stats.genderTypeDistribution.tetoFemale / stats.totalTests) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-yellow-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.totalTests > 0 ? (stats.genderTypeDistribution.tetoFemale / stats.totalTests) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 에겐남 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🌙 에겐남</span>
                      <span className="text-sm font-bold text-purple-600">
                        {stats.totalTests > 0 ? Math.round((stats.genderTypeDistribution.egenMale / stats.totalTests) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.totalTests > 0 ? (stats.genderTypeDistribution.egenMale / stats.totalTests) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 에겐녀 */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">🌸 에겐녀</span>
                      <span className="text-sm font-bold text-purple-600">
                        {stats.totalTests > 0 ? Math.round((stats.genderTypeDistribution.egenFemale / stats.totalTests) * 100) : 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-pink-400 to-purple-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${stats.totalTests > 0 ? (stats.genderTypeDistribution.egenFemale / stats.totalTests) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 광고 배너 */}
        <div className="flex justify-center mb-8">
          <AdBanner position="top" />
        </div>

        <div className="text-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full">
              테스트 하러 가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

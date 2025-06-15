
export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-slate-900">
      <div className="text-center max-w-md w-full">
        <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center flex-shrink-0">
          <div className="w-24 h-24 border-4 border-indigo-200 dark:border-indigo-400 border-t-indigo-600 dark:border-t-indigo-300 rounded-full animate-spin"></div>
        </div>
        <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-4 whitespace-nowrap">결과 분석 중...</h3>
        <p className="text-slate-600 dark:text-slate-400 whitespace-nowrap">당신의 성격을 분석하고 있습니다</p>
      </div>
    </div>
  );
}

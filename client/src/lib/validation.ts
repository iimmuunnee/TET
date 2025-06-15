
export function validateTestResult(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  
  // 필수 필드 검증
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) return false;
  if (!data.gender || !['male', 'female'].includes(data.gender)) return false;
  if (!Array.isArray(data.answers) || data.answers.length === 0) return false;
  if (typeof data.tetoScore !== 'number' || typeof data.egenScore !== 'number') return false;
  
  // 답변 검증
  for (const answer of data.answers) {
    if (!answer || typeof answer !== 'object') return false;
    if (!answer.text || typeof answer.text !== 'string') return false;
    if (!answer.type || !['teto', 'egen', 'mixed'].includes(answer.type)) return false;
    if (typeof answer.weight !== 'number' || answer.weight < 0) return false;
  }
  
  return true;
}

export function sanitizeUserName(name: string): string {
  return name.trim().slice(0, 50); // 최대 50자로 제한
}

export function validateAnswerCount(answers: any[], expectedCount: number): boolean {
  return Array.isArray(answers) && answers.length === expectedCount;
}

import type { Answer } from "@/pages/test";

export function calculateResult(answers: Answer[]): {
  resultType: 'teto' | 'egen';
  tetoScore: number;
  egenScore: number;
} {
  let tetoScore = 0;
  let egenScore = 0;

  answers.forEach(answer => {
    if (answer.type === 'teto') {
      tetoScore += answer.weight;
    } else if (answer.type === 'egen') {
      egenScore += answer.weight;
    }
  });

  const resultType = tetoScore > egenScore ? 'teto' : 'egen';

  return {
    resultType: tetoScore > egenScore ? 'teto' : 'egen',
    tetoScore: Math.round(tetoScore),
    egenScore: Math.round(egenScore)
  };
}
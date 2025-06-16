import type { Answer } from "@/pages/test";

export interface Question {
  text: string;
  options: Answer[];
}

// Function to shuffle array randomly
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const baseQuestions = [
  {
    text: "친구들과 모임이 있을 때 나는 보통...",
    tetoOption: { text: "모임을 주도하며 분위기를 이끌어간다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "분위기를 파악하며 자연스럽게 어울린다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "다른 사람들의 의견을 들어보고 조화를 맞춘다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "새로운 환경에 적응할 때 나는...",
    tetoOption: { text: "빠르게 적응하고 적극적으로 탐색한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "천천히 관찰하며 단계적으로 적응한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "시간을 두고 천천히 관찰한 후 적응한다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "중요한 결정을 내릴 때 나는...",
    tetoOption: { text: "논리적 분석을 통해 빠르게 결정한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "체계적으로 분석하되 신중하게 결정한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "감정과 직감을 중요하게 고려한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "스트레스를 받을 때 나의 대처 방식은...",
    tetoOption: { text: "적극적으로 문제를 해결하려고 한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "실용적인 해결책을 차근차근 모색한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "혼자만의 시간을 가지며 정리한다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "관심사와 취미 생활에서 나는...",
    tetoOption: { text: "활동적이고 사회적인 취미를 선호한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "때로는 활동적이고 때로는 조용한 취미를 즐긴다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "조용하고 개인적인 취미를 선호한다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "갈등 상황에서 나는...",
    tetoOption: { text: "직접적으로 맞서서 해결하려고 한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "신중하게 상황을 살피며 조화로운 해결책을 찾는다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "회피하거나 우회적으로 해결하려고 한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "새로운 사람들을 만날 때 나는...",
    tetoOption: { text: "먼저 다가가서 대화를 시작한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "분위기를 보고 적절히 대응한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "상대방이 먼저 다가오기를 기다린다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "연애에서 표현 방식은...",
    tetoOption: { text: "직접적이고 명확한 행동으로 표현한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "솔직하되 상대방을 배려하며 표현한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "은근하고 감성적인 방식으로 표현한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "일상에서 계획을 세울 때...",
    tetoOption: { text: "목표 지향적으로 체계적인 계획을 세운다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "기본 계획을 세우되 유연하게 조정한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "유연하게 상황에 맞춰 조정한다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "타인의 감정 상태를 파악할 때...",
    tetoOption: { text: "직접 물어보거나 관찰을 통해 파악한다.", type: "teto" as const, weight: 1 },
    mixedOption: { text: "표정과 말투의 뉘앙스를 세심하게 관찰한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "미묘한 신호와 분위기로 자연스럽게 감지한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "여가 시간에 선호하는 활동은...",
    tetoOption: { text: "운동이나 야외 활동", type: "teto" as const, weight: 2 },
    mixedOption: { text: "감성을 자극하는 문화생활이나 취미활동", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "독서나 영화 감상", type: "egen" as const, weight: 2 }
  },
  {
    text: "리더십이 필요한 상황에서...",
    tetoOption: { text: "자연스럽게 앞장서서 이끈다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "필요에 따라 리더나 서포터 역할을 한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "뒤에서 조용히 지원하는 역할을 한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "감정 표현에 있어서 나는...",
    tetoOption: { text: "솔직하고 직접적으로 표현한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "상황에 맞게 표현 방식을 조절한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "섬세하고 은유적으로 표현한다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "경쟁 상황에서 나는...",
    tetoOption: { text: "승부욕이 강하고 적극적으로 임한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "경쟁과 즐거움의 균형을 맞춘다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "과정 자체를 즐기며 참여한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "패션과 외모에 대한 관심도는...",
    tetoOption: { text: "실용적이고 간단한 스타일을 선호한다.", type: "teto" as const, weight: 1 },
    mixedOption: { text: "때에 따라 실용성과 스타일을 고려한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "트렌디하고 세련된 스타일을 추구한다.", type: "egen" as const, weight: 1 }
  },
  {
    text: "친구 관계에서 나는...",
    tetoOption: { text: "넓고 다양한 인맥을 유지한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "다양한 친구와 깊은 친구를 적절히 유지한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "깊고 진실한 소수의 관계를 중시한다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "업무나 과제를 처리할 때...",
    tetoOption: { text: "효율성과 결과를 중시한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "효율성과 완성도를 모두 고려한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "완성도와 과정을 중시한다.", type: "egen" as const, weight: 2 }
  },
  {
    text: "새로운 도전 앞에서 나는...",
    tetoOption: { text: "흥미롭고 자극적이라고 느낀다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "설레지만 충분히 준비하고 싶어한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "신중하게 고민해보고 준비한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "데이트할 때 선호하는 스타일은...",
    tetoOption: { text: "활동적이고 역동적인 데이트", type: "teto" as const, weight: 2 },
    mixedOption: { text: "상황과 기분에 따라 다양한 데이트", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "조용하고 로맨틱한 데이트", type: "egen" as const, weight: 2 }
  },
  {
    text: "미래에 대한 나의 태도는...",
    tetoOption: { text: "구체적인 목표를 세우고 계획적으로 준비한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "기본 계획을 세우되 유연하게 대응한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "자연스러운 흐름에 맡기며 유연하게 대응한다.", type: "egen" as const, weight: 2 }
  }
];

// Generate questions with shuffled options
export const questions: Question[] = baseQuestions.map(q => ({
  text: q.text,
  options: shuffleArray([q.tetoOption, q.mixedOption, q.egenOption])
}));
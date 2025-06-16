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
    text: "새로운 모임에서 처음 만난 사람들과 함께할 때 나는...",
    tetoOption: { text: "먼저 다가가서 자기소개를 하고 대화를 시작한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "상황을 지켜보며 자연스럽게 어울린다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "누군가 먼저 말을 걸어주기를 기다린다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "SNS에 일상을 공유할 때 나는...",
    tetoOption: { text: "활동적이고 역동적인 순간들을 자주 올린다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "특별한 순간만 가끔 공유한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "감성적이고 예쁜 사진을 신중하게 선별해서 올린다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "연애할 때 이상형을 만나면 나는...",
    tetoOption: { text: "적극적으로 다가가서 관심을 표현한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "기회를 만들어 자연스럽게 접근한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "눈빛과 미묘한 신호로 관심을 표현한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "친구가 고민상담을 할 때 나는...",
    tetoOption: { text: "구체적이고 현실적인 해결책을 제시한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "상황을 파악하고 적절한 조언을 한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "공감하고 감정적으로 위로해준다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "첫 데이트 장소를 정할 때 나는...",
    tetoOption: { text: "테마파크나 액티비티가 있는 곳을 선택한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "상대방의 취향을 먼저 물어본다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "감성적이고 분위기 좋은 카페나 전시회를 선택한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "화가 났을 때 나의 반응은...",
    tetoOption: { text: "감정을 솔직하게 표현하고 문제를 해결하려 한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "상황을 정리하고 차분하게 대화한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "혼자 시간을 갖고 감정을 정리한 후 이야기한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "카톡에서 상대방이 답장이 늦을 때 나는...",
    tetoOption: { text: "직접 전화를 걸거나 다시 메시지를 보낸다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "조금 기다려보다가 자연스럽게 물어본다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "상대방이 바쁠 수 있다고 생각하며 기다린다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "스트레스를 받을 때 나는...",
    tetoOption: { text: "운동이나 활동적인 것으로 해소한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "친구들과 만나서 이야기하며 푼다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "혼자만의 시간을 가지며 차분히 정리한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "좋아하는 사람이 다른 이성과 친하게 지내는 걸 보면...",
    tetoOption: { text: "직접 물어보거나 솔직하게 표현한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "상황을 지켜보며 적절히 대응한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "속으로 삭히며 혼자 상상하고 걱정한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "주말 계획을 세울 때 나는...",
    tetoOption: { text: "친구들과 만나거나 밖으로 나가는 활동을 계획한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "그때그때 기분에 따라 결정한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "집에서 휴식을 취하거나 혼자만의 시간을 갖는다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "친구들과 의견이 갈릴 때 나는...",
    tetoOption: { text: "내 의견을 논리적으로 설명하고 설득한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "서로의 의견을 조율하려고 노력한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "분위기를 깨지 않기 위해 양보하는 편이다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "새로운 옷을 살 때 나는...",
    tetoOption: { text: "편리하고 활동하기 좋은 옷을 우선 고려한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "상황에 따라 실용성과 디자인을 모두 고려한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "분위기와 감성에 맞는 예쁜 옷을 선택한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "연인과의 기념일에 나는...",
    tetoOption: { text: "특별한 활동이나 이벤트를 계획한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "연인의 취향에 맞춰 계획한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "감성적이고 로맨틱한 분위기를 중시한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "팀 프로젝트에서 나는...",
    tetoOption: { text: "적극적으로 의견을 제시하고 리드한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "맡은 역할을 성실히 해내려고 노력한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "팀의 화합과 분위기를 중시한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "연애에서 이별 위기가 올 때 나는...",
    tetoOption: { text: "문제를 정면으로 마주하고 해결하려 한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "차분하게 대화를 통해 해결하려 한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "상대방의 마음이 돌아오길 기다리며 참는다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "친구들 앞에서 연인 자랑을 할 때 나는...",
    tetoOption: { text: "자신 있게 연인의 장점들을 이야기한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "적당히 좋은 점들을 소개한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "부끄러워하며 간접적으로 표현한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "좋아하는 연예인이나 인플루언서를 볼 때 나는...",
    tetoOption: { text: "멋있거나 예쁘다고 솔직하게 표현한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "가끔 관심을 보이지만 크게 신경쓰지 않는다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "혼자 몰래 좋아하며 팬질을 한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "친구가 새로운 연인을 소개할 때 나는...",
    tetoOption: { text: "적극적으로 관심을 보이고 질문한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "자연스럽게 대화에 참여한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "조심스럽게 관찰하며 인사한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "혼자 있는 시간에 나는 주로...",
    tetoOption: { text: "친구들에게 연락하거나 밖으로 나간다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "그때그때 하고 싶은 것을 한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "책을 읽거나 영화를 보며 감성에 빠진다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "상대방의 관심을 끌고 싶을 때 나는...",
    tetoOption: { text: "직접적으로 어필하거나 적극적으로 다가간다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "자연스러운 기회를 만들어 접근한다.", type: "teto" as const, weight: 1.5 },
    egenOption: { text: "간접적인 신호나 분위기로 표현한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "연인과 다툰 후 화해할 때 나는...",
    tetoOption: { text: "먼저 연락해서 직접 대화한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "시간을 두고 적절한 타이밍에 접근한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "상대방이 먼저 연락오기를 기다린다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "새로운 취미를 시작할 때 나는...",
    tetoOption: { text: "여러 사람과 함께 할 수 있는 활동을 선택한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "흥미가 생기는 것을 자유롭게 시도한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "혼자서도 깊이 있게 즐길 수 있는 것을 선택한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "카페에서 음료를 주문할 때 나는...",
    tetoOption: { text: "빠르게 결정하고 주문한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "메뉴를 보며 적당히 고민한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "오랫동안 고민하며 신중하게 선택한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "친구들과의 여행에서 나는...",
    tetoOption: { text: "일정을 계획하고 주도적으로 이끈다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "함께 의논하며 계획을 세운다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "다른 사람들의 계획에 따라간다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "연인이 바쁠 때 나는...",
    tetoOption: { text: "이해하지만 가끔 만날 시간을 요청한다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "상황에 맞춰 배려하며 기다린다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "혼자 시간을 보내며 연락을 기다린다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "클럽이나 술집에서 나는...",
    tetoOption: { text: "음악에 맞춰 신나게 춤추고 분위기를 즐긴다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "친구들과 대화하며 적당히 즐긴다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "조용한 분위기의 바나 라운지를 선호한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "이성 앞에서 실수했을 때 나는...",
    tetoOption: { text: "웃어넘기며 자연스럽게 넘어간다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "상황에 맞게 적절히 대응한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "얼굴이 빨개지며 당황한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "좋아하는 사람에게 고백할 때 나는...",
    tetoOption: { text: "직접 만나서 솔직하게 마음을 전한다.", type: "teto" as const, weight: 3 },
    mixedOption: { text: "좋은 분위기를 만들어 자연스럽게 표현한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "편지나 메시지로 감정을 담아 전한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "연인과 헤어진 후 나는...",
    tetoOption: { text: "친구들과 만나며 빠르게 털어낸다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "시간을 두고 차츰 정리한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "혼자 시간을 보내며 깊게 상처받는다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "연인의 부모님을 처음 만날 때 나는...",
    tetoOption: { text: "밝고 적극적으로 인사하며 대화한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "예의 바르게 인사하고 자연스럽게 어울린다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "조심스럽고 예의 바르게 행동한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "선물을 받았을 때 나는...",
    tetoOption: { text: "기쁜 마음을 즉시 표현하고 감사인사를 한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "고마움을 적절히 표현한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "부끄러워하며 조용히 고마워한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "연예인 팬사인회나 콘서트에서 나는...",
    tetoOption: { text: "적극적으로 응원하고 반응한다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "적당히 즐기며 관람한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "조용히 감상하며 감동받는다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "나만의 고민이 있을 때 나는...",
    tetoOption: { text: "친한 친구나 가족에게 털어놓는다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "상황에 따라 상담하거나 혼자 해결한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "혼자서 끙끙 앓으며 해결하려 한다.", type: "egen" as const, weight: 3 }
  },
  {
    text: "처음 가는 식당에서 메뉴를 고를 때 나는...",
    tetoOption: { text: "직원에게 추천 메뉴를 물어본다.", type: "teto" as const, weight: 2 },
    mixedOption: { text: "인기 메뉴나 후기를 참고해서 선택한다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "메뉴판을 꼼꼼히 보며 혼자 고민한다.", type: "egen" as const, weight: 2.5 }
  },
  {
    text: "친구들과 노래방에서 나는...",
    tetoOption: { text: "신나는 댄스곡이나 랩을 부른다.", type: "teto" as const, weight: 2.5 },
    mixedOption: { text: "분위기에 맞춰 다양한 장르를 부른다.", type: "egen" as const, weight: 1.5 },
    egenOption: { text: "감성적인 발라드나 조용한 곡을 선호한다.", type: "egen" as const, weight: 2.5 }
  }
];

// Generate questions with shuffled options
export const questions: Question[] = baseQuestions.map(q => ({
  text: q.text,
  options: shuffleArray([q.tetoOption, q.mixedOption, q.egenOption])
}));
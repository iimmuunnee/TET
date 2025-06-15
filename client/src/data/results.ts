export interface ResultData {
  title: string;
  subtitle: string;
  resultType: 'teto' | 'egen';
  traits: string[];
  dating: string[];
  bestMatch: string;
  cautionMatch: string;
}

export const resultData: Record<'male' | 'female', Record<'teto' | 'egen', ResultData>> = {
  male: {
    teto: {
      title: "테토남",
      subtitle: "외향적이고 주도적인 남성형",
      resultType: "teto",
      traits: [
        "공격성과 사냥 본능이 강함",
        "자기주장이 강하며 리더십이 있음", 
        "감정보다 논리를 우선시함",
        "도전과 모험을 좋아함",
        "친구가 많고 무리 생활에 익숙함",
        "현실 지향적이고 실용적"
      ],
      dating: [
        "감정보다는 행동으로 표현",
        "직접적이고 적극적인 대시",
        "갈등을 피하지 않고 직면",
        "실질적인 보상을 선호",
        "빠른 결정과 진행을 선호"
      ],
      bestMatch: "에겐녀 - 서로의 부족한 면을 보완해주는 관계",
      cautionMatch: "테토녀 - 둘 다 강한 성향으로 갈등 가능성"
    },
    egen: {
      title: "에겐남", 
      subtitle: "감성적이고 섬세한 남성형",
      resultType: "egen",
      traits: [
        "감수성과 섬세함이 뛰어남",
        "타인의 감정에 민감하게 반응",
        "예술과 문학 등에 관심이 많음",
        "내면 지향적이고 사색적",
        "워라밸과 휴식을 중시",
        "정적인 취미를 선호"
      ],
      dating: [
        "감성적이고 로맨틱한 표현",
        "세심한 배려와 관심",
        "깊은 대화와 공감을 추구",
        "천천히 발전하는 관계 선호",
        "정서적 안정감을 중시"
      ],
      bestMatch: "테토녀 - 서로에게 없는 에너지를 보완",
      cautionMatch: "에겐녀 - 비슷한 성향으로 인한 정체감"
    }
  },
  female: {
    teto: {
      title: "테토녀",
      subtitle: "활발하고 적극적인 여성형", 
      resultType: "teto",
      traits: [
        "활발하고 에너지가 넘침",
        "적극적이고 주도적인 성격",
        "솔직하고 직설적인 표현",
        "도전적이고 모험적",
        "사교적이고 외향적",
        "목표 지향적이고 추진력이 강함"
      ],
      dating: [
        "적극적인 어필과 표현",
        "활동적이고 역동적인 데이트 선호",
        "직접적인 감정 표현",
        "주도권을 잡는 것을 선호",
        "빠른 진전을 원함"
      ],
      bestMatch: "테토남 - 서로의 강함을 인정하는 관계",
      cautionMatch: "에겐남 - 성향 차이로 인한 이해 부족"
    },
    egen: {
      title: "에겐녀",
      subtitle: "우아하고 감성적인 여성형",
      resultType: "egen", 
      traits: [
        "우아하고 세련된 매력",
        "감성적이고 로맨틱한 성향",
        "섬세하고 배려심이 깊음",
        "예술적 감각이 뛰어남",
        "조화와 평화를 추구",
        "직관적이고 감정적"
      ],
      dating: [
        "로맨틱하고 감성적인 연애",
        "세심한 배려와 관심을 받고 싶어함",
        "분위기 있는 데이트를 선호",
        "감정적 교감을 중시",
        "천천히 깊어지는 관계 선호"
      ],
      bestMatch: "테토남 - 서로를 보완하는 이상적 궁합",
      cautionMatch: "에겐남 - 둘 다 감성적이어서 갈등 해결 어려움"
    }
  }
};

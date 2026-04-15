export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  description: string;
  responsibilities: string[];
  stack?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    company: '가비아 (Gabia)',
    role: '프론트엔드 개발자',
    period: '2014 — 현재',
    isCurrent: true,
    description:
      '가비아의 대표 서비스들을 프론트엔드 관점에서 개발·운영하고 있습니다. 하이웍스, 가비아닷컴, 회사소개 사이트 등 규모 있는 프로젝트를 맡았고 사내 UI 프레임워크 gtris를 직접 설계했습니다.',
    responsibilities: [
      '하이웍스 오피스 Vue.js SPA 개편 · REST API 분리',
      '가비아닷컴 대표 사이트 전면 개편',
      '사내 UI 프레임워크 gtris 설계 및 운영',
      '하이웍스·회사소개 사이트 반응형 웹 전환',
      '사내 웹 접근성 세미나 기획·진행',
    ],
    stack: ['Vue.js', 'Vuex', 'ES6', 'SASS', 'REST API', 'RWD'],
  },
  {
    company: '위버 (UBER)',
    role: '프론트엔드 개발자',
    period: '2011 — 2013',
    description:
      '디지털 에이전시에서 대기업 클라이언트의 웹사이트와 인터랙티브 프로젝트를 담당했습니다. 쉐보레·대우건설·파라다이스 등 대형 브랜드 사이트의 웹 표준 전환과 접근성 개선을 주도했습니다.',
    responsibilities: [
      '쉐보레 공식 사이트 리뉴얼 (Find New Roads) · 웹 표준 전환',
      '대우건설 푸르지오 — 아파트 브랜드 최초 웹 접근성 인증 획득',
      '푸르지오 웹진 — 3년 연속 웹어워드 코리아 수상',
      '파라다이스 카지노 사이트 리뉴얼 · 채용 사이트 구축',
      '쉐보레 디지털 인터랙티브 키오스크 (ActionScript 3.0) 개발',
    ],
    stack: [
      'HTML5',
      'CSS3',
      'jQuery',
      'ActionScript 3.0',
      'Web Standards',
      'Accessibility',
    ],
  },
];

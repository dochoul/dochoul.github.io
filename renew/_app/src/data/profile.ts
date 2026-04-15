export interface ProfileData {
  name: string;
  nameEn: string;
  role: string;
  company: string;
  tagline: string;
  bio: string[];
  highlights: string[];
  email: string;
  github: string;
  githubUrl: string;
  closingMessage: string;
}

export const profile: ProfileData = {
  name: "김덕연",
  nameEn: "DeokYeon Kim",
  role: "Front-End Web Developer",
  company: "Gabia",
  tagline:
    "14년째 웹을 만들고 있습니다. 웹표준과 접근성을 지키면서도, 오늘의 도구로 더 나은 경험을 만드는 일에 집중합니다.",
  bio: [
    "2011년 디지털 에이전시 UBER에서 프론트엔드 개발자로 커리어를 시작해, 2014년부터 현재까지 가비아(Gabia)의 프론트엔드 개발팀에 몸담고 있습니다.",
    "UBER 시절에는 쉐보레, 대우건설 푸르지오, 파라다이스 카지노 등 대기업 브랜드 사이트의 웹 표준 전환과 웹 접근성 개선을 맡았습니다. 가비아로 옮긴 뒤에는 하이웍스·가비아닷컴 같은 실서비스를 운영하며, 사내 UI 프레임워크 gtris를 직접 설계해 팀의 생산성을 높이는 일에도 기여했습니다.",
    "지금도 변함없는 관심사는 세 가지입니다. 웹표준과 접근성, 지속 가능한 디자인 시스템, 그리고 사용자가 느끼는 속도. 화려한 기술보다 오래 살아남는 구조를 좋아합니다.",
  ],
  highlights: [
    "14년차 프론트엔드 개발자 · UBER(2011–2013) → Gabia(2014–현재)",
    "하이웍스 오피스 Vue.js SPA 개편 · 가비아닷컴 대표 사이트 개편",
    "사내 UI 프레임워크 gtris 설계 · 공통 컴포넌트 라이브러리 구축",
    "대우건설 푸르지오 — 아파트 브랜드 최초 웹 접근성 인증 획득",
    "2013 웹어워드 코리아 최우수상 · 2015 iECO AWARD 기술혁신대상 · 2011 앤어워드 Winner",
  ],
  email: "kimdy@gabia.com",
  github: "dochoul",
  githubUrl: "https://github.com/dochoul",
  closingMessage:
    "함께 만들고 싶은 프로젝트나 나누고 싶은 이야기가 있다면 언제든 편하게 연락 주세요.",
};

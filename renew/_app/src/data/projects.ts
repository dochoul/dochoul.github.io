export type Company = "Gabia" | "UBER";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  concept: string[];
  tags: string[];
  company: Company;
  role: string;
  period: string;
  url?: string;
  urlLabel?: string;
  urlNote?: string;
  awards?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "geeknews-ai-bot",
    title: "GeekNews AI 뉴스 봇",
    subtitle: "Agentic Coding Project",
    summary:
      "RSS 피드에서 AI 관련 뉴스만 골라 Telegram으로 전송하는 자동화 봇. Claude API(Haiku)를 에이전트로 활용해 기사를 분류합니다.",
    concept: [
      "RSS 수집: GeekNews 피드에서 최신 기사 수집",
      "AI 필터링: Claude API (Haiku)로 AI/ML/LLM 관련 기사만 분류",
      "Telegram 전송: 필터링된 기사를 그룹에 자동 전송",
      "GitHub Actions cron으로 하루 2회(KST 09:00, 18:00) 자동 실행",
      "Claude API 비용 효율화: 기사 1건 분류당 약 $0.0003 (10원 미만)",
    ],
    tags: ["Agentic Coding", "Claude API", "Python", "GitHub Actions", "Telegram Bot"],
    company: "Gabia",
    role: "Full-stack Development (AI Agentic)",
    period: "2026.03 — 현재",
    url: "https://github.com/dochoul/geeknews-ai-bot",
    urlLabel: "GitHub 저장소 보기",
    featured: true,
  },
  {
    slug: "hiworks-design-system",
    title: "하이웍스 디자인 시스템",
    subtitle: "Hiworks Design System",
    summary:
      "하이웍스 제품군 전반에서 사용되는 공통 디자인 언어와 컴포넌트를 정리한 시스템. Storybook으로 문서화해 디자이너·개발자가 한 곳에서 참조할 수 있도록 구성.",
    concept: [
      "하이웍스 제품 전반의 UI 일관성을 위한 디자인 토큰·컴포넌트 정의",
      "Storybook 기반 문서화 — 안내 문서·가이드·컴포넌트 스펙을 단일 창구로 통합",
      "디자이너와 개발자가 공통 언어로 협업할 수 있는 Single Source of Truth 구축",
      "접근성·반응형 원칙을 컴포넌트 레벨에서 기본값으로 내장",
    ],
    tags: ["Design System", "Storybook", "Component Library", "Documentation"],
    company: "Gabia",
    role: "프론트엔드 개발",
    period: "2024 — 현재",
    url: "https://hiworks-design-system.hiworks.com/?path=/docs/%EC%95%88%EB%82%B4-%EB%AC%B8%EC%84%9C--docs",
    urlLabel: "Storybook 열기",
    featured: true,
  },
  {
    slug: "hiworks-office",
    title: "하이웍스 오피스 개편",
    subtitle: "Hiworks Office Renewal",
    summary:
      "Vue.js + ES6 + Vuex로 재구축한 하이웍스 오피스. REST API 기반으로 프론트·백엔드를 완전 분리한 SPA.",
    concept: [
      "Vue.js · Vuex · ES6 기반 단일 페이지 애플리케이션",
      "REST API로 프론트/백엔드 완전 분리",
      "무제한 주소 등록과 태그 기반 검색, 엑셀/아웃룩 가져오기·내보내기",
      "페이지 이동 없이 한 화면에서 모든 인터랙션, 다크 모드 지원",
    ],
    tags: ["Vue.js", "Vuex", "ES6", "REST API", "SPA"],
    company: "Gabia",
    role: "프론트엔드 개발",
    period: "2019.02 — 2019.05",
    url: "https://login.office.hiworks.com/hiworks04.pe.kr",
    urlNote: "로그인 필요 (비밀번호: 12341234aa)",
    featured: true,
  },
  {
    slug: "gabia-dotcom",
    title: "가비아닷컴 개편 프로젝트",
    subtitle: "gabia.com Renewal",
    summary:
      "가비아 대표 사이트 전면 개편. Vue 컴포넌트 재사용 구조와 자체 UI 프레임워크 gtris로 일관된 UI를 구축.",
    concept: [
      "Vue.js 컴포넌트로 재사용 가능한 UI 블록 설계",
      "자체 UI 프레임워크 gtris 활용",
      "SASS(Variables, Mixins, Extends)로 스타일 체계화",
    ],
    tags: ["Vue.js", "gtris", "SASS", "Component Architecture"],
    company: "Gabia",
    role: "프론트엔드 개발",
    period: "2018.01 — 2018.03",
    url: "https://www.gabia.com/",
    featured: true,
  },
  {
    slug: "gtris",
    title: "GTRIS · UI Framework v1.1.0",
    subtitle: "In-house UI Framework",
    summary:
      "가비아 전 서비스의 UI 일원화를 위해 설계한 자체 프레임워크. 반복 로직을 컴포넌트로 모듈화해 재사용성·확장성을 확보.",
    concept: [
      "웹앱 반복 로직을 컴포넌트 단위로 모듈화",
      "SASS 전처리기로 토큰·믹스인 체계 마련",
      "JS 모듈 패턴 · IIFE · 네임스페이스 패턴 적용",
      "watch · lint · compile · minify · concat 자동화 파이프라인 구축",
    ],
    tags: ["UI Framework", "SASS", "JavaScript", "Automation"],
    company: "Gabia",
    role: "프론트엔드 개발",
    period: "2016.02 — 2016.06",
    url: "http://static.gabia.com/gtris/",
    featured: true,
  },
  {
    slug: "gabia-company",
    title: "가비아 회사소개 웹사이트 개편",
    subtitle: "company.gabia.com",
    summary:
      "딱딱한 회사소개에서 벗어나 구성원의 목소리를 담은 반응형 사이트. 기획·촬영·인터뷰까지 함께 진행.",
    concept: [
      "가변 그리드·이미지, 미디어 쿼리 기반 반응형 웹 디자인",
      "사진 촬영 및 인터뷰어 참여",
      "Full Screen Video 기법으로 몰입감 있는 인트로 구현",
    ],
    tags: ["RWD", "HTML5", "Video", "Storytelling"],
    company: "Gabia",
    role: "프론트엔드 개발 · 기획 · 촬영",
    period: "2015.10 — 2015.12",
    url: "https://company.gabia.com/",
  },
  {
    slug: "hiworks-rwd",
    title: "하이웍스닷컴 반응형웹디자인 프로젝트",
    subtitle: "Hiworks Responsive Renewal",
    summary:
      "메일·게시판·문자·웹하드·주소록 등 업무 솔루션 서비스를 반응형으로 개편. UI 컴포넌트를 체계화한 첫 대형 프로젝트.",
    concept: [
      "가변 그리드·이미지, 미디어 쿼리 기반 RWD 전환",
      "table · dropdown · button · paging · modal 등 공통 UI 컴포넌트 제작",
      "사진 촬영 및 모델 참여",
    ],
    tags: ["RWD", "UI Components", "Business Suite"],
    company: "Gabia",
    role: "프론트엔드 개발",
    period: "2015.05 — 2015.09",
    url: "https://www.hiworks.com/",
    awards: ["2015 iECO AWARD KOREA — 인터넷에코혁신 기술혁신대상"],
  },
  {
    slug: "a11y-seminar",
    title: "웹 접근성 세미나 · 차이가 차별이 되지 않는 웹을 위하여",
    subtitle: "Internal Seminar",
    summary:
      "가비아 전 직원을 대상으로 진행한 웹 접근성 세미나. 자료 기획·발표까지 맡아 전사 인식 개선에 기여.",
    concept: [
      "한국형 웹 콘텐츠 접근성 지침 2.0 — 4원칙·13지침·22검사항목 소개",
      "접근성 검사 도구 소개 및 사용 방법 교육",
      "전사 대상 자료 준비 및 세미나 진행",
    ],
    tags: ["Accessibility", "WCAG 2.0", "Seminar"],
    company: "Gabia",
    role: "자료 준비 및 세미나 진행",
    period: "2014.02.26",
    url: "https://www.slideshare.net/dddoooccc/ss-63547537",
    urlLabel: "SlideShare에서 발표자료 보기",
  },
  {
    slug: "chevrolet",
    title: "2013 쉐보레 웹사이트 리뉴얼 (Find New Roads)",
    subtitle: "chevrolet.co.kr Renewal",
    summary:
      "플래시를 걷어내고 웹 표준으로 전환한 쉐보레 공식 사이트 리뉴얼. 글로벌 가이드라인에 맞춰 접근성도 함께 개선.",
    concept: [
      "Image Sprite로 HTTP 요청 최소화 · 전송 속도 향상",
      "견적 내기 · 차량 360도 VR 등 플래시 콘텐츠를 웹 표준으로 전환",
      "쉐보레 글로벌 가이드에 맞춘 디자인·개발",
      "쉐보레 스타일 북 프로젝트, 모바일 사이트 등 부가 서비스 런칭",
    ],
    tags: ["Web Standards", "Accessibility", "HTML5", "Image Sprite"],
    company: "UBER",
    role: "프론트엔드 개발",
    period: "2013.04 — 2013.06",
    url: "https://www.chevrolet.co.kr/",
  },
  {
    slug: "prugio-accessibility",
    title: "대우건설 푸르지오 통합 사이트 리뉴얼",
    subtitle: "PRUGIO Accessibility Project",
    summary:
      "아파트 브랜드 사이트 최초로 웹 접근성 인증마크를 획득한 프로젝트. KWCAG 2.0 규정을 준수해 동적 레이아웃까지 구현.",
    concept: [
      "한국형 웹 콘텐츠 접근성 지침(KWCAG) 2.0 준수 개발",
      "Masonry 기반 동적 레이아웃 배치 적용",
      "Image Sprite + JSON 데이터로 월간 웹진 유지 운영 효율화",
      "아파트 브랜드 홈페이지 최초 웹 접근성 인증마크 획득",
    ],
    tags: ["Accessibility", "KWCAG 2.0", "Masonry", "RWD"],
    company: "UBER",
    role: "프론트엔드 개발",
    period: "2013.02 — 2013.04",
    url: "https://www.prugio.com/",
    awards: [
      "2013 웹어워드 코리아 기업일반(건설) 최우수상",
      "웹 접근성 인증마크 획득",
    ],
  },
  {
    slug: "prugio-webzine",
    title: "푸르지오 웹진",
    subtitle: "PRUGIO Webzine",
    summary:
      "스토리 중심의 콘텐츠를 다양한 디바이스에서 읽을 수 있도록 구축한 반응형 웹진. 연속 3년 웹어워드 수상.",
    concept: [
      "다양한 디바이스에 대응하는 동적 반응형 구조",
      "레티나 디스플레이 대응 이미지 프로토타입",
      "SNS 연동·콘텐츠 스크랩·복사 기능 구현",
    ],
    tags: ["RWD", "Retina", "Prototyping", "SNS Integration"],
    company: "UBER",
    role: "프론트엔드 개발",
    period: "2012.02 — 2013.04",
    url: "http://webzine.prugio.com/",
    awards: ["2012 웹어워드 코리아 고객지원/서비스 분야 통합 부분 대상"],
  },
  {
    slug: "paradise-casino",
    title: "파라다이스 카지노 사이트 리뉴얼 · 채용 사이트 구축",
    subtitle: "Paradise Casino",
    summary:
      "무분별하게 사용된 플래시를 제거하고 웹 표준·SEO 기반으로 재구축. 채용 사이트와 게임 매뉴얼도 함께 개발.",
    concept: [
      "웹 표준 기반으로 플래시 콘텐츠 전환",
      "SEO(Search Engine Optimization) 적용",
      "jQuery 애니메이션 기반 채용 사이트 개발",
      "ActionScript로 게임 매뉴얼 제작",
    ],
    tags: ["Web Standards", "SEO", "jQuery", "HTML5", "ActionScript"],
    company: "UBER",
    role: "프론트엔드 개발",
    period: "2012.06 — 2012.09",
    url: "http://www.paradisecasino.co.kr/",
  },
  {
    slug: "chevrolet-kiosk",
    title: "쉐보레 디지털 인터랙티브 키오스크",
    subtitle: "Digital Interactive Kiosk (DIK)",
    summary:
      "쉐보레 영업소에서 고객이 직접 조작하는 46인치 터치 키오스크 애플리케이션. ActionScript 3.0 기반 인터랙티브 사이니지.",
    concept: [
      "46인치 터치스크린 기반 인터랙티브 키오스크 설계",
      "ActionScript 3.0으로 앱 개발",
      "디지털 사이니지로 매장 경험 차별화",
    ],
    tags: ["ActionScript 3.0", "Interactive", "Digital Signage", "Kiosk"],
    company: "UBER",
    role: "ActionScript 3.0 개발",
    period: "2011.02 — 2011.06",
    url: "https://vimeo.com/21974848",
    urlLabel: "Vimeo에서 데모 영상 보기",
    awards: ["2011 앤어워드 Digital Appliance UI 부문 Winner"],
  },
];

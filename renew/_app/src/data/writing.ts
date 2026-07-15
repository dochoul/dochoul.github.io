const BLOG = 'https://dochoul.github.io';

export interface WritingItem {
  title: string;
  excerpt?: string;
  url?: string;
  date?: string;
  source?: string;
  external?: boolean;
}

export const writings: WritingItem[] = [
  {
    title: '오픈소스 디자인 툴을 가비아 전용으로 바꾼 GOD(Gabia Open Design) 이야기',
    excerpt:
      '오픈소스 Open Design을 가져와 Gabia AI Hub 연동, OneStack 배포, 플러그인 확장을 더해 사내 전용 AI 디자인 툴 GOD로 만든 프로젝트 기록.',
    url: `${BLOG}/2026-07-15/god-guide`,
    date: '2026.07.15',
  },
  {
    title: '4개월 연속 증가, 누적 145만 원 넘긴 배당 🍯',
    excerpt:
      '7월 배당 39만 3천 원, 2026년 누적 145만 원 돌파. 4월부터 4개월 연속 늘어나는 배당금 흐름이 이어지고 있다.',
    url: `${BLOG}/2026-07-02/isa-dividend-july`,
    date: '2026.07.02',
  },
  {
    title: '분기마다 반복되던 주차권 신청을 AI로 편리하게',
    excerpt: '분기마다 반복되던 doc 파일 신청 방식을 웹 시스템으로 바꾼 이야기.',
    url: `${BLOG}/2026-06-08/parking-system`,
    date: '2026.06.08',
  },
  {
    title: '매달 불어나는 배당, 멈추지 않는 게 전략이다 🍯',
    excerpt:
      '드디어 누적 100만 원을 넘겼다. 6월 배당 38만 원, 2026년 합계 106만 원. 매달 조금씩 불어나는 흐름을 끊지 않는 것이 목표다.',
    url: `${BLOG}/2026-06-02/isa-dividend-june`,
    date: '2026.06.02',
  },
  {
    title: '힙하다는 말 한마디로 시작된 회사의 AI 대모험',
    excerpt:
      '회사마다 다른 척하지만, 뜯어보면 거의 동일한 공정을 밟는다. 어디서 본 것 같다면 당신도 이미 이 라인 위에 올라가 있는 것이다.',
    url: `${BLOG}/2026-06-01/recent-ai-development`,
    date: '2026.06.01',
  },
  {
    title: 'AI 시대, 개발자의 생존기록',
    excerpt:
      'ActionScript 3.0부터 jQuery, React, 그리고 AI까지. 침몰하는 배를 갈아타며 살아남은 프론트엔드 개발자의 회고.',
    url: `${BLOG}/2026-01-02/ai-era-survival`,
    date: '2026.04',
  },
  {
    title: '효율성과 생산성이라는 신화의 몰락',
    excerpt:
      'AI가 과정을 삭제하고 결과만 배달하는 시대, 효율성은 차별화가 아닌 기본값이 됐다. 우리에게 남은 건 기계가 흉내 낼 수 없는 지독한 비효율성일지 모른다.',
    url: `${BLOG}/2026-05-15/ai-era-productivity-myth`,
    date: '2026.05.15',
  },
  {
    title: '익숙한 불행이라는 피난처',
    excerpt:
      '익숙한 고통이 낯선 행복보다 덜 두려운 이유. 우리가 변화하지 못하는 건 용기가 없어서가 아니라, 아는 고통과 헤어지는 게 서툴기 때문이다.',
    url: `${BLOG}/2026-05-07/familiar-unhappiness`,
    date: '2026.05.07',
  },
  {
    title: '나 대신 열일한 돈의 맛, 5월 배당 기록',
    excerpt:
      '5월 배당금 34만 원, 누적 67만 원 달성. 복리의 힘을 실감하며 재투자로 눈덩이 자산을 키워가는 ISA 배당 투자 기록.',
    url: `${BLOG}/2026-05-06/isa-dividend-may`,
    date: '2026.05.06',
  },
  {
    title: '경주에서 연을 날리다',
    excerpt: '5월 연휴, 경주에서 연날리기를 했다. 하늘 높이 올라간 연 한 마리.',
    url: `${BLOG}/2026-05-04/flying-kite`,
    date: '2026.05.04',
  },
  {
    title: '회사에서 인정받고 싶니? 그렇다면 골프를 배워라!',
    excerpt:
      '성과 지표는 측정 가능한 결과만 박제한다. 조직을 실제로 굴러가게 하는 관계의 기여는 데이터에 남지 않는다. 정답을 내놓는 것과 그 정답이 채택되는 것은 전혀 다른 문제다.',
    url: `${BLOG}/2026-04-27/office-relationship-strategy`,
    date: '2026.04.27',
  },
  {
    title: 'AI로 정리한 ISA 투자 기록',
    excerpt:
      'AI와 함께 ISA 투자 기록을 숫자로 풀어가며 월 배당 목표와 복리 전략을 정리한 투자 기록.',
    url: `${BLOG}/2026-04-20/isa-with-ai`,
    date: '2026.04.20',
  },
  {
    title: '우리는 왜 끊임없이 반대편을 갈구하는가',
    excerpt:
      '직장과 자유, 소속과 고독 사이를 끊임없이 오가는 인간의 모순적 욕망에 대하여. 우리는 만족이 아니라 결핍의 종류를 바꾸며 사는 존재일지 모른다.',
    url: `${BLOG}/2026-04-19/carousel-of-deficiency`,
    date: '2026.04.19',
  },
  {
    title: 'Gabia Birthday — 임직원 생일 기프티콘 데스크톱 앱',
    excerpt:
      'Electron + React + Express로 만든 사내 전용 앱. 주민등록번호를 즉시 파기하고 생일만 추출하는 개인정보 보호 설계와 macOS/Windows 배포 과정을 기록했습니다.',
    url: `${BLOG}/2026-03-24/ai-gabia-birthday`,
    date: '2026.04',
  },
  {
    title: 'Nabia HR Telegram Bot — Claude AI 기반 HR 챗봇',
    excerpt:
      'grammY + Claude Tool Use로 만든 경영진 전용 HR 조회 봇. 자연어로 직원 정보, 연봉, 출퇴근, 평가 데이터를 조회하는 전 과정을 기록했습니다.',
    date: '2026.03',
  },
  {
    title: '내 프로젝트에 react-doctor를 돌려봤다',
    excerpt: 'Claude Code 스킬로 연동해서 사용해 본 리액트 진단 도구, react-doctor 사용기.',
    url: `${BLOG}/2026-01-10/react-doctor`,
    date: '2026.01.10',
  },
  {
    title: 'AI와 함께 만든 Todo 앱 — Done IT',
    excerpt:
      'AI 주도 개발로 Supabase + Telegram Bot 연동 서비스를 처음부터 끝까지 만든 기록. 기획, 코드, UI/UX까지 전 과정을 AI와 함께.',
    date: '2025.06',
  },
  {
    title: '[V4] LG 트윈스가 무적의 시대를 선언합니다!',
    excerpt:
      '2년 만에 다시 정상에 오른 2025년 LG트윈스. 무적을 외쳤던 모든 팬의 마음이 하나가 된 그 순간의 기록.',
    url: `${BLOG}/2025-10-31/korean-series-champions-2025`,
    date: '2025.10.31',
  },
  {
    title: '트랙 마돈 SL7, 의지 없는 자의 반강제 운동법',
    excerpt:
      '트랙 마돈 SL7 8세대와 일체형 핸들바. 운동을 반강제로 시키기 위해 큰 결심으로 구입한 자전거 이야기.',
    url: `${BLOG}/2025-04-24/trek-madone-sl7`,
    date: '2025.04.24',
  },
  {
    title: '내 입맛대로 만든 툴팁 컴포넌트',
    excerpt: '딱 맞는 툴팁 라이브러리가 없어서 React와 TypeScript로 직접 만들었다.',
    url: `${BLOG}/2024-05-07/tooltip-react`,
    date: '2024.05.07',
  },
  {
    title: '우리의 첫 야구장',
    excerpt:
      '딸아이의 손을 잡고 잠실 야구장에 처음 다녀온 날, 51번 홍창기 유니폼을 입은 아이와 함께한 첫 직관 기록.',
    url: `${BLOG}/2024-05-24/first-lgtwins`,
    date: '2024.05.24',
  },
  {
    title: '[V3] 29년만의 메아리',
    excerpt:
      '1994년 이후 29년을 기다려온 가을. 2023년, LG트윈스가 마침내 다시 한국시리즈 정상에 오른 밤의 기록.',
    url: `${BLOG}/2023-11-13/korean-series-champions-2023`,
    date: '2023.11.13',
  },
  {
    title: '흔들리는 마흔, 불혹(不惑)이라는 거짓말',
    excerpt:
      '공자는 마흔을 불혹이라 했지만, 정작 그 한복판에 서 보니 작은 바람에도 흔들리는 나를 마주한다.',
    url: `${BLOG}/2022-05-06/shaken-at-forty`,
    date: '2022.05.06',
  },
  {
    title: '차이가 차별이 되지 않는 웹을 위하여',
    excerpt:
      '가비아 전 직원을 대상으로 진행했던 웹 접근성 세미나 자료. 한국형 웹 콘텐츠 접근성 지침 2.0을 풀어 소개합니다.',
    url: 'https://www.slideshare.net/dddoooccc/ss-63547537',
    date: '2014.02.26',
    source: 'SlideShare',
    external: true,
  },
  {
    title: '자연스럽게, 라는 말이 제일 어려웠던 날',
    excerpt:
      '하이웍스 브랜드 사이트 촬영에 대체 출연하며 자연스럽게 포즈를 취하는 일이 얼마나 어려운지 겪은 사진 촬영 기록.',
    url: `${BLOG}/2015-07-13/hiworks-photoshoot`,
    date: '2015.07.13',
  },
  {
    title: '자판기에 기부 버튼을 달았던 날',
    excerpt:
      '자판기에 기부 버튼을 달아 작은 재미로 선의를 움직였던 사내 기부 캠페인과 그 현장을 기록한 글.',
    url: `${BLOG}/2014-12-23/donation-vending-machine`,
    date: '2014.12.23',
  },
];

import aiEraSurvivalContent from './writings/ai-era-survival.md?raw';
import doneItContent from './writings/done-it.md?raw';
import nabiaHrBotContent from './writings/nabia-hr-bot.md?raw';
import gabiaBirthdayContent from './writings/gabia-birthday.md?raw';

export interface WritingItem {
  title: string;
  excerpt?: string;
  url?: string;
  date?: string;
  source?: string;
  external?: boolean;
  content?: string;
}

export const writings: WritingItem[] = [
  {
    title: 'AI 시대, 개발자의 생존기록',
    excerpt:
      'ActionScript 3.0부터 jQuery, React, 그리고 AI까지. 침몰하는 배를 갈아타며 살아남은 프론트엔드 개발자의 회고.',
    date: '2026.04',
    content: aiEraSurvivalContent,
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
    title: 'AI와 함께 만든 Todo 앱 — Done IT',
    excerpt:
      'AI 주도 개발로 Supabase + Telegram Bot 연동 서비스를 처음부터 끝까지 만든 기록. 기획, 코드, UI/UX까지 전 과정을 AI와 함께.',
    date: '2025.06',
    content: doneItContent,
  },
  {
    title: 'Nabia HR Telegram Bot — Claude AI 기반 HR 챗봇',
    excerpt:
      'grammY + Claude Tool Use로 만든 경영진 전용 HR 조회 봇. 자연어로 직원 정보, 연봉, 출퇴근, 평가 데이터를 조회하는 전 과정을 기록했습니다.',
    date: '2026.03',
    content: nabiaHrBotContent,
  },
  {
    title: 'Gabia Birthday — 임직원 생일 기프티콘 데스크톱 앱',
    excerpt:
      'Electron + React + Express로 만든 사내 전용 앱. 주민등록번호를 즉시 파기하고 생일만 추출하는 개인정보 보호 설계와 macOS/Windows 배포 과정을 기록했습니다.',
    date: '2026.04',
    content: gabiaBirthdayContent,
  },
];

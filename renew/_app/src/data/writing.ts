export interface WritingItem {
  title: string;
  excerpt?: string;
  url: string;
  date?: string;
  source?: string;
  external?: boolean;
}

export const writings: WritingItem[] = [
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
    title: 'CSS Utilities — 유틸리티 클래스 메모',
    excerpt:
      '반복되는 스타일을 유틸리티 클래스로 정리하며 배운 것들을 기록한 메모.',
    url: '/2018-10-02/css-utilities',
    date: '2018.10.02',
    source: 'dochoul.github.io',
  },
  {
    title: '(준비 중) gtris — 사내 UI 프레임워크를 설계하며',
    excerpt:
      '가비아의 전 서비스를 아우르는 UI 프레임워크를 어떻게 설계하고 운영했는지, 그 과정에서 얻은 교훈을 정리할 예정입니다.',
    url: '#writing',
    date: 'soon',
  },
  {
    title: '(준비 중) 웹 표준으로 다시 짓는 대기업 사이트',
    excerpt:
      '쉐보레·대우건설 사이트에서 플래시를 걷어내고 웹 표준으로 옮겨오며 배운 것들.',
    url: '#writing',
    date: 'soon',
  },
];

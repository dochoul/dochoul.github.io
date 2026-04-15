export interface Skill {
  name: string;
  level?: 'core' | 'proficient' | 'familiar';
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    description: '주력으로 사용하는 언어',
    skills: [
      { name: 'JavaScript', level: 'core' },
      { name: 'TypeScript', level: 'core' },
      { name: 'HTML5', level: 'core' },
      { name: 'CSS3 / Sass', level: 'core' },
    ],
  },
  {
    id: 'frameworks',
    label: 'Frameworks & Libraries',
    description: '실무·사이드 프로젝트에서 사용해 온 도구',
    skills: [
      { name: 'React', level: 'core' },
      { name: 'Vue 3', level: 'proficient' },
      { name: 'Next.js', level: 'proficient' },
      { name: 'Mantine', level: 'proficient' },
      { name: 'jQuery', level: 'familiar' },
    ],
  },
  {
    id: 'agentic',
    label: 'AI & Agentic Coding',
    description: 'AI 에이전트와 협업하며 가속화된 개발 워크플로우',
    skills: [
      { name: 'Claude', level: 'core' },
      { name: 'Prompt Engineering', level: 'core' },
      { name: 'Agentic Workflow Design', level: 'proficient' },
      { name: 'LLM Cost Optimization', level: 'proficient' },
      { name: 'Cursor / Copilot', level: 'core' },
    ],
  },
  {
    id: 'tooling',
    label: 'Tooling & Build',
    description: '빌드, 번들링, 테스트 환경',
    skills: [
      { name: 'Vite', level: 'core' },
      { name: 'Webpack', level: 'proficient' },
      { name: 'pnpm / npm', level: 'core' },
      { name: 'Git / GitHub', level: 'core' },
      { name: 'GitHub Actions', level: 'familiar' },
    ],
  },
  {
    id: 'practices',
    label: 'Practices',
    description: '꾸준히 관심을 두고 공부하는 영역',
    skills: [
      { name: 'Design Systems' },
      { name: 'Web Accessibility' },
      { name: 'Performance' },
      { name: 'Responsive Design' },
      { name: 'Component Architecture' },
    ],
  },
];

import { RevealOnScroll } from '@/components/RevealOnScroll';
import { SectionHeading } from '@/components/SectionHeading';
import { Button } from '@/components/Button';
import './AgenticCoding.css';

export function AgenticCoding() {
  return (
    <section id="agentic-coding" className="section agentic-coding" aria-label="Agentic Coding">
      <div className="container">
        <RevealOnScroll>
          <SectionHeading
            index="03"
            eyebrow="Agentic Coding"
            title="AI 에이전트와 함께 만드는 새로운 개발 방식."
            description="클로드(Claude), 코덱스(Codex)와 협업하며 기획부터 구현, 자동화까지 AI 에이전트를 개발의 파트너로 활용합니다."
          />
        </RevealOnScroll>

        <div className="agentic-coding__grid">
          <div className="agentic-coding__list">
            <RevealOnScroll className="agentic-coding__item" delay={100}>
              <div className="agentic-card">
                <div className="agentic-card__header">
                  <div className="agentic-card__title-group">
                    <h3 className="agentic-card__title">GeekNews AI 뉴스 봇</h3>
                    <p className="agentic-card__subtitle">AI Agentic Automation Project</p>
                  </div>
                  <div className="agentic-card__badge">Claude API</div>
                </div>

                <div className="agentic-card__body">
                  <p className="agentic-card__desc">
                    GeekNews RSS 피드에서 AI 관련 뉴스만 골라 Telegram 그룹으로 자동 전송하는 봇입니다. 
                    단순한 스크립트를 넘어, LLM이 기사의 맥락을 읽고 분류하는 에이전틱 워크플로우를 구축했습니다.
                  </p>

                  <div className="agentic-card__features">
                    <h4>주요 기능</h4>
                    <ul>
                      <li><strong>RSS 수집:</strong> GeekNews 피드에서 최신 기사 수집</li>
                      <li><strong>AI 필터링:</strong> Claude API로 AI 관련 기사 정밀 분류</li>
                      <li><strong>Telegram 전송:</strong> 필터링된 기사를 그룹에 즉시 전송</li>
                      <li><strong>자동 실행:</strong> GitHub Actions cron으로 하루 2회 자동 실행</li>
                      <li><strong>비용 최적화:</strong> 건당 약 $0.0003의 초저비용 설계</li>
                    </ul>
                  </div>

                  <div className="agentic-card__code-preview">
                    <div className="code-header">
                      <span>bot.py</span>
                      <span className="code-lang">Python</span>
                    </div>
                    <pre>
                      <code>{`# Claude API를 활용한 에이전틱 필터링 예시
def filter_ai_news(article):
    prompt = f"분류할 기사: {article.title}\\n{article.desc}"
    # Claude가 기사 맥락을 분석해 AI 관련성 판단
    response = client.messages.create(model="claude-3-5-sonnet", ...)`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="agentic-card__footer">
                  <Button 
                    href="https://github.com/dochoul/geeknews-feed" 
                    external 
                    variant="primary"
                  >
                    GitHub 저장소 보기
                  </Button>
                  <div className="agentic-card__tags">
                    <span>#Python</span>
                    <span>#ClaudeAPI</span>
                    <span>#GitHubActions</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="agentic-coding__item" delay={200}>
              <div className="agentic-card agentic-card--alt">
                <div className="agentic-card__header">
                  <div className="agentic-card__title-group">
                    <h3 className="agentic-card__title">Nabia HR 텔레그램 봇</h3>
                    <p className="agentic-card__subtitle">Enterprise HR Management Agent</p>
                  </div>
                  <div className="agentic-card__badge">Node.js / grammY</div>
                </div>

                <div className="agentic-card__body">
                  <p className="agentic-card__desc">
                    경영진을 위한 실시간 HR 데이터 조회 봇입니다. 자연어 의도 파악(Intent Detection)을 통해 
                    복잡한 명령어 없이도 인사/급여/근태 데이터를 즉시 리포팅하는 에이전틱 인터페이스를 구현했습니다.
                  </p>

                  <div className="agentic-card__features">
                    <h4>주요 기능</h4>
                    <ul>
                      <li><strong>자연어 인터페이스:</strong> 문맥 기반 의도 파악 및 데이터 자동 매칭</li>
                      <li><strong>보안 인증:</strong> 초대 코드 기반 3단계 권한 관리 시스템</li>
                      <li><strong>통계 대시보드:</strong> 직급별 연봉 통계 및 실시간 출퇴근 현황</li>
                      <li><strong>가상 데이터 엔진:</strong> 100인 규모의 정밀 HR/근태 시드 데이터 구축</li>
                    </ul>
                  </div>

                  <div className="agentic-card__code-preview">
                    <div className="code-header">
                      <span>natural.ts</span>
                      <span className="code-lang">TypeScript</span>
                    </div>
                    <pre>
                      <code>{`// 자연어 의도 파악(Intent Detection) 로직 예시
const intentPatterns = [
  { intent: 'salary', keywords: ['연봉', '급여', '월급'] },
  { intent: 'attendance', keywords: ['출근', '근태', '지각'] }
];
// 텍스트 분석 후 적절한 리포트 자동 반환`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="agentic-card__footer">
                  <Button 
                    href="https://github.com/dochoul/HR-Telegram" 
                    external 
                    variant="primary"
                  >
                    GitHub 저장소 보기
                  </Button>
                  <div className="agentic-card__tags">
                    <span>#TypeScript</span>
                    <span>#SQLite3</span>
                    <span>#grammY</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll className="agentic-coding__item" delay={300}>
              <div className="agentic-card">
                <div className="agentic-card__header">
                  <div className="agentic-card__title-group">
                    <h3 className="agentic-card__title">Done IT — AI 주도 Todo 앱</h3>
                    <p className="agentic-card__subtitle">Full-Stack AI Development Project</p>
                  </div>
                  <div className="agentic-card__badge">React / Supabase</div>
                </div>

                <div className="agentic-card__body">
                  <p className="agentic-card__desc">
                    기획부터 배포까지 AI와 단둘이 완성한 풀스택 Todo 서비스입니다.
                    Supabase 실시간 동기화와 Telegram 양방향 연동을 AI와의 협업만으로 구현했습니다.
                  </p>

                  <div className="agentic-card__features">
                    <h4>주요 기능</h4>
                    <ul>
                      <li><strong>Supabase Realtime:</strong> 텔레그램 봇 조작이 웹에 즉시 반영</li>
                      <li><strong>양방향 텔레그램:</strong> 메신저에서 할일 추가·완료·조회</li>
                      <li><strong>Google OAuth:</strong> Supabase Auth 기반 소셜 로그인</li>
                      <li><strong>낙관적 업데이트:</strong> 빠른 UI 반응을 위한 충돌 방지 설계</li>
                    </ul>
                  </div>

                  <div className="agentic-card__code-preview">
                    <div className="code-header">
                      <span>telegram.ts</span>
                      <span className="code-lang">TypeScript</span>
                    </div>
                    <pre>
                      <code>{`// 텔레그램 → 웹 실시간 동기화 예시
bot.on('message:text', async (ctx) => {
  const text = ctx.message.text;
  // Supabase에 할일 추가 → Realtime으로 웹에 즉시 반영
  await supabase.from('todos').insert({ text, user_id });
})`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="agentic-card__footer">
                  <Button
                    href="https://todo-claude-cyan.vercel.app"
                    external
                    variant="primary"
                  >
                    서비스 바로가기
                  </Button>
                  <div className="agentic-card__tags">
                    <span>#React</span>
                    <span>#Supabase</span>
                    <span>#TelegramBot</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="agentic-coding__item" delay={400}>
              <div className="agentic-card agentic-card--alt">
                <div className="agentic-card__header">
                  <div className="agentic-card__title-group">
                    <h3 className="agentic-card__title">Gabia Birthday — 생일 관리 앱</h3>
                    <p className="agentic-card__subtitle">Internal Desktop Tool with AI</p>
                  </div>
                  <div className="agentic-card__badge">Electron / React</div>
                </div>

                <div className="agentic-card__body">
                  <p className="agentic-card__desc">
                    임직원 생일 기프티콘 업무를 자동화한 사내 전용 데스크톱 앱입니다.
                    개인정보 보호 설계(주민등록번호 즉시 파기)와 macOS·Windows 배포까지 AI와 함께 완성했습니다.
                  </p>

                  <div className="agentic-card__features">
                    <h4>주요 기능</h4>
                    <ul>
                      <li><strong>개인정보 보호:</strong> 주민등록번호 업로드 즉시 삭제, 생일만 추출</li>
                      <li><strong>자동 필터링:</strong> 고용형태·휴직 여부 기반 지급 대상 자동 분류</li>
                      <li><strong>크로스 플랫폼:</strong> macOS Apple Silicon / Windows x64 배포</li>
                      <li><strong>엑셀 내보내기:</strong> 월별 생일자 목록을 .xlsx로 즉시 다운로드</li>
                    </ul>
                  </div>

                  <div className="agentic-card__code-preview">
                    <div className="code-header">
                      <span>upload.ts</span>
                      <span className="code-lang">TypeScript</span>
                    </div>
                    <pre>
                      <code>{`// 주민등록번호 즉시 파기 처리 예시
function sanitize(row: ExcelRow) {
  const birth = extractBirthFromRRN(row['주민등록번호']);
  delete row['주민등록번호']; // 메모리에서 즉시 삭제
  return { ...row, birth };
}`}
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="agentic-card__footer">
                  <div className="agentic-card__tags">
                    <span>#Electron</span>
                    <span>#React</span>
                    <span>#TypeScript</span>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll className="agentic-coding__side" delay={500}>
            <div className="agentic-info-card">
              <h4>에이전틱 코딩의 강점</h4>
              <div className="agentic-info-item">
                <span className="icon">🚀</span>
                <div>
                  <h5>압도적인 구현 속도</h5>
                  <p>반복적인 보일러플레이트 코드를 AI가 생성하고, 핵심 로직에 집중합니다.</p>
                </div>
              </div>
              <div className="agentic-info-item">
                <span className="icon">🤖</span>
                <div>
                  <h5>지능형 자동화</h5>
                  <p>단순 조건문이 아닌, LLM의 판단력을 결합한 고차원 자동화가 가능합니다.</p>
                </div>
              </div>
              <div className="agentic-info-item">
                <span className="icon">💰</span>
                <div>
                  <h5>최적화된 고효율</h5>
                  <p>정밀한 프롬프트 엔지니어링을 통해 운영 비용은 낮추고 정확도는 높입니다.</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

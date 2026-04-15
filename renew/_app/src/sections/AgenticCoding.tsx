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
          <RevealOnScroll className="agentic-coding__main" delay={100}>
            <div className="agentic-card">
              <div className="agentic-card__header">
                <div className="agentic-card__title-group">
                  <h3 className="agentic-card__title">GeekNews AI 뉴스 봇</h3>
                  <p className="agentic-card__subtitle">AI Agentic Automation Project</p>
                </div>
                <div className="agentic-card__badge">Claude 3.5 Haiku</div>
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
                    <li><strong>AI 필터링:</strong> Claude API로 AI/ML/LLM 관련 기사만 정밀 분류</li>
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
    prompt = f"분류할 기사: {article.title}
{article.desc}"
    # Claude가 기사 맥락을 분석해 AI 관련성 판단
    response = client.messages.create(model="claude-3-haiku", ...)`}
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

          <RevealOnScroll className="agentic-coding__side" delay={200}>
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
                  <h5>초저비용 고효율</h5>
                  <p>Haiku 모델 등 경량 LLM을 최적화하여 운영 비용을 극단적으로 낮춥니다.</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

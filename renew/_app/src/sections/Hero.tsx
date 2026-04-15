import { profile } from '@/data/profile';
import { Button } from '@/components/Button';
import './Hero.css';

const ArrowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export function Hero() {
  return (
    <section id="hero" className="hero" aria-label="소개">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow hero__glow--accent" />
        <div className="hero__glow hero__glow--cool" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner container">
        <div className="hero__meta">
          <span className="hero__status">
            <span className="hero__status-dot" />
            <span>Front-End Web Developer · 14 years &amp; counting</span>
          </span>
        </div>

        <h1 className="hero__headline">
          <span
            className="hero__headline-line"
            style={{ animationDelay: '0.1s' }}
          >
            기술보다 <span className="hero__emphasis">사람</span>을 먼저 읽는
            개발자,
          </span>
          <span
            className="hero__headline-line"
            style={{ animationDelay: '0.22s' }}
          >
            코드로 사용자 경험의 <span className="hero__emphasis">간극</span>을
            메우는
          </span>
          <span
            className="hero__headline-line"
            style={{ animationDelay: '0.34s' }}
          >
            <span className="hero__name">Frontend Engineer</span>.
          </span>
        </h1>

        <p className="hero__tagline">{profile.tagline}</p>

        <div className="hero__cta">
          <Button
            href="#projects"
            variant="primary"
            size="lg"
            icon={<ArrowRight />}
          >
            프로젝트 보기
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            연락하기
          </Button>
        </div>

        <div className="hero__id">
          <span className="hero__id-label">PORTFOLIO · 2025</span>
          <span className="hero__id-divider" />
          <span className="hero__id-role">{profile.role}</span>
          <span className="hero__id-divider" />
          <span className="hero__id-role">@{profile.company}</span>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>SCROLL</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}

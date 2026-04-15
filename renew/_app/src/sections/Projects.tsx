import { projects, type Project } from '@/data/projects';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import './Projects.css';

const ExternalIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const AwardIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
  </svg>
);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Wrapper = project.url ? 'a' : 'article';
  const wrapperProps = project.url
    ? {
        href: project.url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};

  return (
    <Wrapper
      className={`project-card ${project.featured ? 'project-card--featured' : ''} ${!project.url ? 'project-card--static' : ''}`}
      {...wrapperProps}
    >
      <div className="project-card__top">
        <span className="project-card__index">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="project-card__company">{project.company}</span>
        <span className="project-card__period">{project.period}</span>
        {project.url ? (
          <span className="project-card__external" aria-hidden="true">
            <ExternalIcon />
          </span>
        ) : null}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__subtitle">
          {project.subtitle} · {project.role}
        </p>
        <p className="project-card__summary">{project.summary}</p>

        {project.concept.length > 0 ? (
          <ul className="project-card__concept">
            {project.concept.map((item, i) => (
              <li key={i}>
                <span className="project-card__concept-bullet" aria-hidden="true">
                  ▸
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {project.awards && project.awards.length > 0 ? (
          <ul className="project-card__awards">
            {project.awards.map((award, i) => (
              <li key={i}>
                <span className="project-card__award-icon" aria-hidden="true">
                  <AwardIcon />
                </span>
                <span>{award}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <ul className="project-card__tags">
        {project.tags.map((tag) => (
          <li key={tag} className="project-card__tag">
            {tag}
          </li>
        ))}
      </ul>

      <div className="project-card__footer">
        {project.url ? (
          <span className="project-card__cta">
            {project.urlLabel ?? '사이트 열기'}{' '}
            <span aria-hidden="true">→</span>
          </span>
        ) : (
          <span className="project-card__cta project-card__cta--muted">
            내부 프로젝트
          </span>
        )}
        {project.urlNote ? (
          <span className="project-card__note">{project.urlNote}</span>
        ) : null}
      </div>
    </Wrapper>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section projects" aria-label="Projects">
      <div className="container">
        <RevealOnScroll>
          <SectionHeading
            index="03"
            eyebrow="Selected work"
            title="함께 만들어 온 12개의 프로젝트."
            description="2011년 UBER에서 쌓은 대기업 브랜드 사이트 경험부터, 2014년 이후 가비아에서 운영해 온 실서비스, 그리고 지금도 이어가고 있는 디자인 시스템 작업까지. 최신 작업부터 순서대로 정리했습니다."
          />
        </RevealOnScroll>

        <div className="projects__grid">
          {projects.map((project, idx) => (
            <RevealOnScroll
              key={project.slug}
              className="projects__cell"
              delay={(idx % 2) * 80}
            >
              <ProjectCard project={project} index={idx} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

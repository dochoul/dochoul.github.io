import { experiences } from '@/data/experience';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import './Experience.css';

export function Experience() {
  return (
    <section
      id="experience"
      className="section experience"
      aria-label="Experience"
    >
      <div className="container">
        <RevealOnScroll>
          <SectionHeading
            index="04"
            eyebrow="Experience"
            title="지나온 길, 지금 가는 길."
            description="지금까지 일해 온 곳과 그 안에서 맡았던 일들을 정리했습니다."
          />
        </RevealOnScroll>

        <ol className="timeline">
          {experiences.map((item, idx) => (
            <RevealOnScroll
              key={`${item.company}-${idx}`}
              as="li"
              className="timeline__item"
              delay={idx * 80}
            >
              <div className="timeline__marker" aria-hidden="true">
                <span
                  className={`timeline__dot ${item.isCurrent ? 'timeline__dot--current' : ''}`}
                />
                <span className="timeline__line" />
              </div>

              <div className="timeline__content">
                <div className="timeline__meta">
                  <span className="timeline__period">{item.period}</span>
                  {item.isCurrent ? (
                    <span className="timeline__badge">현재</span>
                  ) : null}
                </div>

                <h3 className="timeline__role">
                  {item.role}{' '}
                  <span className="timeline__at">@ {item.company}</span>
                </h3>

                <p className="timeline__description">{item.description}</p>

                <ul className="timeline__responsibilities">
                  {item.responsibilities.map((responsibility, i) => (
                    <li key={i}>
                      <span className="timeline__bullet" aria-hidden="true">
                        —
                      </span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>

                {item.stack && item.stack.length > 0 ? (
                  <div className="timeline__stack">
                    {item.stack.map((s) => (
                      <span key={s} className="timeline__stack-item">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}

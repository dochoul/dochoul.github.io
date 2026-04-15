import { writings } from '@/data/writing';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import './Writing.css';

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
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

export function Writing() {
  return (
    <section id="writing" className="section writing" aria-label="Writing">
      <div className="container">
        <RevealOnScroll>
          <SectionHeading
            index="05"
            eyebrow="Writing"
            title="배우고 정리한 글."
            description="짧은 메모와 글을 조금씩 쌓고 있습니다."
          />
        </RevealOnScroll>

        <ul className="writing__list">
          {writings.map((item, idx) => (
            <RevealOnScroll
              key={`${item.title}-${idx}`}
              as="li"
              className="writing__item-wrap"
              delay={idx * 60}
            >
              <a
                href={item.url}
                className="writing__item"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                <div className="writing__meta">
                  <span className="writing__index">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {item.date ? (
                    <span className="writing__date">{item.date}</span>
                  ) : null}
                </div>

                <div className="writing__body">
                  <h3 className="writing__title">{item.title}</h3>
                  {item.excerpt ? (
                    <p className="writing__excerpt">{item.excerpt}</p>
                  ) : null}
                </div>

                <span className="writing__arrow" aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </RevealOnScroll>
          ))}
        </ul>
      </div>
    </section>
  );
}

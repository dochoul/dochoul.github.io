import { useState } from 'react';
import { writings } from '@/data/writing';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { MarkdownModal } from '@/components/MarkdownModal/MarkdownModal';
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
  const sortedWritings = [...writings].sort((a, b) => {
    if (!a.date || a.date === 'soon') return 1;
    if (!b.date || b.date === 'soon') return -1;
    return b.date.localeCompare(a.date);
  });

  const [activeContent, setActiveContent] = useState<{
    title: string;
    content: string;
  } | null>(null);

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
          {sortedWritings.map((item, idx) => (
            <RevealOnScroll
              key={`${item.title}-${idx}`}
              as="li"
              className="writing__item-wrap"
              delay={idx * 60}
            >
              {item.content ? (
                <button
                  className="writing__item writing__item--button"
                  onClick={() =>
                    setActiveContent({ title: item.title, content: item.content! })
                  }
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
                </button>
              ) : (
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
              )}
            </RevealOnScroll>
          ))}
        </ul>
      </div>

      {activeContent && (
        <MarkdownModal
          title={activeContent.title}
          content={activeContent.content}
          onClose={() => setActiveContent(null)}
        />
      )}
    </section>
  );
}

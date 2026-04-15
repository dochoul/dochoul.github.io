import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import './About.css';

export function About() {
  return (
    <section id="about" className="section about" aria-label="About">
      <div className="container">
        <RevealOnScroll>
          <SectionHeading
            index="01"
            eyebrow="About me"
            title="조용히, 꾸준히 만드는 사람."
            description="제가 어떤 사람이고 어떤 결의 일을 하고 있는지 짧게 소개합니다."
          />
        </RevealOnScroll>

        <div className="about__grid">
          <RevealOnScroll className="about__bio" delay={80}>
            {profile.bio.map((paragraph, i) => (
              <p key={i} className="about__paragraph">
                {paragraph}
              </p>
            ))}
          </RevealOnScroll>

          <RevealOnScroll className="about__panel" delay={160}>
            <div className="about__card">
              <div className="about__card-header">
                <span className="about__card-label">Highlights</span>
                <span className="about__card-line" />
              </div>
              <ul className="about__highlights">
                {profile.highlights.map((item, i) => (
                  <li key={i} className="about__highlight">
                    <span className="about__highlight-marker" aria-hidden="true">
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="about__signature">
                <div>
                  <div className="about__signature-label">이름</div>
                  <div className="about__signature-value">
                    {profile.name}{' '}
                    <span className="about__signature-en">({profile.nameEn})</span>
                  </div>
                </div>
                <div>
                  <div className="about__signature-label">역할</div>
                  <div className="about__signature-value">{profile.role}</div>
                </div>
                <div>
                  <div className="about__signature-label">소속</div>
                  <div className="about__signature-value">
                    {profile.company} · Frontend Team
                  </div>
                </div>
                <div>
                  <div className="about__signature-label">경력</div>
                  <div className="about__signature-value">
                    UBER 2011–2013 → Gabia 2014–현재
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

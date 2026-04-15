import { skillCategories } from '@/data/skills';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import './Skills.css';

export function Skills() {
  return (
    <section id="skills" className="section skills" aria-label="Skills">
      <div className="container">
        <RevealOnScroll>
          <SectionHeading
            index="02"
            eyebrow="Skills"
            title="지금 손에 익은 도구들."
            description="실무와 개인 프로젝트에서 사용하며 다듬어 온 스택입니다."
          />
        </RevealOnScroll>

        <div className="skills__grid">
          {skillCategories.map((category, idx) => (
            <RevealOnScroll
              key={category.id}
              className="skills__category"
              delay={idx * 80}
            >
              <div className="skills__category-head">
                <span className="skills__category-index">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="skills__category-title">{category.label}</h3>
                  <p className="skills__category-desc">{category.description}</p>
                </div>
              </div>

              <ul className="skills__list">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className={`skills__badge ${skill.level ? `skills__badge--${skill.level}` : ''}`}
                  >
                    <span className="skills__badge-dot" aria-hidden="true" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

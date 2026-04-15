import './SectionHeading.css';

export interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <div className="section-heading__meta">
        <span className="section-heading__index" aria-hidden="true">
          {index}
        </span>
        <span className="section-heading__line" aria-hidden="true" />
        <span className="section-heading__eyebrow">{eyebrow}</span>
      </div>
      <h2 className="section-heading__title">{title}</h2>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </header>
  );
}

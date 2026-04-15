import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/SectionHeading';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Button } from '@/components/Button';
import './Contact.css';

const MailIcon = () => (
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
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const GithubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .296C5.373.296 0 5.67 0 12.297c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.26.82-.577 0-.286-.01-1.04-.016-2.043-3.338.725-4.042-1.61-4.042-1.61-.546-1.384-1.333-1.754-1.333-1.754-1.09-.745.082-.73.082-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.49.998.108-.776.42-1.306.763-1.606-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.304-.536-1.527.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.403 1.02.004 2.047.137 3.006.403 2.29-1.552 3.296-1.23 3.296-1.23.655 1.65.243 2.872.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.805 5.624-5.478 5.922.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.596 24 12.297 24 5.67 18.627.296 12 .296z" />
  </svg>
);

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="container">
        <RevealOnScroll>
          <SectionHeading
            index="06"
            eyebrow="Get in touch"
            title="언제든 편하게 말 걸어주세요."
          />
        </RevealOnScroll>

        <div className="contact__grid">
          <RevealOnScroll className="contact__card" delay={80}>
            <p className="contact__message">{profile.closingMessage}</p>

            <div className="contact__actions">
              <Button
                href={`mailto:${profile.email}`}
                variant="primary"
                size="lg"
                icon={<MailIcon />}
              >
                {profile.email}
              </Button>
              <Button
                href={profile.githubUrl}
                variant="outline"
                size="lg"
                icon={<GithubIcon />}
                external
              >
                @{profile.github}
              </Button>
            </div>

            <ul className="contact__links">
              <li>
                <span className="contact__link-label">Email</span>
                <a href={`mailto:${profile.email}`} className="contact__link">
                  {profile.email}
                </a>
              </li>
              <li>
                <span className="contact__link-label">GitHub</span>
                <a
                  href={profile.githubUrl}
                  className="contact__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/{profile.github}
                </a>
              </li>
              <li>
                <span className="contact__link-label">Site</span>
                <a
                  href="https://dochoul.github.io/"
                  className="contact__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dochoul.github.io
                </a>
              </li>
            </ul>
          </RevealOnScroll>
        </div>

        <footer className="contact__footer">
          <span className="contact__footer-brand">
            <span aria-hidden="true">●</span> {profile.nameEn}
          </span>
          <span className="contact__footer-copy">
            © {new Date().getFullYear()} {profile.name}. Built with React & Vite.
          </span>
        </footer>
      </div>
    </section>
  );
}
